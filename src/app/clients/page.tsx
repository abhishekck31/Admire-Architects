import type { Metadata } from "next";

import { getProjects } from "@/lib/api";

import ClientsClient from "./ClientsClient";

export const metadata: Metadata = {
  title: "Clients",
  description:
    "The organisations Admire Architects has delivered for, from global technology firms to Indian enterprises.",
  alternates: { canonical: "/clients" },
  openGraph: {
    title: "Clients | Admire Architects",
    description:
      "The organisations Admire Architects has delivered for, from global technology firms to Indian enterprises.",
    url: "/clients",
  },
};

export default async function ClientsPage() {
  const projects = await getProjects();
  return <ClientsClient projects={projects} />;
}
