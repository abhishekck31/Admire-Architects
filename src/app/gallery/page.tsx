import { getProjects } from "@/lib/api";

import GalleryClient from "./GalleryClient";

export default async function GalleryPage() {
  const projects = await getProjects();
  return <GalleryClient projects={projects} />;
}
