"""
PythonAnywhere settings.

Selected by setting DJANGO_SETTINGS_MODULE=admire.settings.production in the
WSGI file on the PythonAnywhere Web tab. Every secret comes from backend/.env.
"""

from .base import *  # noqa: F401,F403
from .base import env

DEBUG = False

# e.g. DJANGO_ALLOWED_HOSTS=admirearchitects.pythonanywhere.com
ALLOWED_HOSTS = env.list("DJANGO_ALLOWED_HOSTS")

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": env("DB_NAME"),
        "USER": env("DB_USER"),
        "PASSWORD": env("DB_PASSWORD"),
        "HOST": env("DB_HOST"),
        "PORT": env("DB_PORT", default="3306"),
        "OPTIONS": {
            "charset": "utf8mb4",
            # PythonAnywhere's MySQL connections drop when idle; without this
            # the first request after a quiet spell raises OperationalError.
            "init_command": "SET sql_mode='STRICT_TRANS_TABLES'",
        },
        "CONN_MAX_AGE": 0,
    }
}

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

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {"console": {"class": "logging.StreamHandler"}},
    "root": {"handlers": ["console"], "level": "INFO"},
}
