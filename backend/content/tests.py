import io

from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from PIL import Image

from .models import Project, ProjectImage

API_KEY = {"HTTP_X_API_KEY": "dev-only-api-key"}


def make_project(**kwargs):
    defaults = {
        "slug": "latestprojects-0",
        "title": "Celonis @ Table Space Tower",
        "location": "Bangalore",
        "category": "Latest Projects",
        "description": "A project.",
    }
    return Project.objects.create(**{**defaults, **kwargs})


class ProjectApiTests(TestCase):
    def setUp(self):
        self.project = make_project()
        ProjectImage.objects.create(
            project=self.project, legacy_path="/legacy/01.jpg", sort_order=0
        )
        ProjectImage.objects.create(
            project=self.project, legacy_path="/legacy/02.jpg", sort_order=1
        )

    def test_requires_api_key(self):
        self.assertEqual(self.client.get("/api/projects/").status_code, 401)
        self.assertEqual(
            self.client.get("/api/projects/", HTTP_X_API_KEY="wrong").status_code, 401
        )

    def test_returns_frontend_project_shape(self):
        payload = self.client.get("/api/projects/", **API_KEY).json()["projects"][0]
        self.assertEqual(
            set(payload),
            {"id", "slug", "title", "location", "area", "category", "description", "image", "allImages"},
        )
        # `id` mirrors the slug so existing /projects/<id> links keep resolving.
        self.assertEqual(payload["id"], "latestprojects-0")
        self.assertIsNone(payload["area"])

    def test_cover_is_first_image_by_sort_order(self):
        payload = self.client.get("/api/projects/", **API_KEY).json()["projects"][0]
        self.assertEqual(payload["image"], "/legacy/01.jpg")
        self.assertEqual(payload["allImages"], ["/legacy/01.jpg", "/legacy/02.jpg"])

    def test_reordering_changes_the_cover(self):
        first, second = self.project.images.all()
        first.sort_order, second.sort_order = 1, 0
        first.save(), second.save()
        payload = self.client.get("/api/projects/", **API_KEY).json()["projects"][0]
        self.assertEqual(payload["image"], "/legacy/02.jpg")

    def test_unpublished_projects_are_hidden(self):
        self.project.published = False
        self.project.save()
        self.assertEqual(self.client.get("/api/projects/", **API_KEY).json()["projects"], [])
        self.assertEqual(
            self.client.get("/api/projects/latestprojects-0/", **API_KEY).status_code, 404
        )

    def test_list_order_matches_the_original_hardcoded_array(self):
        """
        Turnkey, then Design & PMC, then Latest — not the tab order.

        The home and clients pages slice the first photographed entries off
        this list, so the sequence decides which projects they feature.
        """
        make_project(slug="turnkeyprojects-0", title="T", category="Turnkey Projects")
        make_project(slug="designpmc-0", title="D", category="Design & PMC")
        order = [p["category"] for p in self.client.get("/api/projects/", **API_KEY).json()["projects"]]
        self.assertEqual(order, ["Turnkey Projects", "Design & PMC", "Latest Projects"])


class ImageProcessingTests(TestCase):
    def setUp(self):
        self.project = make_project()

    @staticmethod
    def _photo(width, height):
        buffer = io.BytesIO()
        Image.new("RGB", (width, height), (30, 58, 138)).save(
            buffer, format="JPEG", quality=95
        )
        return buffer.getvalue()

    def test_oversized_upload_is_downscaled(self):
        """Free-tier disk is small; a camera original must not land as-is."""
        raw = self._photo(5000, 3000)
        image = ProjectImage(project=self.project)
        image.image = SimpleUploadedFile("huge.jpg", raw, content_type="image/jpeg")
        image.save()

        width, height = Image.open(image.image.path).size
        self.assertEqual(max(width, height), ProjectImage.MAX_EDGE)
        self.assertLess(image.image.size, len(raw))
        image.image.delete(save=False)

    def test_small_upload_keeps_its_dimensions(self):
        image = ProjectImage(project=self.project)
        image.image = SimpleUploadedFile(
            "small.jpg", self._photo(800, 600), content_type="image/jpeg"
        )
        image.save()
        self.assertEqual(Image.open(image.image.path).size, (800, 600))
        image.image.delete(save=False)

    def test_legacy_paths_stay_site_relative(self):
        """Original photography stays in the Next.js public/ folder."""
        image = ProjectImage.objects.create(
            project=self.project, legacy_path="/Admire Website - Project Images/x.jpg"
        )
        self.assertTrue(image.is_legacy)
        self.assertEqual(image.url, "/Admire Website - Project Images/x.jpg")


class AdminTests(TestCase):
    def setUp(self):
        self.project = make_project()
        User.objects.create_superuser("staff", "s@e.com", "pw12345!")

    def test_anonymous_is_redirected_to_login(self):
        self.assertEqual(self.client.get("/admin/content/project/").status_code, 302)

    def test_dashboard_markup_matches_the_publish_button_hooks(self):
        """
        static/js/admin_revalidate.js keys off two things the admin renders:
        a logout form (to know it is on a signed-in page, so the "Publish to
        site" button appears) and .alert-success (to fire automatically after
        a save). Both come from Jazzmin's templates, so a Jazzmin upgrade
        could silently remove them and break publishing with no error.
        """
        self.client.login(username="staff", password="pw12345!")
        html = self.client.get("/admin/content/project/").content.decode()

        self.assertIn('id="logout-form"', html)
        self.assertIn("admin_revalidate.js", html)

        # A save must produce the success markup the script listens for.
        response = self.client.post(
            f"/admin/content/project/{self.project.pk}/change/",
            {
                "title": "Celonis @ Table Space Tower",
                "location": "Bangalore",
                "category": "Latest Projects",
                "area": "",
                "description": "A project.",
                "published": "on",
                "sort_order": "0",
                "images-TOTAL_FORMS": "0",
                "images-INITIAL_FORMS": "0",
                "images-MIN_NUM_FORMS": "0",
                "images-MAX_NUM_FORMS": "1000",
            },
            follow=True,
        )
        self.assertIn("alert-success", response.content.decode())

    def test_staff_can_open_dashboard_screens(self):
        self.client.login(username="staff", password="pw12345!")
        for url in (
            "/admin/content/project/",
            f"/admin/content/project/{self.project.pk}/change/",
            "/admin/careers/jobopening/",
            "/admin/careers/jobapplication/",
            "/admin/revalidate-config/",
        ):
            with self.subTest(url=url):
                self.assertEqual(self.client.get(url).status_code, 200)
