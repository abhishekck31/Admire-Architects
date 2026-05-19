"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { FiArrowRight, FiCheckCircle, FiChevronRight, FiUsers, FiBox, FiTrendingUp, FiLayers, FiBriefcase } from "react-icons/fi";

const fadeUp: any = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

const PROJECT_CYCLE = [
  { id: "01", title: "Client Requirement", desc: "Understanding the enterprise vision, operational necessities, and precise project goals." },
  { id: "02", title: "Site Survey", desc: "Comprehensive geographical, topographical, and environmental analysis to ensure spatial viability." },
  { id: "03", title: "Concept & Design Development", desc: "Translating data into structural geometries, aesthetic concepts, and functional layouts." },
  { id: "04", title: "Documentation", desc: "Producing zero-tolerance blueprints, schedules, and technical specifications for flawless execution." },
  { id: "05", title: "Execution & Handover", desc: "Militant oversight of the physical manifestation, leading to the final delivery of the asset." },
];

const FLOW_STEPS = [
  "Initial Client Brief", "Site Survey", "Conceptualizing", "Sketching", "Design Development", "Technical Documentation", "Construction & Inspection"
];

const ADMIRE_PROCESS = [
  { num: "01", title: "Discovery", metrics: ["Requirements", "Constraints", "Deadlines"], icon: <FiBox /> },
  { num: "02", title: "Analysis", metrics: ["Test Fits", "Site Conditions", "Adjacencies", "Budgets"], icon: <FiTrendingUp /> },
  { num: "03", title: "Development", metrics: ["Layouts", "Look & Feel", "Materials", "Specifications"], icon: <FiLayers /> },
  { num: "04", title: "Construction Documentation", metrics: ["Drawings", "Schedules", "Bid Packages", "Shop Drawings"], icon: <FiBriefcase /> },
  { num: "05", title: "Construction", metrics: ["Work Schedules", "Cost Control", "Quality Check"], icon: <FiCheckCircle /> },
  { num: "06", title: "Closeout", metrics: ["As Built Documentation", "Financial Closeout"], icon: <FiArrowRight /> }
];

const ORG_CHART = {
  head: "Managing Director / Chief",
  departments: [
    { name: "Project Management", roles: ["Project Managers", "Project Engineers", "Site Engineer", "Quantity Surveyor"] },
    { name: "Architecture Studio", roles: ["Principal Architect", "Senior Architects", "Draftsman"] },
    { name: "Administration", roles: ["Accounts", "Procurement", "Admin", "Admin Assistant"] }
  ]
};

