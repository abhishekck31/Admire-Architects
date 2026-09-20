from django.contrib import admin, messages
from django.urls import reverse
from django.utils import timezone
from django.utils.html import format_html

from .models import STATUS_CLOSED, STATUS_PUBLISHED, JobApplication, JobOpening


@admin.register(JobOpening)
class JobOpeningAdmin(admin.ModelAdmin):
    list_display = ("title", "department", "location", "employment_type", "status", "applicant_count", "sort_order")
    list_filter = ("status", "department", "employment_type")
    list_editable = ("status", "sort_order")
    search_fields = ("title", "location", "slug")
    prepopulated_fields = {"slug": ("title",)}
    save_on_top = True
    actions = ("publish_selected", "close_selected")

    fieldsets = (
        (None, {"fields": ("title", "department", "location", "employment_type", "experience")}),
        ("Description", {"fields": ("description", "responsibilities", "requirements")}),
        (
            "Publishing",
            {
                "fields": ("slug", "status", "sort_order", "posted_at", "closes_at"),
                "description": "Only openings set to Published appear on the website.",
            },
        ),
    )

    @admin.display(description="Applicants")
    def applicant_count(self, obj):
        count = obj.applications.count()
        if not count:
            return "—"
        url = reverse("admin:careers_jobapplication_changelist")
        return format_html('<a href="{}?job__id__exact={}">{}</a>', url, obj.pk, count)

    @admin.action(description="Publish selected openings")
    def publish_selected(self, request, queryset):
        updated = queryset.update(status=STATUS_PUBLISHED, posted_at=timezone.now())
        self.message_user(
            request, f"{updated} opening(s) published.", messages.SUCCESS
        )

    @admin.action(description="Close selected openings")
    def close_selected(self, request, queryset):
        updated = queryset.update(status=STATUS_CLOSED)
        self.message_user(request, f"{updated} opening(s) closed.", messages.SUCCESS)

    def save_model(self, request, obj, form, change):
        # Stamp the publish date the first time it goes live, so the careers
        # page can show "posted on" without the client filling it in.
        if obj.status == STATUS_PUBLISHED and not obj.posted_at:
            obj.posted_at = timezone.now()
        super().save_model(request, obj, form, change)


@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    """
    An inbox, not an editor. Applications arrive from the website; the only
    thing staff change here is the review status.

    The list columns are the first-pass sift for a studio hire — experience,
    notice period and whether a portfolio is attached — so a reviewer can
    shortlist without opening every record.
    """

    list_display = (
        "name", "job_title_snapshot", "years_experience", "current_designation",
        "current_location", "notice_period", "portfolio_link", "resume_link",
        "status", "created_at",
    )
    list_filter = (
        "status", "job", "years_experience", "notice_period",
        "highest_qualification", "open_to_relocation", "created_at",
    )
    list_editable = ("status",)
    search_fields = (
        "name", "email", "phone", "job_title_snapshot",
        "current_employer", "current_designation", "institution",
        "software_skills", "project_types",
    )
    date_hierarchy = "created_at"

    readonly_fields = (
        "job", "job_title_snapshot", "name", "email", "phone",
        "current_location", "open_to_relocation", "years_experience",
        "current_employer", "current_designation", "notice_period",
        "current_ctc", "expected_ctc", "highest_qualification", "institution",
        "graduation_year", "coa_registration", "portfolio_link", "linkedin_link",
        "software_skills", "project_types", "message", "resume_link", "created_at",
    )
    exclude = ("resume", "portfolio_url", "linkedin_url")

    fieldsets = (
        ("Applied for", {"fields": ("job", "job_title_snapshot", "created_at", "status")}),
        ("Contact", {"fields": ("name", "email", "phone", "current_location", "open_to_relocation")}),
        (
            "Experience",
            {
                "fields": (
                    "years_experience", "current_employer", "current_designation",
                    "notice_period", "current_ctc", "expected_ctc",
                )
            },
        ),
        (
            "Qualifications",
            {"fields": ("highest_qualification", "institution", "graduation_year", "coa_registration")},
        ),
        (
            "Work",
            {"fields": ("portfolio_link", "linkedin_link", "software_skills", "project_types")},
        ),
        ("Submission", {"fields": ("resume_link", "message")}),
    )

    @admin.display(description="CV")
    def resume_link(self, obj):
        if not obj.resume:
            return "—"
        # Never obj.resume.url — the private storage refuses to build one.
        url = reverse("application-resume", args=[obj.pk])
        return format_html('<a href="{}" download>Download CV</a>', url)

    @admin.display(description="Portfolio")
    def portfolio_link(self, obj):
        if not obj.portfolio_url:
            return "—"
        return format_html(
            '<a href="{}" target="_blank" rel="noopener noreferrer">Open portfolio</a>',
            obj.portfolio_url,
        )

    @admin.display(description="LinkedIn")
    def linkedin_link(self, obj):
        if not obj.linkedin_url:
            return "—"
        return format_html(
            '<a href="{}" target="_blank" rel="noopener noreferrer">{}</a>',
            obj.linkedin_url,
            obj.linkedin_url,
        )

    def has_add_permission(self, request):
        return False
