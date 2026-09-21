import type { Metadata } from "next";

import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About",
  description:
    "Admire Architects Pvt Ltd — a Bangalore-based practice delivering corporate architecture, interiors and turnkey fit-outs for enterprise clients across India.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | Admire Architects",
    description:
      "A Bangalore-based practice delivering corporate architecture, interiors and turnkey fit-outs for enterprise clients across India.",
    url: "/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
