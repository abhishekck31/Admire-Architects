import json

from django.contrib.admin.views.decorators import staff_member_required
from django.core.cache import cache
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.http import FileResponse, Http404, JsonResponse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST

from admire.api_auth import require_api_key

from .models import (
    EXPERIENCE_CHOICES,
    NOTICE_PERIOD_CHOICES,
    PROJECT_TYPE_OPTIONS,
    QUALIFICATION_CHOICES,
    RELOCATION_CHOICES,
    SOFTWARE_OPTIONS,
    STATUS_PUBLISHED,
    JobApplication,
    JobOpening,
)

# Resumes are capped here as well as in the browser: the frontend cap is a
# convenience, this one is the rule.
MAX_RESUME_BYTES = 4 * 1024 * 1024
ALLOWED_RESUME_TYPES = {
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}
ALLOWED_RESUME_EXTENSIONS = (".pdf", ".doc", ".docx")

# Leading bytes of the formats we accept. Content-Type is supplied by whoever
# built the request and is trivially forged, so it is treated as a hint and
# this is the actual check: a PDF starts "%PDF-", and .doc/.docx are an OLE2
# compound file and a ZIP container respectively.
RESUME_MAGIC_PREFIXES = (
    b"%PDF-",                      # .pdf
    b"\xd0\xcf\x11\xe0\xa1\xb1\x1a\xe1",  # .doc  (OLE2)
    b"PK\x03\x04",                 # .docx (ZIP)
)

# How many applications one submitter may send before we start turning them
# away. The pipeline writes a database row and up to 4MB to a small free-tier
# disk, so an unthrottled form is a way to fill it.
RATE_LIMIT_MAX = 5
RATE_LIMIT_WINDOW_SECONDS = 60 * 60


def _client_ip(request) -> str | None:
    """
    The applicant's address, or None if we cannot tell.

    Applications arrive via the Next.js server action, so REMOTE_ADDR is
    Vercel's egress address, not the applicant's — counting against it would
    put every applicant in the world in one bucket. The frontend forwards the
    real address as X-Forwarded-For; the left-most entry is the client.

    Returning None when that header is absent is deliberate: no identity is
    better than one shared by everybody.
    """
    forwarded = request.headers.get("X-Forwarded-For", "")
    if forwarded:
        return forwarded.split(",")[0].strip() or None
    return None


def _rate_limited(request, email: str) -> bool:
    """
    Count recent submissions per submitter and per email address.

    Both keys matter: the address catches one script hammering the form, the
    email catches the same applicant resubmitting in a loop from a changing
    address. The email key always applies, so a missing X-Forwarded-For weakens
    the throttle but never disables it.

    Uses the default local-memory cache, which is per-worker — approximate, but
    it costs nothing and PythonAnywhere's free tier runs a single worker.
    """
    keys = [f"apply:email:{email.lower()}"]

    ip = _client_ip(request)
    if ip:
        keys.append(f"apply:ip:{ip}")
    for key in keys:
        # add() only succeeds if the key is absent, which is what starts the
        # window; from then on incr() counts within that same expiry.
        if cache.add(key, 1, RATE_LIMIT_WINDOW_SECONDS):
            continue
        try:
            if cache.incr(key) > RATE_LIMIT_MAX:
                return True
        except ValueError:
            # The key expired between add() and incr(); treat as a fresh window.
            cache.set(key, 1, RATE_LIMIT_WINDOW_SECONDS)
    return False


def serialize_job(job: JobOpening) -> dict:
    return {
        "id": job.slug,
        "slug": job.slug,
        "title": job.title,
        "department": job.department or None,
        "location": job.location,
        "employmentType": job.employment_type,
        "experience": job.experience or None,
        "description": job.description,
        "responsibilities": job.responsibility_list,
        "requirements": job.requirement_list,
        "postedAt": job.posted_at.isoformat() if job.posted_at else None,
        "closesAt": job.closes_at.isoformat() if job.closes_at else None,
    }


def application_field_options() -> dict:
    """
    Option lists for the public application form.

    Sent with the job so the form's dropdowns and checkboxes have exactly one
    definition — adding a package to SOFTWARE_OPTIONS makes it appear on the
    site without a frontend change.
    """
    values = lambda choices: [value for value, _label in choices]
    return {
        "experience": values(EXPERIENCE_CHOICES),
        "noticePeriod": values(NOTICE_PERIOD_CHOICES),
        "relocation": values(RELOCATION_CHOICES),
        "qualification": values(QUALIFICATION_CHOICES),
        "software": list(SOFTWARE_OPTIONS),
        "projectTypes": list(PROJECT_TYPE_OPTIONS),
    }


def _published_jobs():
    return JobOpening.objects.filter(status=STATUS_PUBLISHED)


@require_GET
@require_api_key
def job_list(request):
    return JsonResponse(
        {"jobs": [serialize_job(job) for job in _published_jobs()]}, status=200
    )


