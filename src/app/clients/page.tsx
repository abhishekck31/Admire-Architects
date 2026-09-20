import { getProjects } from "@/lib/api";

import ClientsClient from "./ClientsClient";

export default async function ClientsPage() {
  const projects = await getProjects();
  return <ClientsClient projects={projects} />;
}
