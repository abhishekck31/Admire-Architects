import type { Metadata } from "next";

import { getJobs } from "@/lib/api";

import CareersClient from "./CareersClient";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Open roles at Admire Architects — architecture, project management and studio operations across Bangalore, Chennai and Hyderabad.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers | Admire Architects",
    description:
      "Open roles at Admire Architects — architecture, project management and studio operations.",
    url: "/careers",
  },
};

export default async function CareersPage() {
  const jobs = await getJobs();
  return <CareersClient jobs={jobs} />;
}
