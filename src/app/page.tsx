import { getProjects } from "@/lib/api";

import HomeClient from "./HomeClient";

export default async function Home() {
  const projects = await getProjects();
  return <HomeClient projects={projects} />;
}
