"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { FiArrowRight, FiCheckCircle, FiChevronRight, FiUsers, FiBox, FiTrendingUp, FiLayers, FiBriefcase } from "react-icons/fi";
import HumanAvatar, { AvatarType } from "@/components/HumanAvatar";

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

const ADMIRE_PROCESS_THEMES = [
  { bg: "bg-[#CF6E4E]", circleBg: "bg-[#CF6E4E]", hoverBg: "from-black/20", glow: "shadow-[#CF6E4E]/30" },   // Terracotta (#CF6E4E)
  { bg: "bg-[#147B80]", circleBg: "bg-[#147B80]", hoverBg: "from-black/20", glow: "shadow-[#147B80]/30" },   // Deep Teal (#147B80)
  { bg: "bg-[#463854]", circleBg: "bg-[#463854]", hoverBg: "from-black/20", glow: "shadow-[#463854]/30" },   // Slate Plum (#463854)
  { bg: "bg-[#2D5A4C]", circleBg: "bg-[#2D5A4C]", hoverBg: "from-black/20", glow: "shadow-[#2D5A4C]/30" },   // Emerald Forest (#2D5A4C)
  { bg: "bg-[#BF5F5F]", circleBg: "bg-[#BF5F5F]", hoverBg: "from-black/20", glow: "shadow-[#BF5F5F]/30" },   // Dusty Rose (#BF5F5F)
  { bg: "bg-[#DE9B3A]", circleBg: "bg-[#DE9B3A]", hoverBg: "from-black/20", glow: "shadow-[#DE9B3A]/30" },   // Warm Ochre (#DE9B3A)
];

const ORG_CHART = {
  head: {
    role: "Managing Director / Chief",
    name: "Executive Leadership",
    avatar: "md" as AvatarType,
  },
  departments: [
    {
      name: "Project Management",
      accent: "#147B80",
      accentBg: "bg-[#147B80]",
      borderHover: "border-[#147B80]",
      bgHover: "bg-[#147B80]/5",
      roles: [
        { title: "Project Managers", level: "Operations Lead", avatar: "pm" as AvatarType },
        { title: "Project Engineers", level: "Engineering", avatar: "pe" as AvatarType },
        { title: "Site Engineer", level: "Field & Quality Control", avatar: "se" as AvatarType },
        { title: "Quantity Surveyor", level: "Cost & Estimation", avatar: "qs" as AvatarType },
      ]
    },
    {
      name: "Architecture Studio",
      accent: "#463854",
      accentBg: "bg-[#463854]",
      borderHover: "border-[#463854]",
      bgHover: "bg-[#463854]/5",
      roles: [
        { title: "Principal Architect", level: "Creative Direction", avatar: "pa" as AvatarType },
        { title: "Senior Architects", level: "Design Studio", avatar: "sa" as AvatarType },
        { title: "Draftsman", level: "CADD & Detailing", avatar: "df" as AvatarType },
      ]
    },
    {
      name: "Administration",
      accent: "#CF6E4E",
      accentBg: "bg-[#CF6E4E]",
      borderHover: "border-[#CF6E4E]",
      bgHover: "bg-[#CF6E4E]/5",
      roles: [
        { title: "Accounts", level: "Finance & Audit", avatar: "acc" as AvatarType },
        { title: "Procurement", level: "Supply Chain", avatar: "pro" as AvatarType },
        { title: "Admin", level: "Studio Operations", avatar: "adm" as AvatarType },
        { title: "Admin Assistant", level: "Executive Support", avatar: "ast" as AvatarType },
      ]
    }
  ]
};

