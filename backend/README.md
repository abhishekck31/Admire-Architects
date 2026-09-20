# Admire Architects — content backend

Django app powering the content dashboard for the Admire Architects website.
The client signs in here to add projects and photography, post job openings and
read job applications; the Next.js site on Vercel reads it over a small JSON
API.

```
admireartitects.com  (Next.js on Vercel)
  /projects  /gallery  /careers        <- cached 1 hour, refreshed on publish
        |  server-side fetch, X-Api-Key       ^
        v                                     |  browser pings on save
<user>.pythonanywhere.com  (this app)         |
  /admin      <- the dashboard  ---------------+
  /api/...    <- JSON for the site
  /media/     <- uploaded photos   (public, served by PythonAnywhere)
  private_media/ <- resumes        (no URL; staff-gated view only)
```

## Local development

```bash
cd backend
python -m venv .venv && .venv/Scripts/activate   # Windows
pip install -r requirements.txt

python manage.py migrate
python manage.py import_projects                 # loads seed/projects.json
python manage.py createsuperuser
python manage.py runserver
```

Defaults to SQLite and `DEBUG=True` via `admire/settings/local.py`, so no MySQL
or `.env` is needed locally. The dashboard is at http://127.0.0.1:8000/admin/.

Run the tests with `python manage.py test` (31 tests, covering the API shape,
ordering, image downscaling and resume privacy).

## Seed data

`seed/projects.json` holds the site's original 84 projects. It was generated
once from the frontend's old hardcoded data module, at the point that module
was retired; the generator lives in git history (`scripts/export-projects.ts`,
removed in the same change). The file is frozen input — regenerating it is not
something that should ever be needed.

`import_projects` is idempotent. It only replaces rows that came from the seed,
so photos the client has uploaded through the dashboard survive a re-run. Pass
`--reset` to wipe everything first (this destroys dashboard edits).

**Photographs are not uploaded by the import.** The original 292MB of project
photography stays committed under the Next.js `public/` folder, where Vercel's
CDN already serves it for free. Each seeded image row just records its
site-relative path. Only photos added through the dashboard from here on live
on this server's disk.

## Deploying to PythonAnywhere

1. **Console** — clone *only the backend* and build the virtualenv:
   ```bash
   git clone --filter=blob:none --no-checkout https://github.com/abhishekck31/Admire-Architects.git
   cd ~/Admire-Architects
   git sparse-checkout init --cone
   git sparse-checkout set backend
   git checkout main
   mkvirtualenv --python=/usr/bin/python3.10 admire
   pip install -r ~/Admire-Architects/backend/requirements.txt
   ```

   A full clone does not fit the free tier's 512MB disk: the repo carries
   ~292MB of site photography that the backend never needs, since those images
   are served from the frontend's CDN and this side only stores their paths.
   The sparse checkout is ~750KB. `git pull` still works for deploys.

2. **Storage** — `mkdir -p ~/admire-data`. The database, uploaded photos and
   CVs all live here, deliberately outside the checkout, so re-cloning or
   cleaning the repo cannot destroy the client's content.

   The database is SQLite. The free tier offers no MySQL or Postgres and
   blocks outbound connections on database ports, so a hosted one is not
   reachable either — and the workload suits SQLite regardless: writes are a
   few staff editing content, while read traffic is served from the
   frontend's hour-long cache. To move to a real server later, install the
   driver and set `DATABASE_URL` in `.env`.

3. **Config** — `cp backend/.env.example backend/.env` and fill it in. Generate
   the two secrets with:
   ```bash
   python -c "from django.core.management.utils import get_random_secret_key as k; print(k())"
   python -c "import secrets; print(secrets.token_urlsafe(32))"
   ```

4. **Web tab** → Add a new web app → Manual configuration → Python 3.10.
   - *Source code*: `/home/<user>/Admire-Architects/backend`
   - *Virtualenv*: `/home/<user>/.virtualenvs/admire`
   - *WSGI file*: replace its contents with:
     ```python
     import os, sys
     path = "/home/<user>/Admire-Architects/backend"
     if path not in sys.path:
         sys.path.insert(0, path)
     os.environ["DJANGO_SETTINGS_MODULE"] = "admire.settings.production"
     from django.core.wsgi import get_wsgi_application
     application = get_wsgi_application()
     ```

5. **Static file mappings** — add exactly these two. Serving them here keeps
   photo traffic off the Django worker, so it does not consume the free tier's
   CPU-seconds budget:

   | URL | Directory |
   |---|---|
   | `/static/` | `/home/<user>/Admire-Architects/backend/staticfiles` |
   | `/media/`  | `/home/<user>/admire-data/media` |

   > **Never add a mapping for `private_media/`.** That directory holds
   > applicants' CVs. Having no mapping is what keeps them unreachable by URL;
   > the staff-gated download view is the only way to read one.

6. **Initialise**:
   ```bash
   cd ~/Admire-Architects/backend
   python manage.py migrate
   python manage.py collectstatic --noinput
   python manage.py createsuperuser
   python manage.py import_projects
   ```

7. **Reload** from the Web tab.

Deploying a change later is `git pull` then Reload.

### Vercel side

Set these in the Next.js project's environment variables:

| Variable | Value |
|---|---|
| `BACKEND_URL` | `https://<user>.pythonanywhere.com` |
| `BACKEND_API_KEY` | same value as `BACKEND_API_KEY` here |
| `REVALIDATE_SECRET` | same value as `NEXT_REVALIDATE_SECRET` here |

## How "publish instantly" works

The site caches backend responses for an hour, so PythonAnywhere is barely
touched. When the client saves in the dashboard, the page refreshes the live
site immediately.

That ping is fired by **the browser**, not by Django — PythonAnywhere's free
tier only allows outbound requests to whitelisted hosts, so this app cannot
reach Vercel itself. `static/js/admin_revalidate.js` runs after a successful
save, fetches a short-lived HMAC token from `/admin/revalidate-config/`, and
POSTs it to the site's revalidate route. The raw secret never reaches a
browser, and the token expires in 30 minutes.

If the ping fails the client sees "Live site will update within the hour" —
the content is already saved, and the ordinary cache window picks it up.

## Things worth knowing

- **Free accounts need a login every ~3 months** or the web app stops serving.
  The site has a committed fallback snapshot so `/projects` and `/gallery` keep
  rendering if that happens, but the dashboard will be down.
- **Uploads are downscaled to 2400px / JPEG q85 on save** (`ProjectImage.save`).
  This is what makes a ~512MB disk hold roughly a thousand photos instead of
  sixty. Do not remove it.
- **Project slugs are frozen after creation.** They carry the original
  positional ids (`latestprojects-0`), so every existing `/projects/<id>` link
  still resolves. The admin makes the field read-only on edit for this reason.
- **The API list order is Turnkey → Design & PMC → Latest**, which is *not* the
  tab order on the site. It reproduces the original hardcoded array, and the
  home and clients pages slice the first photographed entries off it. See
  `content/models.py: LEGACY_LIST_ORDER`.
