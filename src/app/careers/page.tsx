import type { Metadata } from "next";

import { getJobs } from "@/lib/api";

import CareersClient from "./CareersClient";

export const metadata: Metadata = {
  title: "Careers | ADMIRE ARCHITECTS PVT LTD",
  description:
    "Open roles at Admire Architects — architecture, project management and studio operations across Bangalore, Chennai and Hyderabad.",
};

export default async function CareersPage() {
  const jobs = await getJobs();
  return <CareersClient jobs={jobs} />;
}
