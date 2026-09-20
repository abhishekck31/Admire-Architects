"""Local development settings — SQLite, debug on, no MySQL driver needed."""

from .base import *  # noqa: F401,F403
from .base import BASE_DIR

DEBUG = True

# "testserver" is the host Django's test client sends.
ALLOWED_HOSTS = ["127.0.0.1", "localhost", "testserver"]

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}
