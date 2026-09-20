from django.db.models import Case, IntegerField, Prefetch, When
from django.http import Http404, JsonResponse
from django.views.decorators.http import require_GET

from admire.api_auth import require_api_key

from .models import LEGACY_LIST_ORDER, Project, ProjectImage
from .serializers import serialize_project, serialize_projects


def _ordered_projects():
    """
    Reproduce the exact order of the old hardcoded PROJECTS_DATA array.

    That array was assembled Turnkey, then Design & PMC, then Latest, with each
    category in its own source order. The frontend re-sorts into tab order
    where it needs to (/projects filters by category, /gallery sorts by
    CATEGORIES.indexOf), but the home and clients pages slice the first two
    photographed entries straight off this list — so this order is load-bearing
    and must not be "tidied" into tab order.
    """
    category_rank = Case(
        *[
            When(category=name, then=index)
            for index, name in enumerate(LEGACY_LIST_ORDER)
        ],
        default=len(LEGACY_LIST_ORDER),
        output_field=IntegerField(),
    )
    return (
        Project.objects.filter(published=True)
        .annotate(category_rank=category_rank)
        .prefetch_related(
            Prefetch("images", queryset=ProjectImage.objects.order_by("sort_order", "id"))
        )
        .order_by("category_rank", "sort_order", "id")
    )


@require_GET
@require_api_key
def project_list(request):
    return JsonResponse(
        {"projects": serialize_projects(_ordered_projects())}, status=200
    )


@require_GET
@require_api_key
def project_detail(request, slug):
    try:
        project = _ordered_projects().get(slug=slug)
    except Project.DoesNotExist:
        raise Http404("No such project")
    return JsonResponse(serialize_project(project), status=200)
