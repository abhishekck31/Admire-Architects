from io import BytesIO

from django.conf import settings
from django.core.files.base import ContentFile
from django.db import models
from PIL import Image, ImageOps

# Display order of the category tabs on /projects, and the order the API sorts
# by. Kept as choices rather than a table because these three are structural to
# the site's layout, not content the client edits.
CATEGORY_LATEST = "Latest Projects"
CATEGORY_DESIGN_PMC = "Design & PMC"
CATEGORY_TURNKEY = "Turnkey Projects"

CATEGORY_CHOICES = [
    (CATEGORY_LATEST, CATEGORY_LATEST),
    (CATEGORY_DESIGN_PMC, CATEGORY_DESIGN_PMC),
    (CATEGORY_TURNKEY, CATEGORY_TURNKEY),
]

# Order of the category tabs on /projects, and the order /gallery groups its
# sections in. The frontend applies this itself.
CATEGORY_ORDER = [CATEGORY_LATEST, CATEGORY_DESIGN_PMC, CATEGORY_TURNKEY]

# Order the API returns projects in, which is NOT the tab order above.
#
# It reproduces the sequence the site's original hardcoded array was assembled
# in (Turnkey, then Design & PMC, then Latest). That matters because the home
# page and the clients page both take the first two *photographed* entries
# straight off the list, so this sequence decides which projects they feature.
# Reorder it and those pages quietly change.
LEGACY_LIST_ORDER = [CATEGORY_TURNKEY, CATEGORY_DESIGN_PMC, CATEGORY_LATEST]


class Project(models.Model):
    slug = models.SlugField(
        max_length=120,
        unique=True,
        help_text=(
            "Used in the page URL, e.g. /projects/latestprojects-0. "
            "Changing this breaks existing links — leave it alone once saved."
        ),
    )
    title = models.CharField(max_length=200)
    location = models.CharField(max_length=120, default="Multiple Locations")
    area = models.CharField(
        max_length=120,
        blank=True,
        null=True,
        help_text="Floor area or project value, e.g. '40,000 SFT'. Leave empty to hide the Scale field.",
    )
    category = models.CharField(max_length=40, choices=CATEGORY_CHOICES)
    description = models.TextField()
    sort_order = models.PositiveIntegerField(
        default=0, help_text="Lower numbers appear first within the category."
    )
    published = models.BooleanField(
        default=True, help_text="Unpublish to hide from the website without deleting."
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["sort_order", "id"]
        indexes = [models.Index(fields=["category", "sort_order"])]

    def __str__(self):
        return f"{self.title} — {self.location}"

    @property
    def image_urls(self) -> list[str]:
        """Ordered photo URLs; the first is the cover."""
        return [image.url for image in self.images.all()]


def _upload_to(instance, filename):
    return f"projects/{filename}"


class ProjectImage(models.Model):
    """
    A photo belonging to a project.

    Two sources, one interface. `legacy_path` holds the site's original
    photography, which stays committed under the Next.js public/ folder — it is
    already on Vercel's CDN and costs nothing, so it was never re-uploaded.
    `image` holds anything uploaded through this dashboard, which lands on
    PythonAnywhere's disk. `url` hides the difference from the API.
    """

    project = models.ForeignKey(Project, related_name="images", on_delete=models.CASCADE)
    image = models.ImageField(upload_to=_upload_to, blank=True)
    legacy_path = models.CharField(
        max_length=300,
        blank=True,
        help_text="Site-relative path for original photography, e.g. /Admire Website - Project Images/...",
    )
    alt = models.CharField(max_length=200, blank=True)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "id"]
        indexes = [models.Index(fields=["project", "sort_order"])]

    def __str__(self):
        return self.alt or self.url or f"Image {self.pk}"

    @property
    def url(self) -> str:
        if self.legacy_path:
            return self.legacy_path
        if self.image:
            return f"{settings.PUBLIC_MEDIA_BASE.rstrip('/')}{self.image.url}"
        return ""

    @property
    def is_legacy(self) -> bool:
        return bool(self.legacy_path)

    # Downscaling is what makes this workable on a small free-tier disk: a 6MB
    # camera original becomes roughly 400KB, so the disk holds ~1000 photos
    # rather than ~60. next/image resizes again per breakpoint on the frontend,
    # so 2400px is ample.
    MAX_EDGE = 2400
    JPEG_QUALITY = 85

    def save(self, *args, **kwargs):
        # FieldFile._committed is False only for a freshly assigned upload, so
        # this processes new files once and skips every later edit of the row.
        is_new_upload = bool(self.image) and not getattr(self.image, "_committed", True)
        if is_new_upload and not self.legacy_path:
            self._downscale()
        super().save(*args, **kwargs)

    def _downscale(self):
        try:
            self.image.open()
            img = Image.open(self.image)
            # Honour EXIF orientation, else phone shots come out sideways.
            img = ImageOps.exif_transpose(img)

            if img.mode in ("RGBA", "LA", "P"):
                img = img.convert("RGB")

            if max(img.size) > self.MAX_EDGE:
                img.thumbnail((self.MAX_EDGE, self.MAX_EDGE), Image.LANCZOS)

            buffer = BytesIO()
            img.save(buffer, format="JPEG", quality=self.JPEG_QUALITY, optimize=True)

            name = self.image.name.rsplit("/", 1)[-1]
            stem = name.rsplit(".", 1)[0]
            self.image.save(
                f"{stem}.jpg", ContentFile(buffer.getvalue()), save=False
            )
        except Exception:
            # A photo that Pillow cannot read should still be storable — the
            # client gets their upload, it just keeps its original size.
            pass