@require_GET
@require_api_key
def job_detail(request, slug):
    try:
        job = _published_jobs().get(slug=slug)
    except JobOpening.DoesNotExist:
        raise Http404("No such opening")
    return JsonResponse(
        {**serialize_job(job), "fieldOptions": application_field_options()},
        status=200,
    )


@csrf_exempt  # Authenticated by X-Api-Key; the caller is the Next.js server.
@require_POST
@require_api_key
def application_create(request):
    """
    Accept an application forwarded by the Next.js server action.

    The public form never talks to this host directly: routing it through
    Next.js keeps the API key server-side, avoids CORS entirely, and gives one
    place to validate before anything touches PythonAnywhere.
    """
    payload = request.POST
    if not payload and request.body:
        try:
            payload = json.loads(request.body.decode("utf-8"))
        except (ValueError, UnicodeDecodeError):
            return JsonResponse({"detail": "Malformed request body."}, status=400)

    name = (payload.get("name") or "").strip()
    email = (payload.get("email") or "").strip()
    if not name or not email:
        return JsonResponse({"detail": "Name and email are required."}, status=400)

    # JobApplication.email is an EmailField, but objects.create() does not run
    # field validators — so without this the column happily stores "asdf".
    try:
        validate_email(email)
    except ValidationError:
        return JsonResponse(
            {"detail": "That email address does not look right."}, status=400
        )

    if _rate_limited(request, email):
        return JsonResponse(
            {"detail": "Too many applications from here. Please try again later."},
            status=429,
        )

    job = None
    job_slug = (payload.get("jobSlug") or "").strip()
    if job_slug:
        job = JobOpening.objects.filter(slug=job_slug).first()

    resume = request.FILES.get("resume")
    if resume:
        if resume.size > MAX_RESUME_BYTES:
            return JsonResponse({"detail": "Resume exceeds the 4MB limit."}, status=400)

        wrong_type = resume.content_type not in ALLOWED_RESUME_TYPES
        wrong_extension = not resume.name.lower().endswith(ALLOWED_RESUME_EXTENSIONS)

        # Read the first few bytes and put them back, so the later save() still
        # writes the whole file.
        head = resume.read(8)
        resume.seek(0)
        wrong_contents = not head.startswith(RESUME_MAGIC_PREFIXES)

        if wrong_type or wrong_extension or wrong_contents:
            return JsonResponse(
                {"detail": "Resume must be a PDF or Word document."}, status=400
            )

    def text(key, limit=None):
        value = (payload.get(key) or "").strip()
        return value[:limit] if limit else value

    # Checkbox groups arrive as repeated keys; fall back to a newline-joined
    # string when the payload came through as JSON rather than a form.
    def multi(key):
        if hasattr(payload, "getlist"):
            values = payload.getlist(key)
            if values:
                return "\n".join(v.strip() for v in values if v.strip())
        raw = payload.get(key)
        if isinstance(raw, list):
            return "\n".join(str(v).strip() for v in raw if str(v).strip())
        return (raw or "").strip()

    application = JobApplication.objects.create(
        job=job,
        job_title_snapshot=(job.title if job else (payload.get("jobTitle") or "General application")),
        name=name[:160],
        email=email[:254],
        phone=text("phone", 40),
        current_location=text("currentLocation", 120),
        open_to_relocation=text("openToRelocation", 40),
        years_experience=text("yearsExperience", 40),
        current_employer=text("currentEmployer", 160),
        current_designation=text("currentDesignation", 160),
        notice_period=text("noticePeriod", 40),
        current_ctc=text("currentCtc", 60),
        expected_ctc=text("expectedCtc", 60),
        highest_qualification=text("highestQualification", 60),
        institution=text("institution", 200),
        graduation_year=text("graduationYear", 10),
        coa_registration=text("coaRegistration", 60),
        portfolio_url=text("portfolioUrl", 500),
        linkedin_url=text("linkedinUrl", 500),
        software_skills=multi("software"),
        project_types=multi("projectTypes"),
        message=text("message"),
        resume=resume if resume else "",
    )

    return JsonResponse(
        {"ok": True, "id": application.pk, "receivedAt": timezone.now().isoformat()},
        status=201,
    )


@staff_member_required
def resume_download(request, pk):
    """
    The only route that serves a resume, and it requires a staff login.

    private_media/ has no PythonAnywhere static mapping, so this view is the
    sole path to the file.
    """
    application = JobApplication.objects.filter(pk=pk).first()
    if not application or not application.resume:
        raise Http404("No resume on file")

    filename = application.resume.name.rsplit("/", 1)[-1]
    safe_name = f"{application.name.replace(' ', '_')}-{filename}"
    return FileResponse(
        application.resume.open("rb"), as_attachment=True, filename=safe_name
    )
