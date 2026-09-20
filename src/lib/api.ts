/**
 * Data layer for content managed in the Django dashboard.
 *
 * These run on the server only — the API key must never reach a browser.
 *
 * Caching: responses are cached for an hour and tagged, so visitors are served
 * from Vercel's CDN and the PythonAnywhere backend is barely touched. When the
 * client saves in the dashboard, their browser pings /api/revalidate, which
 * drops the tag and makes the change live immediately. The hour is only the
 * worst case if that ping fails.
 */

import type { Project } from "@/data/projects";
import projectsFallback from "@/data/projects.fallback.json";

const BACKEND_URL = process.env.BACKEND_URL ?? "";
const BACKEND_API_KEY = process.env.BACKEND_API_KEY ?? "";

export const PROJECTS_TAG = "projects";
export const JOBS_TAG = "jobs";

const CACHE_SECONDS = 3600;

export interface Job {
  id: string;
  slug: string;
  title: string;
  department: string | null;
  location: string;
  employmentType: string;
  experience: string | null;
  description: string;
  responsibilities: string[];
  requirements: string[];
  postedAt: string | null;
  closesAt: string | null;
}

/**
 * Dropdown and checkbox options for the application form.
 *
 * Defined in the backend (careers/models.py) and sent with the job detail, so
 * adding a software package or project type does not need a frontend change.
 */
export interface ApplicationFieldOptions {
  experience: string[];
  noticePeriod: string[];
  relocation: string[];
  qualification: string[];
  software: string[];
  projectTypes: string[];
}

export interface JobDetail extends Job {
  fieldOptions: ApplicationFieldOptions;
}

/** Used when the backend is unreachable, so the form still renders. */
export const FALLBACK_FIELD_OPTIONS: ApplicationFieldOptions = {
  experience: ["0-1 years", "1-3 years", "3-5 years", "5-8 years", "8-12 years", "12+ years"],
  noticePeriod: ["Immediately available", "15 days", "30 days", "60 days", "90 days"],
  relocation: ["Yes", "No", "Depends on the role"],
  qualification: [
    "B.Arch", "M.Arch", "B.E / B.Tech (Civil)", "M.E / M.Tech",
    "Diploma in Architecture", "Interior Design", "Other",
  ],
  software: [
    "AutoCAD", "Revit", "SketchUp", "3ds Max", "Rhino", "Lumion",
    "Enscape", "V-Ray", "Adobe Creative Suite", "MS Project", "Primavera", "BIM 360",
  ],
  projectTypes: [
    "Corporate Interiors", "Turnkey Fit-outs", "Workplace Design", "Residential",
    "Retail", "Hospitality", "Institutional", "Industrial / Factory", "Data Centres",
  ],
};

async function backendFetch<T>(path: string, tag: string): Promise<T | null> {
  if (!BACKEND_URL || !BACKEND_API_KEY) {
    // Not configured yet (e.g. a fresh clone with no .env.local).
    return null;
  }

  try {
    const response = await fetch(`${BACKEND_URL}${path}`, {
      headers: { "X-Api-Key": BACKEND_API_KEY },
      next: { tags: [tag], revalidate: CACHE_SECONDS },
    });

    if (!response.ok) {
      console.error(`[api] ${path} responded ${response.status}`);
      return null;
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error(`[api] ${path} failed:`, error);
    return null;
  }
}

/**
 * Every project, in the order the site expects.
 *
 * Falls back to a committed snapshot of the original 84 projects if the
 * backend is unreachable. PythonAnywhere's free tier stops serving if nobody
 * signs in for a few months, and a marketing site should not go blank because
 * of that — it degrades to the content it shipped with.
 */
export async function getProjects(): Promise<Project[]> {
  const data = await backendFetch<{ projects: Project[] }>(
    "/api/projects/",
    PROJECTS_TAG,
  );

  if (!data?.projects?.length) {
    return projectsFallback as Project[];
  }

  return data.projects;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  // Served from the already-cached list rather than a second request, which
  // keeps one cache entry to invalidate and one round trip to the backend.
  const projects = await getProjects();
  return projects.find((project) => project.id === slug) ?? null;
}

export async function getJobs(): Promise<Job[]> {
  const data = await backendFetch<{ jobs: Job[] }>("/api/jobs/", JOBS_TAG);
  return data?.jobs ?? [];
}

/**
 * One opening plus the option lists its application form needs.
 *
 * This hits the detail endpoint rather than filtering the cached list, because
 * only the detail response carries `fieldOptions`.
 */
export async function getJobBySlug(slug: string): Promise<JobDetail | null> {
  const job = await backendFetch<JobDetail>(
    `/api/jobs/${encodeURIComponent(slug)}/`,
    JOBS_TAG,
  );

  if (job?.slug) {
    return { ...job, fieldOptions: job.fieldOptions ?? FALLBACK_FIELD_OPTIONS };
  }

  // Backend unreachable: fall back to the cached list so a shared link still
  // renders, with the form's options coming from the local copy.
  const jobs = await getJobs();
  const listed = jobs.find((entry) => entry.slug === slug);
  return listed ? { ...listed, fieldOptions: FALLBACK_FIELD_OPTIONS } : null;
}

export interface ApplicationResult {
  ok: boolean;
  error?: string;
}

/** Forward an application to the backend. Called from a server action. */
export async function submitApplication(
  form: FormData,
): Promise<ApplicationResult> {
  if (!BACKEND_URL || !BACKEND_API_KEY) {
    return { ok: false, error: "Applications are not available right now." };
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/applications/`, {
      method: "POST",
      headers: { "X-Api-Key": BACKEND_API_KEY },
      body: form,
      cache: "no-store",
    });

    if (response.ok) return { ok: true };

    const detail = await response
      .json()
      .then((body) => body?.detail)
      .catch(() => null);

    return { ok: false, error: detail ?? "Something went wrong. Please try again." };
  } catch (error) {
    console.error("[api] application submission failed:", error);
    return { ok: false, error: "Could not reach the server. Please try again." };
  }
}
