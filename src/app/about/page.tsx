"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";

const fadeUp: any = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="relative min-h-screen bg-[#070b11] text-[#fafaf9] overflow-hidden font-sans">
      
      {/* SECTION 1 — HERO SECTION */}
      <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-[-5%] z-0">
          <Image
            src="/hero_arch_1779118409602.png"
            alt="Cinematic Architecture"
            fill
            className="object-cover scale-105 opacity-50 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070b11]/80 via-[#070b11]/50 to-[#070b11]" />
        </motion.div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24 flex flex-col items-center text-center mt-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-5xl"
          >
            <motion.div variants={fadeUp} className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#b89b72] mb-8">
              Admire Architects Pvt Ltd
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-[6rem] font-serif font-light text-white tracking-tighter leading-[1.05] mb-10">
              Designing Enterprise Spaces with <br className="hidden md:block" /><span className="italic text-[#b89b72]">Precision & Vision</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed mb-16">
              ADMIRE ARCHITECTS PVT LTD is a multidisciplinary consultancy firm delivering architecture, interiors, project management, and turnkey solutions for global enterprises.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex justify-center">
              <Link href="#introduction" className="group flex items-center gap-6 border border-white/20 bg-white/5 backdrop-blur-md px-10 py-5 hover:bg-[#b89b72] hover:border-[#b89b72] hover:text-black transition-all duration-700">
                <span className="uppercase tracking-[0.2em] text-xs font-medium">Discover Our Story</span>
                <FiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20 pointer-events-none"
        >
          <span className="text-[9px] uppercase tracking-[0.3em] text-gray-500">Scroll</span>
          <div className="w-[1px] h-16 bg-white/10 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full h-1/2 bg-[#b89b72]"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>
      </section>

      {/* SECTION 2 — COMPANY INTRODUCTION */}
      <section id="introduction" className="py-32 md:py-48 bg-[#070b11] relative border-b border-white/5">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#FAFAF9 1px, transparent 1px), linear-gradient(90deg, #FAFAF9 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeUp} className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#b89b72] mb-4">
                The Consultancy
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-serif font-light leading-tight text-white mb-8">
                A Multi-Disciplinary Approach to <span className="italic">Spatial Engineering.</span>
              </motion.h2>
              
              <div className="space-y-6 text-gray-400 font-light leading-relaxed text-base md:text-lg">
                <motion.p variants={fadeUp}>
                  The Admire Group is a multi-disciplinary consultancy firm offering services in Architecture, Interiors, Project Management, and Design Build & Turnkey Solutions.
                </motion.p>
                <motion.p variants={fadeUp}>
                  Coordinating the client’s requirements with the activities of consultants, contractors and vendors, project management during construction, time/budgetary control systems and post-occupancy facilities management.
                </motion.p>
                <motion.p variants={fadeUp}>
                  Started operation in Bangalore in the year 2005 and presently registered in Karnataka, Tamil Nadu & Andhra Pradesh. Our firm is ISO 9001:2008 certified along with all necessary registrations like ESI, PF & employee insurance.
                </motion.p>
                <motion.p variants={fadeUp}>
                  The focus of our practice is to manage projects with the active involvement of experienced senior personnel supported by computer-based systems for programming facility requirements, cost and time control, CAD documentation and asset management.
                </motion.p>
                <motion.p variants={fadeUp} className="text-white border-l-2 border-[#b89b72] pl-6 italic mt-8">
                  We desire to deliver projects on time and within allotted budget that represent the best value for the client’s expenditure.
                </motion.p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[60vh] md:h-[80vh] w-full"
            >
              <div className="absolute inset-0 bg-[#b89b72]/5 translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6 border border-[#b89b72]/20" />
              <div className="relative h-full w-full bg-[#0a0f16] overflow-hidden group">
                <Image 
                  src="/project_2_1779118501379.png" 
                  alt="Corporate Architecture" 
                  fill 
                  className="object-cover grayscale group-hover:scale-105 transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] opacity-70" 
                />
                
                {/* Floating Badges */}
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 flex flex-col gap-3 md:gap-4 z-10">
                  {[
                    "ISO 9001:2008 Certified",
                    "Established Since 2005",
                    "Multi-State Operations"
                  ].map((badge, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + (i * 0.2), duration: 0.8 }}
                      className="bg-black/60 backdrop-blur-md border border-white/10 px-4 md:px-6 py-3 flex items-center gap-3 w-max"
                    >
                      <FiCheckCircle className="text-[#b89b72]" />
                      <span className="text-[10px] md:text-xs uppercase tracking-[0.1em] text-white font-medium">{badge}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — LEADERSHIP MESSAGE */}
      <section className="py-40 md:py-56 bg-[#0a0f16] relative flex items-center justify-center overflow-hidden">
        {/* Subtle background architecture lines */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="archGrid" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#b89b72" strokeWidth="0.5" />
                  <path d="M 0 100 L 100 0" fill="none" stroke="#b89b72" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#archGrid)" />
            </svg>
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="text-[8rem] md:text-[12rem] font-serif text-[#b89b72] leading-none opacity-20 absolute -top-16 md:-top-24 left-1/2 -translate-x-1/2">
              &ldquo;
            </motion.div>
            <motion.h3 variants={fadeUp} className="text-3xl md:text-5xl lg:text-7xl font-serif font-light leading-[1.2] text-white tracking-wide mb-16 relative z-10 uppercase">
              "If we build the people, <br className="hidden md:block" />
              they will build the business"
            </motion.h3>
            <motion.div variants={fadeUp}>
              <div className="font-serif text-3xl md:text-4xl text-[#b89b72] mb-3">M. Palani</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-gray-400">Managing Director</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 — OUR STRATEGY */}
      <section className="py-32 md:py-48 bg-[#070b11] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-b border-white/10 pb-12"
          >
            <div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#b89b72] mb-6">Methodology</div>
              <h2 className="text-5xl md:text-7xl font-serif font-light text-white tracking-tight">Our Strategy</h2>
            </div>
            <p className="max-w-md text-gray-400 font-light text-lg md:text-xl">
              Five core pillars that define our approach to delivering world-class corporate environments.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {[
              { num: "01", title: "Core Strength", desc: "Designing & managing interior fit outs for multinationals." },
              { num: "02", title: "Teamwork", desc: "Planning and execution of the project from concept to handover to achieve the highest value consistent with the client’s goals." },
              { num: "03", title: "Technology", desc: "Integration and coordination of technology installation is the central part of our design activities." },
              { num: "04", title: "Time", desc: "Importance of completing projects on time and within client budget." },
              { num: "05", title: "Focus", desc: "We view every project as an opportunity to establish long-term positive relationships resulting in repeat assignments." }
            ].map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group p-10 bg-[#0a0f16] border border-white/5 hover:border-[#b89b72]/50 transition-colors duration-500 relative overflow-hidden flex flex-col justify-between min-h-[320px]"
              >
                {/* Minimal Architectural Visual Line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#b89b72]/0 via-[#b89b72]/40 to-[#b89b72]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div>
                  <div className="text-[#b89b72] text-sm font-medium tracking-widest mb-8 font-serif">{pillar.num}</div>
                  <h3 className="text-2xl font-serif font-light text-white mb-6 group-hover:text-[#b89b72] transition-colors duration-500">{pillar.title}</h3>
                </div>
                <p className="text-gray-400 font-light leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — COMPANY APPROACH */}
      <section className="py-40 md:py-56 bg-[#0a0f16] relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/hero_arch_1779118409602.png" alt="Approach Texture" fill className="object-cover opacity-[0.03] grayscale" />
        </div>
        <div className="max-w-4xl mx-auto px-6 md:px-16 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="w-px h-32 bg-gradient-to-b from-transparent via-[#b89b72]/50 to-transparent mx-auto mb-16" />
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white leading-[1.3] mb-12 tracking-wide">
              "Our multidisciplinary approach enables us to integrate all aspects of the project’s requirements into a <span className="italic text-[#b89b72]">comprehensive solution.</span>"
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-3xl mx-auto">
              Our team consisting of architects and project managers has the experience to execute and manage projects to produce solutions responsive to the client’s time, budgetary and aesthetic requirements.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6 — COMPANY HIGHLIGHTS */}
      <section className="py-32 md:py-40 bg-[#070b11] border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { label: "Established", value: "2005" },
              { label: "Enterprise Projects", value: "100+" },
              { label: "Client Base", value: "Fortune 500" },
              { label: "Presence", value: "Multi-State" },
              { label: "Core Operations", value: "ISO Certified" },
              { label: "Expertise", value: "Turnkey" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="p-8 md:p-16 border border-white/5 bg-white/[0.01] backdrop-blur-md flex flex-col items-center justify-center text-center group hover:bg-[#b89b72]/5 hover:border-[#b89b72]/30 transition-all duration-700"
              >
                <div className="text-3xl md:text-6xl font-serif text-white mb-4 md:mb-6 group-hover:text-[#b89b72] transition-colors duration-700">{stat.value}</div>
                <div className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-gray-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — WHY ADMIRE */}
      <section className="py-32 md:py-48 bg-[#0a0f16]">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-24 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-8 border-b border-white/10 pb-12"
          >
            <div>
              <h2 className="text-4xl md:text-6xl font-serif font-light text-white tracking-tight mb-4">Why Admire?</h2>
            </div>
            <p className="text-gray-400 font-light text-lg max-w-md md:text-right">
              The inherent advantages of partnering with a holistic architectural enterprise.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-20">
            {[
              "Timely Delivery",
              "Budget Control",
              "Enterprise Expertise",
              "Technical Precision",
              "Experienced Leadership",
              "End-to-End Execution"
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="flex flex-col items-center text-center space-y-6 group"
              >
                <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#b89b72] bg-[#070b11] group-hover:bg-[#b89b72]/10 transition-all duration-700 shadow-xl">
                  <FiCheckCircle className="text-gray-500 group-hover:text-[#b89b72] transition-colors duration-700 text-2xl" />
                </div>
                <h4 className="text-base md:text-xl font-light text-white tracking-wide">{feature}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 — CALL TO ACTION */}
      <section className="py-40 md:py-56 relative bg-[#070b11] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/project_1_1779118457708.png" alt="Let's Build" fill className="object-cover opacity-20 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b11] via-transparent to-[#070b11]" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeUp} className="text-5xl md:text-[6rem] font-serif font-light text-white mb-8 leading-[1.1]">
              Let’s Build the Future <br className="hidden md:block" />
              <span className="italic text-[#b89b72]">Together.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg md:text-2xl text-gray-400 font-light mb-16 max-w-2xl mx-auto">
              Creating intelligent, efficient, and inspiring spaces for modern enterprises.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/projects" className="w-full sm:w-auto px-10 py-5 bg-white text-black text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#b89b72] hover:text-white transition-colors duration-500">
                View Projects
              </Link>
              <Link href="/contact" className="w-full sm:w-auto px-10 py-5 border border-white/20 text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-white/10 transition-colors duration-500 backdrop-blur-sm">
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
