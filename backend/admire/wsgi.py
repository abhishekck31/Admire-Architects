"""
WSGI entrypoint.

On PythonAnywhere the Web tab's WSGI file should set
DJANGO_SETTINGS_MODULE=admire.settings.production before importing this.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "admire.settings.local")

application = get_wsgi_application()
