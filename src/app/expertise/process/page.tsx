"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

const STAGES = [
  {
    num: "01",
    title: "Discovery",
    subtitle: "Enterprise Alignment",
    desc: "We integrate deeply with stakeholders to define the corporate vision, spatial requirements, and absolute project constraints before drawing a single line.",
    metrics: ["100% Alignment", "Risk Assessment", "Feasibility Matrix"]
  },
  {
    num: "02",
    title: "Analysis",
    subtitle: "Site & Scale Geometry",
    desc: "Rigorous evaluation of environmental impact, topography, and solar radiation to ensure the structure operates optimally within its physical context.",
    metrics: ["Geotechnical Survey", "Solar Modeling", "Zoning Clearance"]
  },
  {
    num: "03",
    title: "Development",
    subtitle: "Parametric Engineering",
    desc: "Translating data into form. We leverage advanced computational design to generate structural geometries that are physically profound and mathematically sound.",
    metrics: ["BIM Integration", "Structural Twin", "Material Selection"]
  },
  {
    num: "04",
    title: "Documentation",
    subtitle: "Absolute Precision",
    desc: "Producing thousands of pages of zero-tolerance blueprints, ensuring global contractors have an exact, unambiguous roadmap for execution.",
    metrics: ["0% Tolerance", "Vendor Specs", "Safety Protocols"]
  },
  {
    num: "05",
    title: "Construction",
    subtitle: "Flawless Execution",
    desc: "Orchestrating global supply chains and massive labor forces, we oversee the physical manifestation of the digital twin with militant oversight.",
    metrics: ["Quality Control", "Budget Tracking", "LTI Zero"]
  },
  {
    num: "06",
    title: "Handover",
    subtitle: "Legacy Delivery",
    desc: "The final transfer of physical and digital assets. The enterprise assumes control of a structure engineered to define their legacy for the next century.",
    metrics: ["Lifecycle Manuals", "LEED Cert", "Client Sign-off"]
  }
];

export default function ProcessPage() {
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: horizontalScrollRef });
  
  // Shift the timeline left as the user scrolls down (Desktop only)
  const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  return (
    <div className="relative bg-background text-foreground overflow-hidden font-sans pb-32">
      
      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6 md:px-16 lg:px-24 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="text-[10px] uppercase tracking-[0.3em] text-accent mb-6">Execution Excellence</div>
            <h1 className="text-5xl md:text-[7rem] font-serif font-light text-foreground tracking-tighter leading-[1] mb-10">
              The Engine of <br/> <span className="text-muted-foreground italic">Precision.</span>
            </h1>
            <p className="text-xl md:text-3xl text-muted-foreground font-light max-w-3xl leading-relaxed">
              We do not leave massive enterprise structures to chance. Our execution methodology is a highly calibrated, zero-tolerance framework.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Desktop Horizontal Scroll Timeline */}
      <div className="hidden md:block">
        <section ref={horizontalScrollRef} className="relative h-[400vh] bg-background">
          <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            
            <motion.div style={{ x: xTransform }} className="flex gap-16 px-24 pt-20">
              {STAGES.map((stage, i) => (
                <div key={i} className="w-[600px] flex-shrink-0 relative group">
                  
                  {/* Background architectural grid line */}
                  <div className="absolute top-8 left-0 w-full h-[1px] bg-border z-0" />
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-full border border-border bg-card flex items-center justify-center text-xl font-serif text-accent mb-16 group-hover:bg-foreground group-hover:text-background transition-colors duration-500">
                      {stage.num}
                    </div>
                    
                    <div className="p-12 border border-border bg-card hover:border-primary transition-all duration-700 h-[500px] flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">{stage.subtitle}</div>
                        <h3 className="text-4xl font-serif font-light mb-8">{stage.title}</h3>
                        <p className="text-muted-foreground font-light leading-relaxed mb-10">
                          {stage.desc}
                        </p>
                      </div>
                      
                      <div className="space-y-4 border-t border-border pt-8">
                        {stage.metrics.map((metric, idx) => (
                          <div key={idx} className="flex items-center gap-4">
                            <FiCheckCircle className="text-accent opacity-70" />
                            <span className="text-sm font-medium tracking-wide uppercase">{metric}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

          </div>
        </section>
      </div>

      {/* Mobile Vertical Timeline */}
      <div className="md:hidden py-32 px-6">
        <div className="space-y-24 border-l border-border pl-8 relative">
          {STAGES.map((stage, i) => (
            <motion.div 
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="relative"
            >
              <div className="absolute w-4 h-4 rounded-full bg-background border border-primary -left-[41px] top-2" />
              <div className="text-3xl font-serif text-accent mb-2">{stage.num}</div>
              <h3 className="text-3xl font-serif font-light mb-4">{stage.title}</h3>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-6">{stage.subtitle}</div>
              <p className="text-muted-foreground font-light leading-relaxed mb-8">
                {stage.desc}
              </p>
              <div className="space-y-3">
                {stage.metrics.map((metric, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <FiCheckCircle className="text-accent opacity-70" />
                    <span className="text-xs font-medium tracking-wide uppercase">{metric}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Technology & Workflow Visualization */}
      <section className="py-40 bg-[#070b11] text-[#fafaf9] border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-4xl md:text-6xl font-serif font-light mb-8">Digital Twin Integration</h2>
            <p className="text-gray-400 font-light leading-relaxed text-lg mb-12">
              Our process relies on a unified Building Information Model (BIM). Every phase of the lifecycle—from Discovery to Handover—feeds into a singular, hyper-accurate digital twin of the enterprise structure. 
            </p>
            <div className="flex flex-col gap-6">
              {[
                "Clash Detection & Resolution prior to pouring concrete.",
                "Real-time global procurement tracking.",
                "Lifecycle maintenance data mapped directly to physical assets."
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-1 h-full bg-[#b89b72] mt-2" />
                  <p className="font-light text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[60vh] bg-secondary border border-white/10 p-8"
          >
             {/* Architectural Diagram representation */}
             <Image src="/hero_arch_1779118409602.png" alt="Workflow Visual" fill className="object-cover opacity-50 grayscale" />
             
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="grid grid-cols-2 gap-4 w-full h-full p-8 opacity-40">
                  <div className="border border-white/20 animate-pulse delay-75" />
                  <div className="border border-white/20 animate-pulse delay-150" />
                  <div className="border border-white/20 animate-pulse delay-300" />
                  <div className="border border-white/20 animate-pulse delay-500" />
                </div>
             </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
