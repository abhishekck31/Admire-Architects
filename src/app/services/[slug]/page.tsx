import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SERVICES, getServiceBySlug } from "@/data/services";

import ServiceDetailClient from "./ServiceDetailClient";

type Params = { params: Promise<{ slug: string }> };

/**
 * The five services are the only valid slugs. With `dynamicParams` off, any
 * other URL 404s instead of rendering a page whose heading is read straight
 * out of the address bar.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) return { title: "Service Not Found" };

  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: `/services/${service.id}` },
    openGraph: {
      title: `${service.title} | Admire Architects`,
      description: service.description,
      url: `/services/${service.id}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  return <ServiceDetailClient service={service} />;
}
