import type { Metadata } from "next";

import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with Admire Architects. Reach the studio on palani.m@admiregrp.in or 9448370989 to discuss a commercial, workplace or turnkey project.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Admire Architects",
    description:
      "Start a conversation with Admire Architects about your commercial, workplace or turnkey project.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