export default function ProcessPage() {
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: horizontalScrollRef, offset: ["start start", "end end"] });
  
  // Shift the timeline left as the user scrolls down (Desktop only)
  const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  const [activeCycle, setActiveCycle] = useState(0);
  const [hoveredOrgDept, setHoveredOrgDept] = useState<number | null>(null);

  return (
    <div className="relative bg-[#ffffff] text-[#000000] overflow-clip font-sans pb-32">
      
      {/* Background Architectural Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#000000 1px, transparent 1px), linear-gradient(90deg, #000000 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-48 pb-20 sm:pb-32 px-6 md:px-16 lg:px-24 border-b border-black/5 relative z-10">
        <div className="max-w-7xl mx-auto text-center md:text-left">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#60A5FA] mb-4 sm:mb-6">Execution Excellence</div>
            <h1 className="text-4xl sm:text-6xl md:text-[7rem] font-serif font-light text-black tracking-tighter leading-[1.1] md:leading-[1] mb-6 md:mb-10">
              The Engine of <br className="hidden md:block" />{" "}
              <span className="relative inline-block px-2 sm:px-3 md:px-5 py-0.5 mx-0.5 sm:mx-1">
                {/* Ambient neon glow halo */}
                <span
                  className="absolute inset-0 bg-[#FACC15]/50 blur-xl rounded-xl -z-0 pointer-events-none"
                  aria-hidden="true"
                />
                {/* Full-word luminous highlighter stroke */}
                <span
                  className="absolute inset-0 bg-gradient-to-r from-[#FDE047] via-[#FEF08A] to-[#FACC15] -rotate-1 rounded-lg -z-0 opacity-95 shadow-[0_0_25px_rgba(250,204,21,0.75),0_0_55px_rgba(253,224,71,0.45)] pointer-events-none"
                  aria-hidden="true"
                />
                <span className="relative z-10 italic font-normal text-black">
                  Precision.
                </span>
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-light max-w-3xl leading-relaxed mx-auto md:mx-0">
              We do not leave massive enterprise structures to chance. Our execution methodology is a highly calibrated, zero-tolerance framework.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 1 — PROJECT CYCLE */}
      <section className="py-20 md:py-40 relative z-10 bg-[#f8f9fa] border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12 md:mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-light tracking-tight mb-4">Project Cycle</h2>
            <p className="text-gray-600 font-light text-base sm:text-lg max-w-2xl">The fundamental lifecycle of our enterprise projects.</p>
          </motion.div>

          {/* Interactive Cycle Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-16 md:mb-32">
            {PROJECT_CYCLE.map((stage, i) => {
              const cardThemes = [
                { bg: "bg-[#CF6E4E]", accent: "bg-white", text: "text-white/80", hoverBg: "from-black/15" },   // Terracotta (#CF6E4E)
                { bg: "bg-[#147B80]", accent: "bg-white", text: "text-white/80", hoverBg: "from-black/15" },   // Deep Teal (#147B80)
                { bg: "bg-[#463854]", accent: "bg-white", text: "text-white/80", hoverBg: "from-black/15" },   // Slate Plum (#463854)
                { bg: "bg-[#BF5F5F]", accent: "bg-white", text: "text-white/80", hoverBg: "from-black/15" },   // Dusty Rose (#BF5F5F)
                { bg: "bg-[#DE9B3A]", accent: "bg-white", text: "text-white/80", hoverBg: "from-black/15" },   // Warm Ochre (#DE9B3A)
              ];
              const theme = cardThemes[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  onMouseEnter={() => setActiveCycle(i)}
                  className={`relative p-6 sm:p-7 md:p-8 rounded-2xl transition-all duration-700 cursor-pointer overflow-hidden text-white ${theme.bg} ${
                    activeCycle === i 
                      ? "scale-[1.02] shadow-2xl shadow-black/20 ring-2 ring-white/30" 
                      : "shadow-md hover:shadow-xl hover:scale-[1.01]"
                  }`}
                >
                  {/* Top accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 transition-all duration-700 ${activeCycle === i ? "bg-white opacity-100" : "bg-white/40 opacity-50"}`} />
                  
                  {/* Subtle hover gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${theme.hoverBg} to-transparent transition-opacity duration-700 ${activeCycle === i ? "opacity-100" : "opacity-0"}`} />
                  
                  <div className={`relative z-10 text-3xl sm:text-4xl font-serif mb-4 sm:mb-6 font-semibold ${theme.text}`}>
                    {stage.id}
                  </div>
                  <h3 className="relative z-10 text-lg sm:text-xl font-serif font-light mb-3 sm:mb-4 text-white">
                    {stage.title}
                  </h3>
                  
                  <p className="relative z-10 text-sm font-light text-white/90 leading-relaxed mt-2">
                    {stage.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Process Flow Timeline (Horizontal Auto-Scrolling Marquee) */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="pt-16 border-t border-black/10 overflow-hidden pb-8 relative w-full flex"
          >
            {/* Left and right gradient masks for a smooth fade effect */}
            <div className="absolute top-0 left-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#f8f9fa] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#f8f9fa] to-transparent z-10 pointer-events-none" />
            
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
              className="flex items-center w-max"
            >
              {[...FLOW_STEPS, ...FLOW_STEPS].map((step, idx) => (
                <div key={idx} className="flex items-center gap-8 group px-4">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-4 h-4 rounded-full border-2 border-black/20 bg-[#ffffff] group-hover:border-[#60A5FA] group-hover:bg-[#60A5FA]/20 transition-all duration-500" />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-gray-500 group-hover:text-black transition-colors duration-500 text-center w-32">
                      {step}
                    </span>
                  </div>
                  <div className="w-16 md:w-32 h-[1px] bg-gradient-to-r from-white/10 via-white/30 to-white/10 relative">
                    <div className="absolute top-1/2 -translate-y-1/2 right-0 w-2 h-2 border-t border-r border-black/30 transform rotate-45" />
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — ADMIRE PROJECT PROCESS (Horizontal Scroll) */}
      <div className="hidden md:block relative z-10">
        <section ref={horizontalScrollRef} className="relative h-[400vh] bg-[#ffffff]">
          <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            
            <div className="absolute top-32 left-24 z-20">
              <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight mb-2">Admire Process</h2>
              <p className="text-gray-500 font-light uppercase tracking-[0.2em] text-[10px]">Interactive Workflow</p>
            </div>

            <motion.div style={{ x: xTransform }} className="flex w-max gap-16 px-24 pt-20">
              {ADMIRE_PROCESS.map((stage, i) => {
                const theme = ADMIRE_PROCESS_THEMES[i % ADMIRE_PROCESS_THEMES.length];
                return (
                  <div key={i} className="w-[500px] flex-shrink-0 relative group">
                    
                    {/* Background architectural grid line */}
                    <div className="absolute top-8 left-0 w-full h-[1px] bg-black/10 z-0" />
                    
                    <div className="relative z-10">
                      {/* Step Number Circle Badge */}
                      <div className={`w-16 h-16 rounded-full border-2 border-white ${theme.circleBg} flex items-center justify-center text-xl font-serif text-white font-semibold mb-16 shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl`}>
                        {stage.num}
                      </div>
                      
                      {/* Card Content */}
                      <div className={`p-12 rounded-2xl ${theme.bg} text-white shadow-xl group-hover:shadow-2xl group-hover:scale-[1.02] transition-all duration-700 h-[450px] flex flex-col justify-between overflow-hidden relative border border-white/20`}>
                        {/* Top accent bar */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-white/40 group-hover:bg-white transition-all duration-700" />
                        
                        {/* Subtle hover gradient overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${theme.hoverBg} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
                        
                        <div className="relative z-10">
                          <div className="text-3xl text-white/85 mb-6 group-hover:text-white transition-colors duration-500">
                            {stage.icon}
                          </div>
                          <h3 className="text-3xl font-serif font-light mb-10 text-white leading-tight">
                            {stage.title}
                          </h3>
                          
                          <div className="space-y-6">
                            {stage.metrics.map((metric, idx) => (
                              <div key={idx} className="flex items-center gap-4 group/item">
                                <div className="w-6 h-[1px] bg-white/40 group-hover/item:bg-white group-hover/item:w-10 transition-all duration-500" />
                                <span className="text-sm font-light tracking-wide text-white/90 group-hover/item:text-white transition-colors duration-300">
                                  {metric}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {/* Bottom Description Card at the end */}
              <div className="w-[500px] flex-shrink-0 relative flex items-center justify-center">
                <div className="p-12 rounded-2xl border border-black/10 bg-[#f8f9fa] shadow-xl text-center h-[450px] flex flex-col justify-center items-center">
                  <FiCheckCircle className="mx-auto text-5xl text-[#60A5FA] mb-8" />
                  <p className="text-xl font-serif font-light leading-relaxed text-gray-800">
                    "Tasks in each stage are defined as part of the process and are followed. Our process is flexible to take care of changes and adjustments."
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </section>
      </div>

      {/* Mobile Vertical Timeline for ADMIRE PROCESS */}
      <div className="md:hidden py-32 px-6 bg-[#ffffff] relative z-10">
        <h2 className="text-4xl font-serif font-light tracking-tight mb-20 text-center">Admire Process</h2>
        <div className="space-y-12 border-l-2 border-black/10 pl-6 relative ml-4">
          {ADMIRE_PROCESS.map((stage, i) => {
            const theme = ADMIRE_PROCESS_THEMES[i % ADMIRE_PROCESS_THEMES.length];
            return (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
                className={`relative p-8 rounded-2xl ${theme.bg} text-white shadow-xl border border-white/20 overflow-hidden`}
              >
                <div className={`absolute w-5 h-5 rounded-full ${theme.circleBg} border-2 border-white -left-[35px] top-8 shadow-md`} />
                <div className="text-3xl font-serif text-white/85 font-semibold mb-3">{stage.num}</div>
                <div className="flex items-center gap-3 mb-5 text-2xl text-white">
                  <span className="text-2xl text-white/90">{stage.icon}</span>
                  <h3 className="text-2xl font-serif font-light">{stage.title}</h3>
                </div>
                <div className="space-y-4 pt-2">
                  {stage.metrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-5 h-[1px] bg-white/40" />
                      <span className="text-sm font-light text-white/90">{metric}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
          <motion.div variants={fadeUp} className="p-8 rounded-2xl border border-black/10 bg-[#f8f9fa] shadow-md mt-10 text-center">
            <FiCheckCircle className="text-3xl text-[#60A5FA] mb-4 mx-auto" />
            <p className="text-base font-serif font-light leading-relaxed text-gray-800 italic">
              "Tasks in each stage are defined as part of the process and are followed. Our process is flexible to take care of changes and adjustments."
            </p>
          </motion.div>
        </div>
      </div>

      {/* SECTION 3 — ORGANIZATION CHART */}
      <section className="py-40 bg-[#f8f9fa] border-t border-black/5 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-24 text-center">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#60A5FA] mb-4">Command Structure</div>
            <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight text-black mb-6">Organizational Hierarchy</h2>
            <p className="text-gray-600 font-light text-lg max-w-2xl mx-auto">A streamlined enterprise command chain ensuring absolute accountability and zero-tolerance execution.</p>
          </motion.div>

          {/* Interactive Org Chart */}
          <div className="flex flex-col items-center w-full relative">
            
            {/* Chief / MD Node */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-20 border border-[#60A5FA] bg-[#ffffff] px-8 py-5 rounded-2xl shadow-[0_10px_40px_rgba(96,165,250,0.15)] text-center cursor-default hover:shadow-[0_15px_45px_rgba(96,165,250,0.25)] hover:scale-[1.02] transition-all duration-500 flex items-center gap-4 group mb-16"
            >
              <div className="relative flex-shrink-0 transition-transform duration-500 group-hover:scale-105">
                <HumanAvatar type={ORG_CHART.head.avatar} size={56} className="border-2 border-[#60A5FA]/30 shadow-md" />
              </div>
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#60A5FA]">
                  {ORG_CHART.head.name}
                </div>
                <h3 className="text-lg sm:text-xl font-serif font-medium tracking-wide text-black">
                  {ORG_CHART.head.role}
                </h3>
              </div>
              
              {/* Vertical line connecting to branches */}
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-px h-16 bg-black/20" />
            </motion.div>

            {/* Horizontal Branch Line (Desktop only) */}
            <div className="hidden md:block w-3/4 h-px bg-black/20 relative z-10" />

            {/* Departments Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 w-full mt-0 md:mt-16 relative z-20">
              {ORG_CHART.departments.map((dept, i) => (
                <div 
                  key={i} 
                  className="flex flex-col items-center relative"
                  onMouseEnter={() => setHoveredOrgDept(i)}
                  onMouseLeave={() => setHoveredOrgDept(null)}
                >
                  {/* Vertical line from horizontal branch to department head (Desktop) */}
                  <div className="hidden md:block absolute -top-16 left-1/2 -translate-x-1/2 w-px h-16 bg-black/20" />
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className={`border px-6 py-4 rounded-xl text-center w-full max-w-sm transition-all duration-500 relative ${
                      hoveredOrgDept === i ? `${dept.borderHover} ${dept.bgHover} shadow-md` : "border-black/10 bg-[#f8f9fa]"
                    }`}
                  >
                    <h4 className={`text-xs uppercase tracking-widest font-semibold transition-colors duration-500 ${hoveredOrgDept === i ? "text-black" : "text-gray-700"}`}>
                      {dept.name}
                    </h4>
                    <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] ${dept.accentBg} transition-all duration-500 ${hoveredOrgDept === i ? "opacity-100 w-3/4" : "opacity-40"}`} />
                  </motion.div>

                  {/* Vertical line to sub roles */}
                  <div className={`w-px h-8 transition-colors duration-500 ${hoveredOrgDept === i ? `${dept.accentBg}` : "bg-black/10"}`} />

                  {/* Sub Roles List */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (i * 0.2) }}
                    className={`flex flex-col gap-2.5 w-full max-w-sm border rounded-2xl transition-all duration-500 p-4 ${
                      hoveredOrgDept === i ? `${dept.borderHover} bg-[#ffffff] shadow-2xl scale-[1.02]` : "border-black/10 bg-[#ffffff] shadow-sm"
                    }`}
                  >
                    {dept.roles.map((role, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-black/[0.03] transition-colors duration-300 group/role cursor-default"
                      >
                        <div className="relative flex-shrink-0 transition-transform duration-300 group-hover/role:scale-110">
                          <HumanAvatar type={role.avatar} size={42} className="border border-black/10 shadow-sm" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-medium text-black group-hover/role:text-[#60A5FA] transition-colors duration-300">
                            {role.title}
                          </span>
                          <span className="text-[11px] font-light text-gray-500">
                            {role.level}
                          </span>
                        </div>
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
      <section className="py-40 bg-[#ffffff] relative z-10 flex items-center justify-center border-t border-black/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <FiUsers className="mx-auto text-5xl text-[#60A5FA] mb-12 opacity-50" />
            <div className="space-y-8">
              <h3 className="text-2xl md:text-4xl font-serif font-light text-black leading-relaxed">
                "For every project, we assign these set of people to work as a unified team."
              </h3>
              <h3 className="text-2xl md:text-4xl font-serif font-light text-black leading-relaxed">
                "We always believe that teamwork will <span className="italic text-[#60A5FA]">always succeed in work.</span>"
              </h3>
              <h3 className="text-xl md:text-2xl font-light text-gray-600 leading-relaxed mt-12 max-w-2xl mx-auto">
                "All information is shared systematically to maintain the same wavelength across the entire enterprise."
              </h3>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
