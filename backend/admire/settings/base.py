"""
Settings shared by every environment.

Environment-specific modules (local.py, production.py) import * from here and
override what differs. DJANGO_SETTINGS_MODULE selects one; it defaults to
admire.settings.local in manage.py and is set explicitly in the PythonAnywhere
WSGI file.
"""

from pathlib import Path

import environ

# backend/admire/settings/base.py -> backend/
BASE_DIR = Path(__file__).resolve().parent.parent.parent

env = environ.Env()
environ.Env.read_env(BASE_DIR / ".env")

SECRET_KEY = env("DJANGO_SECRET_KEY", default="dev-only-insecure-key-change-me")
DEBUG = env.bool("DJANGO_DEBUG", default=False)
ALLOWED_HOSTS = env.list("DJANGO_ALLOWED_HOSTS", default=[])

# Shared secret the Next.js server sends as X-Api-Key on every API call. The
# key never reaches a browser: all frontend fetches happen server-side.
BACKEND_API_KEY = env("BACKEND_API_KEY", default="dev-only-api-key")

# Absolute base the API prepends to uploaded media paths, so Next.js receives
# fully-qualified URLs it can hand straight to next/image.
# e.g. "https://admirearchitects.pythonanywhere.com"
PUBLIC_MEDIA_BASE = env("PUBLIC_MEDIA_BASE", default="http://127.0.0.1:8000")

# Where the admin's browser sends the "refresh the live site" ping after a
# save. PythonAnywhere's free tier blocks outbound calls to non-whitelisted
# hosts, so this fires from the browser rather than from Django itself.
NEXT_REVALIDATE_URL = env("NEXT_REVALIDATE_URL", default="")
NEXT_REVALIDATE_SECRET = env("NEXT_REVALIDATE_SECRET", default="")

INSTALLED_APPS = [
    # Must precede django.contrib.admin — Jazzmin overrides admin templates.
    "jazzmin",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "adminsortable2",
    "content",
    "careers",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "admire.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "admire.wsgi.application"

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "Asia/Kolkata"
USE_I18N = True
USE_TZ = True

STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_DIRS = [BASE_DIR / "static"]

# Uploaded project photography. Served by PythonAnywhere's own web server via a
# /media/ static mapping, which does not wake the Django worker and so does not
# consume the free tier's CPU-seconds budget.
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

# Resumes live OUTSIDE MEDIA_ROOT and get no PythonAnywhere static mapping, so
# they are unreachable by URL. They are served only through the staff-gated
# download view in careers/views.py.
PRIVATE_MEDIA_ROOT = BASE_DIR / "private_media"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# The dashboard is the only thing anyone signs in to here. Django defaults
# these to /accounts/profile/, a URL this project does not define, so signing
# in at /admin/login/ without a ?next= lands on a 404.
LOGIN_URL = "/admin/login/"
LOGIN_REDIRECT_URL = "/admin/"
LOGOUT_REDIRECT_URL = "/admin/login/"

# Uploads are downscaled by ProjectImage.save(), but cap what Django will
# accept in the first place so a huge file cannot fill the free-tier disk.
DATA_UPLOAD_MAX_MEMORY_SIZE = 20 * 1024 * 1024  # 20MB
FILE_UPLOAD_MAX_MEMORY_SIZE = 20 * 1024 * 1024

JAZZMIN_SETTINGS = {
    "site_title": "Admire Architects",
    "site_header": "Admire Architects",
    "site_brand": "Admire Architects",
    "welcome_sign": "Admire Architects — Content Dashboard",
    "copyright": "Admire Architects Pvt Ltd",
    "search_model": ["content.Project", "careers.JobOpening"],
    "order_with_respect_to": ["content", "careers", "auth"],
    "icons": {
        "content.Project": "fas fa-building",
        "careers.JobOpening": "fas fa-briefcase",
        "careers.JobApplication": "fas fa-inbox",
        "auth.User": "fas fa-user",
        "auth.Group": "fas fa-users",
    },
    "custom_links": {},
    "show_ui_builder": False,
    # Refreshes the live site from the admin's browser after a save; see
    # static/js/admin_revalidate.js for why it cannot run server-side.
    "custom_js": "js/admin_revalidate.js",
}

JAZZMIN_UI_TWEAKS = {
    "navbar": "navbar-dark",
    "accent": "accent-navy",
    "navbar_fixed": True,
    "sidebar": "sidebar-dark-primary",
    "sidebar_nav_flat_style": True,
    "theme": "default",
}
