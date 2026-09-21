import type { Metadata } from "next";

import { getProjects } from "@/lib/api";

import ProjectsShowcaseClient from "./ProjectsShowcaseClient";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Completed architecture, interior and turnkey projects by Admire Architects — browse by Latest, Design & PMC and Turnkey.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects | Admire Architects",
    description:
      "Completed architecture, interior and turnkey projects by Admire Architects — browse by Latest, Design & PMC and Turnkey.",
    url: "/projects",
  },
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  return <ProjectsShowcaseClient projects={projects} />;
}
