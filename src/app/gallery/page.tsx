"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { PROJECTS_DATA, type Project } from "@/data/projects";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

interface GallerySection {
  key: string;
  slug: string;
  title: string;
  location: string;
  category: string;
  href: string;
  images: string[];
}

/**
 * A project can appear under more than one category (e.g. Quickplay is both a
 * Turnkey and a Design & PMC entry) — collapse those into a single section so
 * the same photographs are not listed twice.
 */
function buildSections(projects: Project[]): GallerySection[] {
  const sections = new Map<string, GallerySection>();

  for (const project of projects) {
    if (project.allImages.length === 0) continue;

    const key = `${project.title}|${project.location}`.toLowerCase();
    const existing = sections.get(key);

    if (existing) {
      for (const image of project.allImages) {
        if (!existing.images.includes(image)) existing.images.push(image);
      }
      continue;
    }

    sections.set(key, {
      key,
      slug: key.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      title: project.title,
      location: project.location,
      category: project.category,
      href: `/projects/${project.id}`,
      images: [...project.allImages],
    });
  }

  return Array.from(sections.values()).sort((a, b) => a.title.localeCompare(b.title));
}

export default function GalleryPage() {
  const sections = buildSections(PROJECTS_DATA);
  const totalImages = sections.reduce((sum, section) => sum + section.images.length, 0);

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#000000] font-sans">
      {/* Header */}
      <section className="pt-40 md:pt-48 pb-16 px-6 md:px-16 lg:px-24 bg-gradient-to-b from-[#eef4ff] to-[#ffffff] border-b border-brand-blue-light/20">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-7xl mx-auto">
          <div className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-brand-blue-light font-semibold mb-6">
            Photography
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-light tracking-tight mb-8">
            Project <span className="text-brand-blue">Gallery</span>
          </h1>
          <p className="text-lg text-gray-700 font-light max-w-2xl leading-relaxed">
            {totalImages} images across {sections.length} delivered projects — corporate interiors, workplaces and
            turnkey fit-outs built by Admire Architects.
          </p>
        </motion.div>
      </section>

      {/* One section per project */}
      <div className="px-6 md:px-16 lg:px-24 py-20 md:py-28">
        <div className="max-w-7xl mx-auto flex flex-col gap-24 md:gap-32">
          {sections.map((section) => (
            <section key={section.key} id={section.slug}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-brand-blue-light/30 pb-6"
              >
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-brand-blue-light font-semibold mb-3">
                    {section.category}
                  </div>
                  <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tight">
                    {section.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-2 uppercase tracking-[0.2em]">{section.location}</p>
                </div>
                <Link
                  href={section.href}
                  className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-medium text-brand-blue hover:text-brand-blue-light transition-colors cursor-pointer"
                >
                  View project
                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {section.images.map((image, index) => (
                  <motion.div
                    key={image}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-black/5 bg-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-500 group"
                  >
                    <Image
                      src={image}
                      alt={`${section.title}, ${section.location} — image ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={90}
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-brand-blue/0 group-hover:bg-brand-blue/10 transition-colors duration-500" />
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-[#ffffff] to-[#eef4ff] border-t border-brand-blue-light/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-serif font-light mb-8">
            Looking for something <span className="text-brand-blue">specific?</span>
          </h2>
          <p className="text-lg text-gray-700 font-light mb-12">
            Browse the full project index or talk to us about your requirement.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/projects"
              className="w-full sm:w-auto px-10 py-5 bg-brand-blue text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-brand-blue-light transition-colors duration-500 cursor-pointer"
            >
              All Projects
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-10 py-5 border border-brand-blue/30 text-brand-blue text-xs uppercase tracking-[0.2em] font-medium hover:bg-brand-blue/10 transition-colors duration-500 cursor-pointer"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