export default function ProcessPage() {
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: horizontalScrollRef });
  
  // Shift the timeline left as the user scrolls down (Desktop only)
  const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  const [activeCycle, setActiveCycle] = useState(0);
  const [hoveredOrgDept, setHoveredOrgDept] = useState<number | null>(null);

  return (
    <div className="relative bg-[#070b11] text-[#fafaf9] overflow-hidden font-sans pb-32">
      
      {/* Background Architectural Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#FAFAF9 1px, transparent 1px), linear-gradient(90deg, #FAFAF9 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6 md:px-16 lg:px-24 border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto text-center md:text-left">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#b89b72] mb-6">Execution Excellence</div>
            <h1 className="text-5xl md:text-[7rem] font-serif font-light text-white tracking-tighter leading-[1] mb-10">
              The Engine of <br className="hidden md:block" /> <span className="text-gray-500 italic">Precision.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl leading-relaxed mx-auto md:mx-0">
              We do not leave massive enterprise structures to chance. Our execution methodology is a highly calibrated, zero-tolerance framework.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 1 — PROJECT CYCLE */}
      <section className="py-40 relative z-10 bg-[#0a0f16] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-24">
            <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight mb-4">Project Cycle</h2>
            <p className="text-gray-400 font-light text-lg max-w-2xl">The fundamental lifecycle of our enterprise projects.</p>
          </motion.div>

          {/* Interactive Cycle Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-32">
            {PROJECT_CYCLE.map((stage, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                onMouseEnter={() => setActiveCycle(i)}
                className={`relative p-8 border transition-all duration-700 cursor-pointer overflow-hidden ${
                  activeCycle === i 
                    ? "bg-white/5 border-[#b89b72]/50 scale-[1.02] shadow-2xl" 
                    : "bg-transparent border-white/10 hover:border-white/30"
                }`}
              >
                {/* Motion Line */}
                <div className={`absolute top-0 left-0 h-1 transition-all duration-700 ${activeCycle === i ? "w-full bg-[#b89b72]" : "w-0 bg-transparent"}`} />
                
                <div className={`text-4xl font-serif mb-6 transition-colors duration-500 ${activeCycle === i ? "text-[#b89b72]" : "text-gray-700"}`}>
                  {stage.id}
                </div>
                <h3 className={`text-xl font-serif font-light mb-4 transition-colors duration-500 ${activeCycle === i ? "text-white" : "text-gray-400"}`}>
                  {stage.title}
                </h3>
                
                <AnimatePresence>
                  {activeCycle === i && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-sm font-light text-gray-400 leading-relaxed"
                    >
                      {stage.desc}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Process Flow Timeline (Horizontal Flow) */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="pt-16 border-t border-white/10 overflow-x-auto pb-8 hide-scrollbar"
          >
            <div className="flex items-center min-w-max gap-8 px-4">
              {FLOW_STEPS.map((step, idx) => (
                <div key={idx} className="flex items-center gap-8 group">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-4 h-4 rounded-full border-2 border-white/20 bg-[#070b11] group-hover:border-[#b89b72] group-hover:bg-[#b89b72]/20 transition-all duration-500" />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-gray-500 group-hover:text-white transition-colors duration-500 text-center w-32">
                      {step}
                    </span>
                  </div>
                  {idx < FLOW_STEPS.length - 1 && (
                    <div className="w-16 md:w-32 h-[1px] bg-gradient-to-r from-white/10 via-white/30 to-white/10 relative">
                      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-2 h-2 border-t border-r border-white/30 transform rotate-45" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — ADMIRE PROJECT PROCESS (Horizontal Scroll) */}
      <div className="hidden md:block relative z-10">
        <section ref={horizontalScrollRef} className="relative h-[400vh] bg-[#070b11]">
          <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            
            <div className="absolute top-32 left-24 z-20">
              <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight mb-2">Admire Process</h2>
              <p className="text-gray-500 font-light uppercase tracking-[0.2em] text-[10px]">Interactive Workflow</p>
            </div>

            <motion.div style={{ x: xTransform }} className="flex gap-16 px-24 pt-20">
              {ADMIRE_PROCESS.map((stage, i) => (
                <div key={i} className="w-[500px] flex-shrink-0 relative group">
                  
                  {/* Background architectural grid line */}
                  <div className="absolute top-8 left-0 w-full h-[1px] bg-white/10 z-0" />
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-full border border-white/20 bg-[#0a0f16] flex items-center justify-center text-xl font-serif text-[#b89b72] mb-16 group-hover:bg-[#b89b72] group-hover:text-black group-hover:border-[#b89b72] transition-colors duration-500 shadow-xl">
                      {stage.num}
                    </div>
                    
                    <div className="p-12 border border-white/10 bg-[#0a0f16]/80 backdrop-blur-md hover:border-[#b89b72]/50 transition-all duration-700 h-[450px] flex flex-col justify-between overflow-hidden relative">
                      {/* Subtle hover gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#b89b72]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      <div className="relative z-10">
                        <div className="text-3xl text-gray-600 mb-6 group-hover:text-[#b89b72] transition-colors duration-500">
                          {stage.icon}
                        </div>
                        <h3 className="text-3xl font-serif font-light mb-10 text-white group-hover:text-[#b89b72] transition-colors duration-500">{stage.title}</h3>
                        
                        <div className="space-y-6">
                          {stage.metrics.map((metric, idx) => (
                            <div key={idx} className="flex items-center gap-4 group/item">
                              <div className="w-6 h-[1px] bg-white/20 group-hover/item:bg-[#b89b72] group-hover/item:w-10 transition-all duration-500" />
                              <span className="text-sm font-light tracking-wide text-gray-300 group-hover/item:text-white transition-colors duration-300">{metric}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Bottom Description Card at the end */}
              <div className="w-[500px] flex-shrink-0 relative flex items-center justify-center">
                <div className="p-12 border border-white/10 bg-[#0a0f16] text-center">
                  <FiCheckCircle className="mx-auto text-4xl text-[#b89b72] mb-8" />
                  <p className="text-xl font-serif font-light leading-relaxed text-gray-300">
                    "Tasks in each stage are defined as part of the process and are followed. Our process is flexible to take care of changes and adjustments."
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </section>
      </div>

      {/* Mobile Vertical Timeline for ADMIRE PROCESS */}
      <div className="md:hidden py-32 px-6 bg-[#070b11] relative z-10">
        <h2 className="text-4xl font-serif font-light tracking-tight mb-20 text-center">Admire Process</h2>
        <div className="space-y-24 border-l border-white/20 pl-8 relative ml-4">
          {ADMIRE_PROCESS.map((stage, i) => (
            <motion.div 
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="relative p-6 border border-white/10 bg-[#0a0f16]"
            >
              <div className="absolute w-4 h-4 rounded-full bg-[#070b11] border-2 border-[#b89b72] -left-[42px] top-8" />
              <div className="text-3xl font-serif text-[#b89b72] mb-4">{stage.num}</div>
              <h3 className="text-2xl font-serif font-light mb-6 text-white">{stage.title}</h3>
              <div className="space-y-4">
                {stage.metrics.map((metric, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-4 h-[1px] bg-white/20" />
                    <span className="text-sm font-light text-gray-300">{metric}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
          <motion.div variants={fadeUp} className="p-8 border border-[#b89b72]/30 bg-[#b89b72]/5 mt-10">
            <p className="text-base font-serif font-light leading-relaxed text-gray-300 italic text-center">
              "Tasks in each stage are defined as part of the process and are followed. Our process is flexible to take care of changes and adjustments."
            </p>
          </motion.div>
        </div>
      </div>

      {/* SECTION 3 — ORGANIZATION CHART */}
      <section className="py-40 bg-[#0a0f16] border-t border-white/5 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-24 text-center">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#b89b72] mb-4">Command Structure</div>
            <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight text-white mb-6">Organizational Hierarchy</h2>
            <p className="text-gray-400 font-light text-lg max-w-2xl mx-auto">A streamlined enterprise command chain ensuring absolute accountability and zero-tolerance execution.</p>
          </motion.div>

          {/* Interactive Org Chart */}
          <div className="flex flex-col items-center w-full relative">
            
            {/* Chief / MD Node */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-20 border border-[#b89b72] bg-[#070b11] px-12 py-6 mb-16 shadow-[0_0_40px_rgba(184,155,114,0.1)] text-center cursor-default hover:bg-[#b89b72]/10 transition-colors duration-500"
            >
              <FiUsers className="mx-auto text-2xl text-[#b89b72] mb-2" />
              <h3 className="text-xl font-medium tracking-wide uppercase text-white">{ORG_CHART.head}</h3>
              
              {/* Vertical line connecting to branches */}
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-px h-16 bg-white/20" />
            </motion.div>

            {/* Horizontal Branch Line (Desktop only) */}
            <div className="hidden md:block w-3/4 h-px bg-white/20 relative z-10" />

            {/* Departments Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 w-full mt-0 md:mt-16 relative z-20">
              {ORG_CHART.departments.map((dept, i) => (
                <div 
                  key={i} 
                  className="flex flex-col items-center relative"
                  onMouseEnter={() => setHoveredOrgDept(i)}
                  onMouseLeave={() => setHoveredOrgDept(null)}
                >
                  {/* Vertical line from horizontal branch to department head (Desktop) */}
                  <div className="hidden md:block absolute -top-16 left-1/2 -translate-x-1/2 w-px h-16 bg-white/20" />
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className={`border px-8 py-5 text-center w-full max-w-xs transition-all duration-500 relative ${
                      hoveredOrgDept === i ? "border-[#b89b72] bg-[#b89b72]/5" : "border-white/10 bg-[#0a0f16]"
                    }`}
                  >
                    <h4 className={`text-sm uppercase tracking-widest transition-colors duration-500 ${hoveredOrgDept === i ? "text-[#b89b72]" : "text-gray-300"}`}>
                      {dept.name}
                    </h4>
                    <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-[#b89b72] transition-all duration-500 ${hoveredOrgDept === i ? "opacity-100" : "opacity-0"}`} />
                  </motion.div>

                  {/* Vertical line to sub roles */}
                  <div className={`w-px h-10 transition-colors duration-500 ${hoveredOrgDept === i ? "bg-[#b89b72]/50" : "bg-white/10"}`} />

                  {/* Sub Roles List */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (i * 0.2) }}
                    className={`flex flex-col gap-3 w-full max-w-xs border transition-colors duration-500 p-6 ${
                      hoveredOrgDept === i ? "border-[#b89b72]/30 bg-[#070b11]/80 shadow-2xl" : "border-white/5 bg-[#070b11]"
                    }`}
                  >
                    {dept.roles.map((role, idx) => (
                      <div key={idx} className="flex items-center gap-3 group">
                        <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${hoveredOrgDept === i ? "bg-[#b89b72]" : "bg-white/20"}`} />
                        <span className={`text-sm font-light transition-colors duration-300 ${hoveredOrgDept === i ? "text-white" : "text-gray-400 group-hover:text-white"}`}>{role}</span>
                      </div>
                    ))}
                  </motion.div>

                </div>
              ))}
            </div>
            
          </div>
        </div>
      </section>

      {/* TEAMWORK MESSAGE */}
      <section className="py-40 bg-[#070b11] relative z-10 flex items-center justify-center border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <FiUsers className="mx-auto text-5xl text-[#b89b72] mb-12 opacity-50" />
            <div className="space-y-8">
              <h3 className="text-2xl md:text-4xl font-serif font-light text-white leading-relaxed">
                "For every project, we assign these set of people to work as a unified team."
              </h3>
              <h3 className="text-2xl md:text-4xl font-serif font-light text-white leading-relaxed">
                "We always believe that teamwork will <span className="italic text-[#b89b72]">always succeed in work.</span>"
              </h3>
              <h3 className="text-xl md:text-2xl font-light text-gray-400 leading-relaxed mt-12 max-w-2xl mx-auto">
                "All information is shared systematically to maintain the same wavelength across the entire enterprise."
              </h3>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
