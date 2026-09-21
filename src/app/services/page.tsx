import type { Metadata } from "next";

import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Architecture, interior design, project management, design-build and turnkey delivery for corporate and enterprise clients.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | Admire Architects",
    description:
      "Architecture, interior design, project management, design-build and turnkey delivery for corporate and enterprise clients.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
