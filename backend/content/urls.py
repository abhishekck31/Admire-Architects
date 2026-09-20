from django.urls import path

from . import views

urlpatterns = [
    path("projects/", views.project_list, name="project-list"),
    path("projects/<slug:slug>/", views.project_detail, name="project-detail"),
]
