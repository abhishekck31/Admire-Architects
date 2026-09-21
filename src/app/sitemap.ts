import type { MetadataRoute } from "next";

import { SERVICES } from "@/data/services";
import { getJobs, getProjects } from "@/lib/api";
import { SITE_URL } from "@/lib/site";

/**
 * The sitemap is generated, not hand-maintained, so a project added in the
 * dashboard appears in it without a code change.
 *
 * It is revalidated on the same schedule as the content it lists. If the
 * backend is unreachable, `getProjects` falls back to the committed snapshot,
 * so this still emits a complete sitemap rather than an empty one.
 */
export const revalidate = 3600;

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/about", changeFrequency: "yearly", priority: 0.7 },
  { path: "/services", changeFrequency: "yearly", priority: 0.9 },
  { path: "/projects", changeFrequency: "weekly", priority: 0.9 },
  { path: "/gallery", changeFrequency: "weekly", priority: 0.8 },
  { path: "/clients", changeFrequency: "monthly", priority: 0.6 },
  { path: "/process", changeFrequency: "yearly", priority: 0.6 },
  { path: "/careers", changeFrequency: "weekly", priority: 0.8 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, jobs] = await Promise.all([getProjects(), getJobs()]);
  const now = new Date();

  return [
    ...STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),

    ...SERVICES.map((service) => ({
      url: `${SITE_URL}/services/${service.id}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),

    ...projects.map((project) => ({
      url: `${SITE_URL}/projects/${project.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),

    ...jobs.map((job) => ({
      // An opening's own dates are the honest lastModified here: a listing
      // that has not changed should not keep telling crawlers it has.
      url: `${SITE_URL}/careers/${job.slug}`,
      lastModified: job.postedAt ? new Date(job.postedAt) : now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
