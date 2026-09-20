from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.db import models

# Mirrors the departments already shown in the org chart on /process, so the
# careers page and the org chart stay consistent.
DEPARTMENT_CHOICES = [
    ("Project Management", "Project Management"),
    ("Architecture Studio", "Architecture Studio"),
    ("Administration", "Administration"),
]

EMPLOYMENT_TYPE_CHOICES = [
    ("Full-time", "Full-time"),
    ("Contract", "Contract"),
    ("Internship", "Internship"),
]

STATUS_DRAFT = "draft"
STATUS_PUBLISHED = "published"
STATUS_CLOSED = "closed"

STATUS_CHOICES = [
    (STATUS_DRAFT, "Draft"),
    (STATUS_PUBLISHED, "Published"),
    (STATUS_CLOSED, "Closed"),
]

APPLICATION_STATUS_CHOICES = [
    ("new", "New"),
    ("reviewed", "Reviewed"),
    ("shortlisted", "Shortlisted"),
    ("rejected", "Rejected"),
]

# The rest of this block describes what an architecture practice actually
# screens on. Kept as choices rather than free text so the inbox can be
# filtered and sorted — a reviewer wants "everyone with 5-8 years who can start
# in 30 days", not to read 200 paragraphs.

EXPERIENCE_CHOICES = [
    ("0-1 years", "0-1 years"),
    ("1-3 years", "1-3 years"),
    ("3-5 years", "3-5 years"),
    ("5-8 years", "5-8 years"),
    ("8-12 years", "8-12 years"),
    ("12+ years", "12+ years"),
]

NOTICE_PERIOD_CHOICES = [
    ("Immediately available", "Immediately available"),
    ("15 days", "15 days"),
    ("30 days", "30 days"),
    ("60 days", "60 days"),
    ("90 days", "90 days"),
]

RELOCATION_CHOICES = [
    ("Yes", "Yes"),
    ("No", "No"),
    ("Depends on the role", "Depends on the role"),
]

QUALIFICATION_CHOICES = [
    ("B.Arch", "B.Arch"),
    ("M.Arch", "M.Arch"),
    ("B.E / B.Tech (Civil)", "B.E / B.Tech (Civil)"),
    ("M.E / M.Tech", "M.E / M.Tech"),
    ("Diploma in Architecture", "Diploma in Architecture"),
    ("Interior Design", "Interior Design"),
    ("Other", "Other"),
]

# Offered as checkboxes on the form and stored one per line.
SOFTWARE_OPTIONS = [
    "AutoCAD", "Revit", "SketchUp", "3ds Max", "Rhino", "Lumion",
    "Enscape", "V-Ray", "Adobe Creative Suite", "MS Project",
    "Primavera", "BIM 360",
]

# Mirrors the work this firm actually delivers, so the reviewer can spot
# relevant experience at a glance.
PROJECT_TYPE_OPTIONS = [
    "Corporate Interiors", "Turnkey Fit-outs", "Workplace Design",
    "Residential", "Retail", "Hospitality", "Institutional",
    "Industrial / Factory", "Data Centres",
]


class PrivateStorage(FileSystemStorage):
    """
    Storage for files that must never be served by URL.

    Resumes live outside MEDIA_ROOT and get no PythonAnywhere static mapping,
    so nothing serves them; the staff-gated download view is the only way in.

    url() is overridden because passing base_url=None is not enough — Django's
    FileSystemStorage quietly falls back to MEDIA_URL, handing back a
    plausible-looking /media/resumes/... path that does not correspond to where
    the file actually is. Raising instead turns a future mistake into a loud
    error rather than a silent leak.
    """

    def url(self, name):
        raise ValueError(
            "Resumes are private and have no public URL. "
            "Link to the 'application-resume' view instead."
        )


private_storage = PrivateStorage(location=settings.PRIVATE_MEDIA_ROOT)


def _split_lines(value: str) -> list[str]:
    return [line.strip() for line in (value or "").splitlines() if line.strip()]


