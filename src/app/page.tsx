"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence, Variants } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { FiArrowRight, FiMenu } from "react-icons/fi";
import Hero from "@/components/Hero";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden font-sans">
      


      <Hero />

      {/* Statistics Section */}
      <section className="py-24 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left"
          >
            {[
              { number: "25+", label: "Years of Excellence" },
              { number: "150+", label: "Global HQ Built" },
              { number: "12", label: "Industry Awards" },
              { number: "4", label: "Continents Reached" }
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeUp}>
                <div className="text-5xl md:text-6xl font-serif font-light text-primary mb-4">{stat.number}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enterprise Clients Showcase */}
      <section className="py-32 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 mb-16">
          <motion.h3 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-xs uppercase tracking-[0.2em] text-muted-foreground text-center md:text-left mb-12"
          >
            Trusted by Industry Leaders
          </motion.h3>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-wrap justify-center md:justify-between items-center gap-12 md:gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
          >
            {/* Cinematic text representing client logos for elegance */}
            {["AERO SPACE", "SYNTHESIS GLOBAL", "NEXUS FINANCE", "OMNI CORP", "VERTEX AI"].map((client, i) => (
              <motion.div key={i} variants={fadeUp} className="text-xl md:text-2xl font-serif tracking-wider font-medium text-foreground">
                {client}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Philosophy Intro */}
      <section className="py-40 bg-card">
        <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 text-center">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-light leading-[1.2] tracking-tight mb-12 text-primary"
          >
            "Architecture is the physical manifestation of corporate ambition. We strip away the non-essential to reveal the profound."
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <Link href="/studio/about" className="text-xs uppercase tracking-[0.2em] border-b border-primary pb-2 hover:text-muted-foreground hover:border-muted-foreground transition-colors duration-500">
              Read Our Manifesto
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-40 bg-background">
        <div className="px-6 md:px-16 lg:px-24 mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-5xl md:text-7xl font-serif font-light tracking-tight">Selected Works</h2>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <Link href="/projects" className="uppercase tracking-[0.2em] text-xs border-b border-foreground pb-2 hover:text-muted-foreground hover:border-muted-foreground transition-colors duration-500">
              View Complete Portfolio
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32 px-6 md:px-16 lg:px-24">
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="group cursor-pointer"
          >
            <div className="relative h-[80vh] w-full overflow-hidden mb-8 bg-secondary">
              <Image
                src="/project_1_1779118457708.png"
                alt="The Zenith Tower"
                fill
                className="object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-3xl font-serif font-light mb-3">The Zenith Corporate HQ</h3>
                <p className="text-muted-foreground uppercase tracking-[0.2em] text-xs">Frankfurt, Germany / 2025</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="group cursor-pointer md:mt-48"
          >
            <div className="relative h-[80vh] w-full overflow-hidden mb-8 bg-secondary">
              <Image
                src="/project_2_1779118501379.png"
                alt="Aura Residences"
                fill
                className="object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-3xl font-serif font-light mb-3">Omni Global Campus</h3>
                <p className="text-muted-foreground uppercase tracking-[0.2em] text-xs">Tokyo, Japan / 2024</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services / Expertise */}
      <section className="py-40 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-24"
          >
            <h2 className="text-5xl md:text-7xl font-serif font-light tracking-tight">Our Expertise</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 border-t border-border pt-16">
            {[
              {
                title: "Master Planning",
                desc: "Strategic urban and corporate campus planning that integrates seamlessly with surrounding environments."
              },
              {
                title: "Commercial Architecture",
                desc: "Iconic corporate headquarters engineered for sustainability, scalability, and profound visual impact."
              },
              {
                title: "Interior Architecture",
                desc: "Precision-crafted internal spaces that enhance enterprise productivity while exuding quiet luxury."
              }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">0{i + 1}</div>
                <h3 className="text-3xl font-serif font-light mb-6 group-hover:text-accent transition-colors duration-500">{service.title}</h3>
                <p className="text-muted-foreground font-light leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-40 bg-background overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="text-5xl md:text-7xl font-serif font-light tracking-tight mb-12">The Methodology</h2>
              <p className="text-xl text-muted-foreground font-light leading-relaxed mb-12 max-w-lg">
                We approach every project as a structural puzzle. From the initial conceptual sketches to the final steel beam, our process is defined by absolute precision.
              </p>
              <Link href="/expertise/process" className="inline-flex items-center gap-4 text-xs uppercase tracking-[0.2em] border-b border-primary pb-2 hover:text-muted-foreground hover:border-muted-foreground transition-colors duration-500">
                Explore The Process <FiArrowRight />
              </Link>
            </motion.div>

            <div className="space-y-16">
              {[
                { step: "01", title: "Site & Scale Analysis", text: "Evaluating environmental impact, spatial flow, and enterprise requirements." },
                { step: "02", title: "Conceptual Geometry", text: "Translating corporate vision into foundational architectural forms." },
                { step: "03", title: "Parametric Engineering", text: "Validating structural integrity through advanced BIM and digital twins." },
                { step: "04", title: "Execution & Delivery", text: "Orchestrating global contractors to ensure flawless material execution." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="border-l border-border pl-8 relative"
                >
                  <div className="absolute top-0 -left-[1px] w-[2px] h-0 bg-primary group-hover:h-full transition-all duration-1000" />
                  <div className="text-xs uppercase tracking-[0.2em] text-accent mb-3">{item.step}</div>
                  <h4 className="text-2xl font-serif font-light mb-3">{item.title}</h4>
                  <p className="text-muted-foreground font-light">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-40 bg-card border-y border-border flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="mb-12 text-accent">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="mx-auto opacity-50">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <p className="text-2xl md:text-5xl font-serif font-light leading-[1.3] mb-12">
              "Admire Architects didn't just design our global headquarters; they physically manifested our enterprise's identity into steel and glass. Absolute visionaries."
            </p>
            <div className="text-xs uppercase tracking-[0.2em]">
              <strong className="font-medium text-foreground block mb-1">Elias Vance</strong>
              <span className="text-muted-foreground">CEO, Synthesis Global</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-48 bg-[#070B11] text-[#FAFAF9] text-center px-6 relative overflow-hidden">
        {/* Faint architectural grid background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#FAFAF9 1px, transparent 1px), linear-gradient(90deg, #FAFAF9 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto relative z-10"
        >
          <motion.h2 variants={fadeUp} className="text-5xl md:text-[6rem] font-serif font-light mb-12 leading-[1.1]">
            Ready to build <br /> <span className="italic text-[#B89B72]">your legacy?</span>
          </motion.h2>
          <motion.div variants={fadeUp}>
            <Link href="/contact" className="inline-block border-b border-white/30 pb-4 text-sm md:text-xl uppercase tracking-[0.2em] hover:text-[#B89B72] hover:border-[#B89B72] transition-colors duration-500">
              Start a Conversation
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/10 bg-[#070B11] text-[#FAFAF9] px-6 md:px-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
          &copy; {new Date().getFullYear()} Admire Architects Pvt Ltd. All rights reserved.
        </div>
        <div className="flex gap-10 text-[10px] uppercase tracking-[0.2em] text-gray-500">
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">Behance</a>
        </div>
      </footer>
    </div>
  );
}
