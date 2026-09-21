import type { Metadata } from "next";

import ProcessClient from "./ProcessClient";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "How Admire Architects runs a project — from discovery and design through procurement, execution and handover, with one accountable team throughout.",
  alternates: { canonical: "/process" },
  openGraph: {
    title: "Our Process | Admire Architects",
    description:
      "From discovery and design through procurement, execution and handover, with one accountable team throughout.",
    url: "/process",
  },
};

export default function ProcessPage() {
  return <ProcessClient />;
}
