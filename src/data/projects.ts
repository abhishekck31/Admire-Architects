/**
 * Shared project types and category order.
 *
 * Projects themselves now live in the Django dashboard and are fetched through
 * `src/lib/api.ts`. This file used to build them at module load by parsing
 * three arrays of hand-written strings; that pipeline was replaced during the
 * move to a database, and its output is preserved two ways:
 *
 *   - `backend/seed/projects.json`      — the one-time import into the database
 *   - `src/data/projects.fallback.json` — what the site renders if the backend
 *                                         is unreachable
 *
 * The original parser is in git history if the derivation is ever in question.
 */

/**
 * Category tab order on /projects, and the order /gallery groups sections in.
 *
 * Note this is NOT the order the API returns projects in — see
 * `LEGACY_LIST_ORDER` in the backend's content/models.py for why those differ.
 */
export const CATEGORIES = ["Latest Projects", "Design & PMC", "Turnkey Projects"];

export interface Project {
  /** Stable URL slug, e.g. "latestprojects-0". Frozen once a project exists. */
  id: string;
  title: string;
  location: string;
  /** Floor area / project value, when the client has disclosed one. */
  area: string | null;
  category: string;
  /** Cover photo — the first entry of `allImages`, or null when there are none. */
  image: string | null;
  allImages: string[];
  description: string;
}
