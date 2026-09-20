"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { FiArrowRight, FiBriefcase, FiClock, FiMapPin } from "react-icons/fi";

import type { Job } from "@/lib/api";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Departments lead in the same order as the org chart on /process, so someone
 * who has read about the studio meets a familiar structure. A department the
 * dashboard offers that is not listed here still renders, it just sorts last.
 */
const DEPARTMENT_ORDER = ["Project Management", "Architecture Studio", "Administration"];

function groupByDepartment(jobs: Job[]): [string, Job[]][] {
  const groups = new Map<string, Job[]>();

  for (const job of jobs) {
    const key = job.department ?? "Other Openings";
    const existing = groups.get(key);
    if (existing) existing.push(job);
    else groups.set(key, [job]);
  }

  const rank = (name: string) => {
    const index = DEPARTMENT_ORDER.indexOf(name);
    return index === -1 ? DEPARTMENT_ORDER.length : index;
  };

  return Array.from(groups.entries()).sort((a, b) => rank(a[0]) - rank(b[0]));
}

function JobRow({ job, index }: { job: Job; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/careers/${job.slug}`}
        className="group flex flex-col gap-5 border-b border-brand-blue-light/25 py-8 transition-colors hover:border-brand-blue md:flex-row md:items-center md:justify-between md:gap-10"
      >
        <div className="min-w-0">
          <h3 className="text-2xl md:text-3xl font-serif font-light tracking-tight transition-colors group-hover:text-brand-blue">
            {job.title}
          </h3>
          <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <FiMapPin aria-hidden className="text-brand-blue-light" />
              {job.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <FiBriefcase aria-hidden className="text-brand-blue-light" />
              {job.employmentType}
            </span>
            {job.experience && (
              <span className="inline-flex items-center gap-2">
                <FiClock aria-hidden className="text-brand-blue-light" />
                {job.experience}
              </span>
            )}
          </div>
        </div>

        <span className="inline-flex shrink-0 items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-medium text-brand-blue">
          View role
          <FiArrowRight
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </Link>
    </motion.div>
  );
}

function NoOpenings() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="border border-dashed border-brand-blue-light/40 bg-[#f8fafc] px-8 py-20 text-center"
    >
      <h2 className="mb-4 text-2xl md:text-3xl font-serif font-light tracking-tight">
        No open roles at the moment
      </h2>
      <p className="mx-auto mb-10 max-w-lg font-light leading-relaxed text-muted-foreground">
        We are always glad to hear from architects, engineers and project
        managers who want to build with us. Send us your portfolio and we will
        be in touch when something opens up.
      </p>
      <Link
        href="/contact"
        className="inline-block bg-brand-blue px-10 py-5 text-xs uppercase tracking-[0.2em] font-medium text-white transition-colors duration-500 hover:bg-brand-blue-light"
      >
        Introduce Yourself
      </Link>
    </motion.div>
  );
}

export default function CareersClient({ jobs }: { jobs: Job[] }) {
  const departments = groupByDepartment(jobs);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <section className="border-b border-brand-blue-light/20 bg-gradient-to-b from-[#eef4ff] to-[#ffffff] px-6 pt-40 pb-16 md:px-16 md:pt-48 lg:px-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mx-auto max-w-7xl"
        >
          <div className="mb-6 text-[10px] md:text-xs uppercase tracking-[0.4em] text-brand-blue-light font-semibold">
            Careers
          </div>
          <h1 className="mb-8 text-5xl md:text-7xl font-serif font-light tracking-tight">
            Build with <span className="text-brand-blue">Admire</span>
          </h1>
          <p className="max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
            We deliver corporate interiors and turnkey fit-outs for some of the
            country&apos;s most demanding clients. If you care about precision
            and want your work to stand, we would like to meet you.
          </p>
        </motion.div>
      </section>

      <div className="px-6 py-20 md:px-16 md:py-28 lg:px-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-20 md:gap-24">
          {departments.length === 0 && <NoOpenings />}

          {departments.map(([department, departmentJobs]) => (
            <section key={department}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                className="mb-4 flex items-end justify-between gap-4 border-b-2 border-brand-blue-light/30 pb-6"
              >
                <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tight">
                  {department}
                </h2>
                <span className="pb-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {departmentJobs.length}{" "}
                  {departmentJobs.length === 1 ? "role" : "roles"}
                </span>
              </motion.div>

              <div>
                {departmentJobs.map((job, index) => (
                  <JobRow key={job.slug} job={job} index={index} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <section className="border-t border-brand-blue-light/20 bg-gradient-to-b from-[#ffffff] to-[#eef4ff] py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-8 text-4xl md:text-6xl font-serif font-light">
            Not seeing your <span className="text-brand-blue">role?</span>
          </h2>
          <p className="mb-12 text-lg font-light text-muted-foreground">
            Tell us what you do best. We keep good people in mind.
          </p>
          <Link
            href="/contact"
            className="inline-block border border-brand-blue/30 px-10 py-5 text-xs uppercase tracking-[0.2em] font-medium text-brand-blue transition-colors duration-500 hover:bg-brand-blue/10"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
