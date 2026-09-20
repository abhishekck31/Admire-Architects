"""
Short-lived tokens authorising a "refresh the live site" ping.

Why a token rather than the shared secret: the ping is fired by the admin's
browser (PythonAnywhere's free tier blocks Django's own outbound calls to
non-whitelisted hosts like Vercel), so whatever the page carries is visible in
its HTML. A timestamped HMAC keeps the secret server-side and expires quickly,
while still being trivial for the Next.js route to verify with node:crypto.

Wire format:  "<unix-ts>.<hex hmac-sha256(secret, unix-ts)>"
"""

import hashlib
import hmac
import time

from django.conf import settings

# Generous enough that a token minted on page load still works after the admin
# fills in a long form, short enough to be worthless if it leaks.
TOKEN_TTL_SECONDS = 30 * 60


def _sign(timestamp: str, secret: str) -> str:
    return hmac.new(
        secret.encode("utf-8"), timestamp.encode("utf-8"), hashlib.sha256
    ).hexdigest()


def make_token(secret: str | None = None) -> str:
    """Mint a token the Next.js revalidate route will accept."""
    secret = secret if secret is not None else settings.NEXT_REVALIDATE_SECRET
    if not secret:
        return ""
    timestamp = str(int(time.time()))
    return f"{timestamp}.{_sign(timestamp, secret)}"


def verify_token(token: str, secret: str | None = None) -> bool:
    """Mirror of the Next.js check — kept here so the format has one owner."""
    secret = secret if secret is not None else settings.NEXT_REVALIDATE_SECRET
    if not secret or not token or "." not in token:
        return False
    timestamp, signature = token.split(".", 1)
    if not hmac.compare_digest(signature, _sign(timestamp, secret)):
        return False
    try:
        age = time.time() - int(timestamp)
    except ValueError:
        return False
    return 0 <= age <= TOKEN_TTL_SECONDS
