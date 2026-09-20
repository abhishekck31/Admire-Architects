from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from django.views.generic import RedirectView

from . import views

urlpatterns = [
    # The dashboard is the only thing a human visits here, so send / to it.
    path("", RedirectView.as_view(url="/admin/", permanent=False)),
    # Must precede admin.site.urls so it is not swallowed by the admin catch-all.
    path("admin/revalidate-config/", views.revalidate_config, name="revalidate-config"),
    path("admin/", admin.site.urls),
    path("api/", include("content.urls")),
    path("api/", include("careers.urls")),
]

# In production PythonAnywhere serves /media/ and /static/ itself via the Web
# tab's static mappings, which is both faster and free of CPU-seconds cost.
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

admin.site.site_title = "Admire Architects"
admin.site.site_header = "Admire Architects"
admin.site.index_title = "Content dashboard"
