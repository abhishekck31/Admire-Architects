"""
PythonAnywhere settings.

Selected by setting DJANGO_SETTINGS_MODULE=admire.settings.production in the
WSGI file on the PythonAnywhere Web tab. Every secret comes from backend/.env.
"""

from pathlib import Path

from .base import *  # noqa: F401,F403
from .base import env

DEBUG = False

# base.py gives these development defaults so a fresh clone runs without any
# config. In production that convenience becomes a hazard: a deploy that
# forgot .env would boot happily on a SECRET_KEY and an API key published in
# this repository. Re-reading them with no default turns that into an
# ImproperlyConfigured at startup instead.
SECRET_KEY = env("DJANGO_SECRET_KEY")
BACKEND_API_KEY = env("BACKEND_API_KEY")

# e.g. DJANGO_ALLOWED_HOSTS=admirearchitects.pythonanywhere.com
ALLOWED_HOSTS = env.list("DJANGO_ALLOWED_HOSTS")

# Everything the client creates — the database, uploaded photographs, CVs —
# lives under DATA_ROOT, deliberately OUTSIDE the code checkout, so re-cloning
# or cleaning the repository cannot destroy their content. On PythonAnywhere
# this resolves to ~/admire-data.
DATA_ROOT = Path(env("DATA_ROOT", default=str(Path.home() / "admire-data")))

# SQLite is a deliberate fit here, not a stopgap. PythonAnywhere's free tier
# offers neither MySQL nor Postgres, and blocks outbound connections on
# database ports, so a hosted database is unreachable too. The workload suits
# it regardless: writes are a handful of staff editing content, and read
# traffic is served from the frontend's hour-long cache rather than this box.
#
# Moving to a real server later is one line — set DATABASE_URL to a mysql://
# or postgres:// URL in .env and re-run migrate.
DATABASES = {
    "default": env.db_url(
        "DATABASE_URL",
        default=f"sqlite:///{DATA_ROOT / 'db.sqlite3'}",
    )
}

# Uploaded project photography, served by PythonAnywhere's own web server via
# the /media/ static mapping so it never wakes the Django worker.
MEDIA_ROOT = DATA_ROOT / "media"

# Applicants' CVs. This one gets NO static mapping on the Web tab — that
# absence is what keeps them off the public internet. The staff-gated download
# view in careers/views.py is the only way to read one.
PRIVATE_MEDIA_ROOT = DATA_ROOT / "private_media"

# The admin is served over HTTPS on *.pythonanywhere.com.
CSRF_TRUSTED_ORIGINS = env.list("DJANGO_CSRF_TRUSTED_ORIGINS")
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True
X_FRAME_OPTIONS = "DENY"
SECURE_REFERRER_POLICY = "same-origin"

# PythonAnywhere terminates TLS in front of the app.
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

# Redirect any plain-HTTP request to HTTPS. Safe only because the proxy header
# above is set — without it Django cannot tell that a forwarded request was
# already secure and would redirect forever.
SECURE_SSL_REDIRECT = True

# Tell browsers to use HTTPS for a year without asking first, so a staff login
# typed as "http://..." on a hostile network is never sent in the clear.
#
# INCLUDE_SUBDOMAINS and PRELOAD stay off on purpose: the app lives on a shared
# *.pythonanywhere.com domain, and neither directive is ours to assert there.
# Revisit both if the dashboard ever moves to its own domain.
SECURE_HSTS_SECONDS = 31536000  # 1 year
SECURE_HSTS_INCLUDE_SUBDOMAINS = False
SECURE_HSTS_PRELOAD = False

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {"console": {"class": "logging.StreamHandler"}},
    "root": {"handlers": ["console"], "level": "INFO"},
}
