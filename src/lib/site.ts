/**
 * Canonical site identity, in one place.
 *
 * Every absolute URL the site emits — canonical tags, Open Graph URLs, the
 * sitemap, robots.txt — is built from SITE_URL. Keeping it here means a domain
 * change is one edit rather than a hunt through page files.
 *
 * NEXT_PUBLIC_SITE_URL overrides it, which is what makes Vercel preview
 * deployments advertise their own URL instead of pointing search engines at
 * production.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://admiregrp.in"
).replace(/\/$/, "");

export const SITE_NAME = "Admire Architects Pvt Ltd";

export const SITE_DESCRIPTION =
  "Corporate architecture, interior design and turnkey project delivery for enterprise clients across India.";

/** Absolute URL for a site-relative path, e.g. url("/projects") */
export function url(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
