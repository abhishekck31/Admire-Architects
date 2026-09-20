from adminsortable2.admin import SortableAdminBase, SortableInlineAdminMixin
from django.contrib import admin
from django.utils.html import format_html

from .models import Project, ProjectImage


class ProjectImageInline(SortableInlineAdminMixin, admin.TabularInline):
    """
    Drag-to-reorder photo rows. The topmost photo is the project's cover and
    the one the gallery shows, so reordering is how the client changes it.
    """

    model = ProjectImage
    fields = ("preview", "image", "alt", "sort_order")
    readonly_fields = ("preview",)
    extra = 3
    ordering = ("sort_order",)

    @admin.display(description="Preview")
    def preview(self, obj):
        if not obj.pk or not obj.url:
            return "—"
        return format_html(
            '<img src="{}" style="height:70px;width:auto;border-radius:4px;'
            'object-fit:cover;" loading="lazy" />',
            obj.url,
        )


@admin.register(Project)
class ProjectAdmin(SortableAdminBase, admin.ModelAdmin):
    list_display = ("title", "location", "category", "photo_count", "published", "sort_order")
    list_filter = ("category", "published")
    list_editable = ("published", "sort_order")
    search_fields = ("title", "location", "slug")
    prepopulated_fields = {"slug": ("title",)}
    inlines = [ProjectImageInline]
    save_on_top = True

    fieldsets = (
        (None, {"fields": ("title", "location", "category", "area", "description")}),
        (
            "Publishing",
            {
                "fields": ("slug", "published", "sort_order"),
                "description": (
                    "Changing the slug changes the project's web address and "
                    "breaks any existing link to it."
                ),
            },
        ),
    )

    @admin.display(description="Photos")
    def photo_count(self, obj):
        return obj.images.count()

    def get_readonly_fields(self, request, obj=None):
        # Slug is free to set when creating, frozen afterwards so permalinks
        # and the original /projects/<id> URLs keep working.
        if obj:
            return ("slug",)
        return ()

    def get_prepopulated_fields(self, request, obj=None):
        # Django rejects a prepopulated field that is also readonly, so the
        # title -> slug helper only applies on the add form.
        if obj:
            return {}
        return self.prepopulated_fields
