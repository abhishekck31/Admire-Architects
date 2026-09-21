# Admire Architects

Marketing site for Admire Architects Pvt Ltd — Next.js on Vercel, with a small
Django dashboard the client uses to manage content.

```
admiregrp.in  (this repo, Next.js on Vercel)
  /projects  /gallery  /careers       <- cached 10 min, refreshed on publish
        |  server-side fetch, X-Api-Key       ^
        v                                     |  browser pings on save
<user>.pythonanywhere.com  (backend/)         |
  /admin      <- the content dashboard --------+
  /api/...    <- JSON for this site
```

The frontend never talks to the backend from a browser: every fetch happens
server-side in `src/lib/api.ts`, so the API key stays on the server. If the
backend is unreachable the site falls back to `src/data/projects.fallback.json`
rather than going blank.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- Framer Motion, GSAP, Lenis smooth scrolling, Three.js
- Django 5 backend — see [`backend/README.md`](backend/README.md)

## Local development

```bash
cp .env.example .env.local     # then fill in the values
npm install
npm run dev
```

The site runs without a backend — it renders the fallback content. To run the
dashboard too, follow `backend/README.md` and point `BACKEND_URL` at it.

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server on http://localhost:3000 |
| `npm run build` | Production build |
| `npm run lint` | ESLint |

## Environment

Set these in `.env.local` locally and in the Vercel project settings for
production. See `.env.example` for the annotated copy.

| Variable | Purpose |
| --- | --- |
| `BACKEND_URL` | Django host, no trailing slash. Also whitelists its `/media/**` for `next/image`. |
| `BACKEND_API_KEY` | Shared secret sent as `X-Api-Key`. Must match `backend/.env`. Server-side only. |
| `REVALIDATE_SECRET` | Verifies the dashboard's "refresh the live site" ping. Must match `backend/.env`. |
| `NEXT_PUBLIC_SITE_URL` | Absolute base for canonical tags, Open Graph URLs, `sitemap.xml` and `robots.txt`. Defaults to `https://admiregrp.in`. |

Set `NEXT_PUBLIC_SITE_URL` per-environment. Without it, a preview deployment
advertises production URLs to crawlers.

## Content

Projects and job openings live in the Django dashboard. Pages are cached for
ten minutes and tagged; saving in the dashboard pings `/api/revalidate`, which
drops the tag so the change is live immediately. The ten minutes is only the
worst case if that ping fails.

The site's original photography stays committed under `public/` — it is already
on Vercel's CDN, so it was never re-uploaded to the backend. Photos added
through the dashboard from here on live on the backend's disk.

`src/data/services.ts` is the one definition of the five services; the detail
route builds its static params from it, so a slug that is not in that list 404s.
