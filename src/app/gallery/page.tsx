import type { Metadata } from "next";

import { getProjects } from "@/lib/api";

import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photography from completed Admire Architects projects — corporate interiors, turnkey fit-outs and workplace design across India.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery | Admire Architects",
    description:
      "Photography from completed Admire Architects projects — corporate interiors, turnkey fit-outs and workplace design across India.",
    url: "/gallery",
  },
};

export default async function GalleryPage() {
  const projects = await getProjects();
  return <GalleryClient projects={projects} />;
}
