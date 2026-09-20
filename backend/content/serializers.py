"""
Hand-rolled serialisation.

The output shape deliberately mirrors the `Project` interface the Next.js
components already consume, so switching them from the old hardcoded module to
this API needed almost no change inside the components themselves.
"""

from .models import Project


def serialize_project(project: Project) -> dict:
    urls = project.image_urls
    return {
        "id": project.slug,
        "slug": project.slug,
        "title": project.title,
        "location": project.location,
        "area": project.area or None,
        "category": project.category,
        "description": project.description,
        "image": urls[0] if urls else None,
        "allImages": urls,
    }


def serialize_projects(projects) -> list[dict]:
    return [serialize_project(p) for p in projects]
