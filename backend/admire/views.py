from django.conf import settings
from django.contrib.admin.views.decorators import staff_member_required
from django.http import JsonResponse
from django.views.decorators.http import require_GET

from .revalidate import make_token


@require_GET
@staff_member_required
def revalidate_config(request):
    """
    Hand the admin's browser what it needs to refresh the live site.

    Staff-only, and it returns a short-lived HMAC token rather than
    NEXT_REVALIDATE_SECRET, so the secret never leaves this server.
    """
    if not settings.NEXT_REVALIDATE_URL or not settings.NEXT_REVALIDATE_SECRET:
        return JsonResponse({"enabled": False})

    return JsonResponse(
        {
            "enabled": True,
            "url": settings.NEXT_REVALIDATE_URL,
            "token": make_token(),
        }
    )
