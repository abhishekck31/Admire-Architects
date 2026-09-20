import { getProjects } from "@/lib/api";

import ProjectsShowcaseClient from "./ProjectsShowcaseClient";

export default async function ProjectsPage() {
  const projects = await getProjects();
  return <ProjectsShowcaseClient projects={projects} />;
}
