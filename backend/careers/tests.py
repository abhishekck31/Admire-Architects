from django.contrib.auth.models import User
from django.core.cache import cache
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase

from admire.revalidate import make_token, verify_token

from .models import JobApplication, JobOpening

API_KEY = {"HTTP_X_API_KEY": "dev-only-api-key"}


def make_job(**kwargs):
    defaults = {
        "slug": "senior-architect",
        "title": "Senior Architect",
        "department": "Architecture Studio",
        "location": "Bangalore",
        "employment_type": "Full-time",
        "description": "Lead design work.",
        "status": "published",
    }
    return JobOpening.objects.create(**{**defaults, **kwargs})


class JobApiTests(TestCase):
    def test_requires_api_key(self):
        self.assertEqual(self.client.get("/api/jobs/").status_code, 401)

    def test_only_published_openings_are_exposed(self):
        make_job(status="draft")
        self.assertEqual(self.client.get("/api/jobs/", **API_KEY).json()["jobs"], [])
        self.assertEqual(
            self.client.get("/api/jobs/senior-architect/", **API_KEY).status_code, 404
        )

    def test_closed_openings_are_hidden(self):
        make_job(status="closed")
        self.assertEqual(self.client.get("/api/jobs/", **API_KEY).json()["jobs"], [])

    def test_detail_ships_the_application_form_options(self):
        """The form's dropdowns are backend-driven, so they travel with the job."""
        make_job()
        payload = self.client.get("/api/jobs/senior-architect/", **API_KEY).json()
        options = payload["fieldOptions"]
        self.assertIn("5-8 years", options["experience"])
        self.assertIn("30 days", options["noticePeriod"])
        self.assertIn("B.Arch", options["qualification"])
        self.assertIn("Revit", options["software"])
        self.assertIn("Corporate Interiors", options["projectTypes"])

    def test_bullet_lists_are_split_per_line(self):
        make_job(
            responsibilities="Lead teams\n\nReview drawings\n  ",
            requirements="B.Arch\n5 years",
        )
        job = self.client.get("/api/jobs/", **API_KEY).json()["jobs"][0]
        self.assertEqual(job["responsibilities"], ["Lead teams", "Review drawings"])
        self.assertEqual(job["requirements"], ["B.Arch", "5 years"])

    def test_publishing_stamps_posted_at(self):
        """So the careers page can show a date without the client typing one."""
        from django.contrib.admin.sites import site

        job = make_job(status="draft")
        admin = site._registry[JobOpening]
        job.status = "published"
        admin.save_model(request=None, obj=job, form=None, change=True)
        self.assertIsNotNone(job.posted_at)


