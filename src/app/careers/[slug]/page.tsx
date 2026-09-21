import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getJobBySlug } from "@/lib/api";

import JobDetailClient from "./JobDetailClient";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job) return { title: "Opening Not Found" };

  return {
    title: `${job.title}, ${job.location} — Careers`,
    description: job.description.slice(0, 160),
    alternates: { canonical: `/careers/${job.slug}` },
    openGraph: {
      title: `${job.title}, ${job.location} | Careers at Admire Architects`,
      description: job.description.slice(0, 160),
      url: `/careers/${job.slug}`,
    },
  };
}

export default async function JobDetailPage({ params }: Params) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  // Closed and draft openings are absent from the API, so this also covers a
  // stale link from a job board after the role is filled.
  if (!job) notFound();

  return <JobDetailClient job={job} />;
}
