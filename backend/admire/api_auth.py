"""
API-key gate for the JSON endpoints.

Every frontend fetch happens server-side in Next.js, so the key never reaches a
browser. Requiring it also keeps stray traffic from burning PythonAnywhere's
free CPU-seconds budget.
"""

import hmac
from functools import wraps

from django.conf import settings
from django.http import JsonResponse

API_KEY_HEADER = "X-Api-Key"


def require_api_key(view):
    @wraps(view)
    def wrapper(request, *args, **kwargs):
        provided = request.headers.get(API_KEY_HEADER, "")
        expected = settings.BACKEND_API_KEY
        # compare_digest keeps the check constant-time.
        if not expected or not hmac.compare_digest(provided, expected):
            return JsonResponse({"detail": "Invalid or missing API key."}, status=401)
        return view(request, *args, **kwargs)

    return wrapper