class ApplicationIntakeTests(TestCase):
    def setUp(self):
        # The intake throttle counts in the cache, which LocMemCache keeps
        # for the life of the process rather than the test. Without this,
        # tests leak submissions into each other and later ones get a 429.
        cache.clear()
        self.job = make_job()

    @staticmethod
    def _pdf():
        return SimpleUploadedFile("cv.pdf", b"%PDF-1.4 fake", content_type="application/pdf")

    def test_requires_api_key(self):
        response = self.client.post(
            "/api/applications/", {"name": "R Kumar", "email": "r@example.com"}
        )
        self.assertEqual(response.status_code, 401)

    def test_accepts_an_application(self):
        response = self.client.post(
            "/api/applications/",
            {"name": "R Kumar", "email": "r@example.com", "phone": "9999999999",
             "jobSlug": "senior-architect", "resume": self._pdf()},
            **API_KEY,
        )
        self.assertEqual(response.status_code, 201)

        application = JobApplication.objects.get()
        self.assertEqual(application.job, self.job)
        self.assertEqual(application.status, "new")
        # Snapshot so the inbox still reads correctly if the opening is deleted.
        self.assertEqual(application.job_title_snapshot, "Senior Architect")
        application.resume.delete(save=False)

    def test_captures_the_full_architecture_profile(self):
        """Everything a studio screens on must survive the round trip."""
        response = self.client.post(
            "/api/applications/",
            {
                "name": "Priya Raghavan", "email": "priya@example.com",
                "phone": "9876543210", "jobSlug": "senior-architect",
                "currentLocation": "Bangalore", "openToRelocation": "Depends on the role",
                "yearsExperience": "5-8 years", "currentEmployer": "Studio Kaash",
                "currentDesignation": "Architect", "noticePeriod": "30 days",
                "currentCtc": "14 LPA", "expectedCtc": "20 LPA",
                "highestQualification": "B.Arch", "institution": "RV College",
                "graduationYear": "2017", "coaRegistration": "CA/2018/12345",
                "portfolioUrl": "https://behance.net/priya",
                "linkedinUrl": "https://linkedin.com/in/priya",
                "software": ["AutoCAD", "Revit", "SketchUp"],
                "projectTypes": ["Corporate Interiors", "Turnkey Fit-outs"],
                "message": "I have led enterprise fit-outs in Bangalore.",
            },
            **API_KEY,
        )
        self.assertEqual(response.status_code, 201)

        application = JobApplication.objects.get()
        self.assertEqual(application.current_location, "Bangalore")
        self.assertEqual(application.years_experience, "5-8 years")
        self.assertEqual(application.notice_period, "30 days")
        self.assertEqual(application.expected_ctc, "20 LPA")
        self.assertEqual(application.highest_qualification, "B.Arch")
        self.assertEqual(application.coa_registration, "CA/2018/12345")
        self.assertEqual(application.portfolio_url, "https://behance.net/priya")
        # Checkbox groups arrive as repeated keys and are stored one per line.
        self.assertEqual(application.software_list, ["AutoCAD", "Revit", "SketchUp"])
        self.assertEqual(
            application.project_type_list, ["Corporate Interiors", "Turnkey Fit-outs"]
        )

    def test_optional_fields_may_all_be_blank(self):
        """Only name and email are required; the rest must not block a submit."""
        response = self.client.post(
            "/api/applications/",
            {"name": "Minimal Applicant", "email": "min@example.com"},
            **API_KEY,
        )
        self.assertEqual(response.status_code, 201)
        application = JobApplication.objects.get()
        self.assertEqual(application.software_list, [])
        self.assertEqual(application.portfolio_url, "")

    def test_survives_deletion_of_the_opening(self):
        self.client.post(
            "/api/applications/",
            {"name": "R Kumar", "email": "r@example.com", "jobSlug": "senior-architect"},
            **API_KEY,
        )
        self.job.delete()
        application = JobApplication.objects.get()
        self.assertIsNone(application.job)
        self.assertEqual(application.job_title_snapshot, "Senior Architect")

    def test_name_and_email_are_required(self):
        self.assertEqual(
            self.client.post("/api/applications/", {"email": "a@e.com"}, **API_KEY).status_code, 400
        )
        self.assertEqual(
            self.client.post("/api/applications/", {"name": "A"}, **API_KEY).status_code, 400
        )

    def test_rejects_a_non_document_resume(self):
        bad = SimpleUploadedFile("cv.exe", b"MZ", content_type="application/x-msdownload")
        response = self.client.post(
            "/api/applications/",
            {"name": "A", "email": "a@e.com", "resume": bad},
            **API_KEY,
        )
        self.assertEqual(response.status_code, 400)
        self.assertFalse(JobApplication.objects.exists())

    def test_rejects_an_oversized_resume(self):
        big = SimpleUploadedFile(
            "cv.pdf", b"x" * (5 * 1024 * 1024), content_type="application/pdf"
        )
        response = self.client.post(
            "/api/applications/", {"name": "A", "email": "a@e.com", "resume": big}, **API_KEY
        )
        self.assertEqual(response.status_code, 400)

    def test_rejects_a_malformed_email(self):
        """EmailField does not validate under objects.create(), so the view must."""
        response = self.client.post(
            "/api/applications/", {"name": "A", "email": "not-an-email"}, **API_KEY
        )
        self.assertEqual(response.status_code, 400)
        self.assertFalse(JobApplication.objects.exists())

    def test_rejects_an_executable_wearing_a_pdf_name(self):
        """Content-Type and filename are caller-supplied; the bytes are not."""
        disguised = SimpleUploadedFile(
            "cv.pdf", bytes([0x4D, 0x5A, 0x90, 0x00]) + b"payload",
            content_type="application/pdf",
        )
        response = self.client.post(
            "/api/applications/",
            {"name": "A", "email": "a@e.com", "resume": disguised},
            **API_KEY,
        )
        self.assertEqual(response.status_code, 400)
        self.assertFalse(JobApplication.objects.exists())

    def test_accepts_a_word_document(self):
        docx = SimpleUploadedFile(
            "cv.docx",
            bytes([0x50, 0x4B, 0x03, 0x04]) + b" fake zip",
            content_type=(
                "application/vnd.openxmlformats-officedocument"
                ".wordprocessingml.document"
            ),
        )
        response = self.client.post(
            "/api/applications/",
            {"name": "A", "email": "a@e.com", "resume": docx},
            **API_KEY,
        )
        self.assertEqual(response.status_code, 201)
        JobApplication.objects.get().resume.delete(save=False)

    def test_throttles_a_flood_of_applications(self):
        """The form writes a row and up to 4MB a time; it cannot be unbounded."""
        payload = {"name": "A", "email": "flood@example.com"}
        for _ in range(5):
            self.assertEqual(
                self.client.post("/api/applications/", payload, **API_KEY).status_code,
                201,
            )

        response = self.client.post("/api/applications/", payload, **API_KEY)
        self.assertEqual(response.status_code, 429)
        self.assertEqual(JobApplication.objects.count(), 5)

    def test_throttle_separates_applicants_behind_the_same_proxy(self):
        """
        Submissions arrive from Vercel, so REMOTE_ADDR is identical for
        everyone. Distinct applicants must not share one bucket.
        """
        for i in range(5):
            self.assertEqual(
                self.client.post(
                    "/api/applications/",
                    {"name": "A", "email": "first@example.com"},
                    HTTP_X_FORWARDED_FOR="203.0.113.10",
                    **API_KEY,
                ).status_code,
                201,
                msg=f"submission {i} should have been accepted",
            )

        # Same proxy, different applicant and address: still welcome.
        self.assertEqual(
            self.client.post(
                "/api/applications/",
                {"name": "B", "email": "second@example.com"},
                HTTP_X_FORWARDED_FOR="203.0.113.11",
                **API_KEY,
            ).status_code,
            201,
        )

        # The flooder, however, is now blocked.
        self.assertEqual(
            self.client.post(
                "/api/applications/",
                {"name": "A", "email": "first@example.com"},
                HTTP_X_FORWARDED_FOR="203.0.113.10",
                **API_KEY,
            ).status_code,
            429,
        )


