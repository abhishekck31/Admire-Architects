from django.urls import path

from . import views

urlpatterns = [
    path("jobs/", views.job_list, name="job-list"),
    path("jobs/<slug:slug>/", views.job_detail, name="job-detail"),
    path("applications/", views.application_create, name="application-create"),
    path(
        "applications/<int:pk>/resume/",
        views.resume_download,
        name="application-resume",
    ),
]
