"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { FiArrowLeft, FiBriefcase, FiClock, FiMapPin } from "react-icons/fi";

import type { JobDetail } from "@/lib/api";

import ApplyForm from "./ApplyForm";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
};

function BulletList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUp}
    >
      <h2 className="mb-6 border-l-2 border-brand-blue-light pl-6 text-2xl md:text-3xl font-serif font-light tracking-tight">
        {title}
      </h2>
      <ul className="flex flex-col gap-4 pl-6">
        {items.map((item) => (
          <li key={item} className="flex gap-4 font-light leading-relaxed text-muted-foreground">
            <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 bg-brand-blue-light" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.section>
  );
}

export default function JobDetailClient({ job }: { job: JobDetail }) {
  const meta = [
    { label: "Location", value: job.location, icon: FiMapPin },
    { label: "Type", value: job.employmentType, icon: FiBriefcase },
    { label: "Experience", value: job.experience, icon: FiClock },
  ].filter((entry) => entry.value);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <div className="fixed left-6 top-24 z-50 md:left-12">
        <Link
          href="/careers"
          className="flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-5 py-3 text-[11px] uppercase tracking-[0.2em] font-medium text-black shadow-sm backdrop-blur-md transition-colors hover:text-brand-blue"
        >
          <FiArrowLeft aria-hidden /> All Openings
        </Link>
      </div>

      <section className="border-b border-brand-blue-light/20 bg-gradient-to-b from-[#eef4ff] to-[#ffffff] px-6 pt-40 pb-16 md:px-16 md:pt-48 lg:px-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mx-auto max-w-5xl"
        >
          {job.department && (
            <div className="mb-6 text-[11px] uppercase tracking-[0.4em] text-brand-blue-light font-semibold">
              {job.department}
            </div>
          )}
          <h1 className="text-4xl md:text-6xl font-serif font-light tracking-tight">
            {job.title}
          </h1>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {meta.map(({ label, value, icon: Icon }) => (
              <div key={label} className="border-l border-brand-blue-light/40 pl-5">
                <div className="mb-2 flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-muted-foreground">
                  <Icon aria-hidden className="text-brand-blue-light" />
                  {label}
                </div>
                <div className="text-lg font-serif">{value}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <div className="px-6 py-20 md:px-16 md:py-24 lg:px-24">
        <div className="mx-auto flex max-w-5xl flex-col gap-16">
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
          >
            <h2 className="mb-6 border-l-2 border-brand-blue-light pl-6 text-2xl md:text-3xl font-serif font-light tracking-tight">
              About the role
            </h2>
            <div className="flex flex-col gap-5 pl-6">
              {job.description.split("\n").filter(Boolean).map((paragraph) => (
                <p key={paragraph} className="font-light leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.section>

          <BulletList title="What you will do" items={job.responsibilities} />
          <BulletList title="What we are looking for" items={job.requirements} />

          <motion.section
            id="apply"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="border-t-2 border-brand-blue-light/30 pt-16"
          >
            <div className="mb-3 text-[13px] uppercase tracking-[0.3em] text-brand-blue-light font-semibold">
              Apply
            </div>
            <h2 className="mb-10 text-3xl md:text-4xl font-serif font-light tracking-tight">
              Tell us about yourself
            </h2>
            <ApplyForm
              jobSlug={job.slug}
              jobTitle={job.title}
              options={job.fieldOptions}
            />
          </motion.section>
        </div>
      </div>
    </div>
  );
}