class ResumePrivacyTests(TestCase):
    """Resumes are applicant PII; only a signed-in staff user may read one."""

    def setUp(self):
        cache.clear()
        User.objects.create_superuser("staff", "s@e.com", "pw12345!")
        self.client.post(
            "/api/applications/",
            {"name": "R Kumar", "email": "r@example.com",
             "resume": SimpleUploadedFile("cv.pdf", b"%PDF-1.4", content_type="application/pdf")},
            **API_KEY,
        )
        self.application = JobApplication.objects.get()

    def tearDown(self):
        try:
            self.application.resume.delete(save=False)
        except OSError:
            pass

    def test_anonymous_download_is_refused(self):
        response = self.client.get(f"/api/applications/{self.application.pk}/resume/")
        self.assertEqual(response.status_code, 302)
        self.assertIn("/admin/login/", response["Location"])

    def test_staff_download_succeeds(self):
        self.client.login(username="staff", password="pw12345!")
        response = self.client.get(f"/api/applications/{self.application.pk}/resume/")
        self.assertEqual(response.status_code, 200)
        response.close()

    def test_resume_is_stored_outside_public_media(self):
        from django.conf import settings

        path = str(self.application.resume.path)
        self.assertIn("private_media", path)
        self.assertFalse(path.startswith(str(settings.MEDIA_ROOT)))

    def test_storage_refuses_to_build_a_public_url(self):
        with self.assertRaises(ValueError):
            _ = self.application.resume.url


class RevalidateTokenTests(TestCase):
    """The admin's browser carries a short-lived token, never the secret."""

    def test_valid_token_verifies(self):
        self.assertTrue(verify_token(make_token("secret123"), "secret123"))

    def test_token_from_another_secret_is_rejected(self):
        self.assertFalse(verify_token(make_token("secret123"), "different"))

    def test_tampered_token_is_rejected(self):
        token = make_token("secret123")
        flipped = token[:-1] + ("a" if token[-1] != "a" else "b")
        self.assertFalse(verify_token(flipped, "secret123"))

    def test_expired_token_is_rejected(self):
        import time

        from admire import revalidate

        stale = f"{int(time.time()) - revalidate.TOKEN_TTL_SECONDS - 60}"
        token = f"{stale}.{revalidate._sign(stale, 'secret123')}"
        self.assertFalse(verify_token(token, "secret123"))

    def test_empty_secret_disables_verification(self):
        self.assertFalse(verify_token("anything", ""))
