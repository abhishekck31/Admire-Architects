import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProjectBySlug, getProjects } from "@/lib/api";

import ProjectCaseStudyClient from "./ProjectCaseStudyClient";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title}, ${project.location}`,
    description: project.description,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      title: `${project.title}, ${project.location} | Admire Architects`,
      description: project.description,
      url: `/projects/${project.id}`,
      images: project.image ? [{ url: project.image }] : undefined,
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  // A real 404 rather than a 200 with "not found" text, so an unpublished or
  // renamed project stops being indexed.
  if (!project) notFound();

  return <ProjectCaseStudyClient project={project} />;
}
