"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

import { use } from "react";

const fadeUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

export default function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  // Format slug to title (e.g., project-management -> Project Management)
  const title = resolvedParams.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      
      {/* Structural Hero */}
      <section className="relative pt-48 pb-32 px-6 md:px-16 lg:px-24 overflow-hidden border-b border-border bg-card">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="md:w-2/3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-accent mb-6">Expertise Core</div>
            <h1 className="text-6xl md:text-[7rem] font-serif font-light leading-[1] tracking-tighter mb-8">
              {title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl leading-relaxed">
              Engineering solutions that transcend aesthetic boundaries. We design the frameworks that empower global enterprises.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="hidden md:block relative w-1/3 h-[40vh]"
          >
             {/* A subtle, architectural structural image */}
             <Image src="/hero_arch_1779118409602.png" alt="Architecture" fill className="object-cover grayscale" priority />
          </motion.div>
        </div>
      </section>

      {/* Enterprise Use Cases & Impact */}
      <section className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight">Enterprise Application</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Global Headquarters",
                desc: "Scaling corporate identity into massive physical footprints with uncompromising structural integrity."
              },
              {
                title: "R&D Campuses",
                desc: "Optimizing environments for maximum intellectual output through precision environmental controls."
              },
              {
                title: "Luxury Commercial Space",
                desc: "Attracting high-net-worth engagement via unparalleled material curation and spatial design."
              }
            ].map((useCase, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="p-10 border border-border bg-card group hover:border-primary transition-colors duration-500"
              >
                <h3 className="text-2xl font-serif font-light mb-4 text-foreground">{useCase.title}</h3>
                <p className="text-muted-foreground font-light leading-relaxed">{useCase.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Methodology / Process */}
      <section className="py-32 bg-[#ffffff] text-[#000000]">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-24">
            <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight text-black mb-6">Execution Methodology</h2>
            <p className="text-gray-600 max-w-2xl font-light text-lg">A systematic, risk-mitigated approach to bringing massive structures from concept to physical reality.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
            <div className="relative h-[60vh] bg-secondary hidden md:block">
              <Image src="/project_1_1779118457708.png" alt="Methodology" fill className="object-cover opacity-60" />
            </div>

            <div className="flex flex-col justify-center space-y-12">
              {[
                { phase: "Phase 1", title: "Discovery & Alignment", desc: "Deep integration with enterprise stakeholders to align architectural vision with corporate objectives." },
                { phase: "Phase 2", title: "Parametric Design", desc: "Leveraging advanced computational design to generate highly optimized, structurally sound geometries." },
                { phase: "Phase 3", title: "Material Sourcing", desc: "Procuring globally rare, highly durable materials that meet our exact specifications." },
                { phase: "Phase 4", title: "Precision Delivery", desc: "Orchestrating hundreds of contractors to ensure the physical build mirrors the digital twin flawlessly." }
              ].map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="group"
                >
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#60A5FA] mb-2">{step.phase}</div>
                  <h4 className="text-2xl font-serif font-light mb-3 text-black">{step.title}</h4>
                  <p className="text-gray-600 font-light">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-32 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left">
             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className="text-5xl md:text-7xl font-serif font-light text-primary mb-4">4M+</div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Sq Ft Developed</div>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className="text-5xl md:text-7xl font-serif font-light text-primary mb-4">100%</div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">LEED Compliance</div>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className="text-5xl md:text-7xl font-serif font-light text-primary mb-4">0.1%</div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Variance to Budget</div>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className="text-5xl md:text-7xl font-serif font-light text-primary mb-4">Top 5</div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Global Firm Ranking</div>
              </motion.div>
          </div>
        </div>
      </section>

      {/* Service CTA */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-5xl md:text-6xl font-serif font-light mb-10 text-primary">Engage Our Team</h2>
            <Link href="/contact" className="inline-flex items-center gap-4 text-sm uppercase tracking-[0.2em] bg-foreground text-background px-10 py-5 hover:bg-muted hover:text-foreground transition-colors duration-500">
              Start The Process <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