class JobOpening(models.Model):
    slug = models.SlugField(max_length=140, unique=True)
    title = models.CharField(max_length=200)
    department = models.CharField(max_length=60, choices=DEPARTMENT_CHOICES, blank=True)
    location = models.CharField(max_length=120)
    employment_type = models.CharField(
        max_length=40, choices=EMPLOYMENT_TYPE_CHOICES, default="Full-time"
    )
    experience = models.CharField(
        max_length=80, blank=True, help_text="e.g. '3-5 years'. Optional."
    )
    description = models.TextField()
    responsibilities = models.TextField(
        blank=True, help_text="One per line. Each line becomes a bullet point."
    )
    requirements = models.TextField(
        blank=True, help_text="One per line. Each line becomes a bullet point."
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=STATUS_DRAFT)
    sort_order = models.PositiveIntegerField(
        default=0, help_text="Lower numbers appear first."
    )
    posted_at = models.DateTimeField(null=True, blank=True)
    closes_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["sort_order", "-posted_at", "id"]
        indexes = [models.Index(fields=["status", "sort_order"])]

    def __str__(self):
        return f"{self.title} — {self.location}"

    @property
    def responsibility_list(self) -> list[str]:
        return _split_lines(self.responsibilities)

    @property
    def requirement_list(self) -> list[str]:
        return _split_lines(self.requirements)


class JobApplication(models.Model):
    job = models.ForeignKey(
        JobOpening,
        related_name="applications",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    # Kept so the inbox still reads correctly after an opening is deleted.
    job_title_snapshot = models.CharField(max_length=200)

    # --- who they are ----------------------------------------------------
    name = models.CharField(max_length=160)
    email = models.EmailField()
    phone = models.CharField(max_length=40, blank=True)
    current_location = models.CharField(max_length=120, blank=True)
    open_to_relocation = models.CharField(
        max_length=40, choices=RELOCATION_CHOICES, blank=True
    )

    # --- where they are now ----------------------------------------------
    years_experience = models.CharField(
        max_length=40, choices=EXPERIENCE_CHOICES, blank=True
    )
    current_employer = models.CharField(max_length=160, blank=True)
    current_designation = models.CharField(max_length=160, blank=True)
    notice_period = models.CharField(
        max_length=40, choices=NOTICE_PERIOD_CHOICES, blank=True
    )
    current_ctc = models.CharField(max_length=60, blank=True)
    expected_ctc = models.CharField(max_length=60, blank=True)

    # --- qualifications ---------------------------------------------------
    highest_qualification = models.CharField(
        max_length=60, choices=QUALIFICATION_CHOICES, blank=True
    )
    institution = models.CharField(max_length=200, blank=True)
    graduation_year = models.CharField(max_length=10, blank=True)
    coa_registration = models.CharField(
        max_length=60,
        blank=True,
        verbose_name="CoA registration no.",
        help_text="Council of Architecture number, for registered architects.",
    )

    # --- their work -------------------------------------------------------
    # A portfolio is the real screening artefact for a design hire, so it is a
    # link rather than an upload: portfolios routinely run to tens of MB, which
    # is past the serverless request limit and would fill the server's disk.
    portfolio_url = models.URLField(max_length=500, blank=True)
    linkedin_url = models.URLField(max_length=500, blank=True)
    software_skills = models.TextField(blank=True, help_text="One per line.")
    project_types = models.TextField(blank=True, help_text="One per line.")

    message = models.TextField(blank=True)
    resume = models.FileField(
        upload_to="resumes/", storage=private_storage, blank=True
    )
    status = models.CharField(
        max_length=20, choices=APPLICATION_STATUS_CHOICES, default="new"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [models.Index(fields=["-created_at"])]

    def __str__(self):
        return f"{self.name} — {self.job_title_snapshot}"

    @property
    def software_list(self) -> list[str]:
        return _split_lines(self.software_skills)

    @property
    def project_type_list(self) -> list[str]:
        return _split_lines(self.project_types)
