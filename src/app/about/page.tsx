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
    <div className="relative min-h-screen bg-[#ffffff] text-[#000000] overflow-clip font-sans">
      
      {/* SECTION 1 — HERO SECTION */}
      <section ref={containerRef} className="relative pt-40 md:pt-56 pb-20 md:pb-32 w-full flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-[-5%] z-0">
          {/* <Image
            src="/hero_arch_1779118409602.png"
            alt="Cinematic Architecture"
            fill
            className="object-cover scale-105 opacity-50 grayscale"
            priority
          /> */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#60A5FA]/15 via-[#ffffff]/60 to-[#ffffff]" />
        </motion.div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24 flex flex-col items-center text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-5xl"
          >
            <motion.div variants={fadeUp} className="mb-8 flex justify-center">
              <span className="inline-flex items-center gap-3 rounded-full bg-brand-blue px-6 py-2.5 text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold text-white shadow-lg shadow-brand-blue/20 ring-1 ring-brand-blue-light/50">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
                Admire Architects Pvt Ltd
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-[6rem] font-serif font-light text-black tracking-tighter leading-[1.05] mb-10">
              Designing Enterprise Spaces with <br className="hidden md:block" /><span className="italic font-normal text-[#1E3A8A]">Precision & Vision</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-gray-700 font-medium max-w-3xl mx-auto leading-relaxed">
              <span className="font-bold text-brand-blue">ADMIRE ARCHITECTS PVT LTD</span> is a{" "}
              <span className="bg-brand-blue-light/20 px-1.5 py-0.5 font-semibold text-brand-blue">multidisciplinary consultancy firm</span>{" "}
              delivering <span className="font-semibold text-brand-blue">architecture</span>,{" "}
              <span className="font-semibold text-brand-blue">interiors</span>,{" "}
              <span className="font-semibold text-brand-blue">project management</span>, and{" "}
              <span className="font-semibold text-brand-blue">turnkey solutions</span> for{" "}
              <span className="border-b-2 border-brand-gold font-semibold text-[#8a7350]">global enterprises</span>.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — COMPANY INTRODUCTION */}
      <section id="introduction" className="py-20 md:py-32 bg-[#ffffff] relative border-b border-black/5">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(#1E3A8A 1px, transparent 1px), linear-gradient(90deg, #1E3A8A 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeUp} className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#60A5FA] mb-4">
                The Consultancy
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-serif font-light leading-tight text-black mb-8">
                A Multi-Disciplinary Approach to <span className="italic text-brand-blue">Spatial Engineering.</span>
              </motion.h2>

              <div className="space-y-6 text-gray-700 font-light leading-relaxed text-base md:text-lg">
                <motion.p variants={fadeUp}>
                  <span className="font-semibold text-brand-blue">The Admire Group</span> is a multi-disciplinary consultancy firm offering services in <span className="font-medium text-brand-blue">Architecture</span>, <span className="font-medium text-brand-blue">Interiors</span>, <span className="font-medium text-brand-blue">Project Management</span>, and <span className="font-medium text-brand-blue">Design Build &amp; Turnkey Solutions</span>.
                </motion.p>
                <motion.p variants={fadeUp}>
                  Coordinating the client’s requirements with the activities of consultants, contractors and vendors, project management during construction, time/budgetary control systems and post-occupancy facilities management.
                </motion.p>
                <motion.p variants={fadeUp}>
                  Started operation in Bangalore in the year <span className="font-semibold text-brand-blue">2005</span> and presently registered in <span className="font-medium text-brand-blue">Karnataka</span>, <span className="font-medium text-brand-blue">Tamil Nadu</span> &amp; <span className="font-medium text-brand-blue">Andhra Pradesh</span>. Our firm is <span className="bg-brand-gold/20 px-1.5 py-0.5 font-semibold text-[#8a7350]">ISO 9001:2008 certified</span> along with all necessary registrations like ESI, PF &amp; employee insurance.
                </motion.p>
                <motion.p variants={fadeUp}>
                  The focus of our practice is to manage projects with the active involvement of experienced senior personnel supported by computer-based systems for programming facility requirements, cost and time control, CAD documentation and asset management.
                </motion.p>
                <motion.p variants={fadeUp} className="text-brand-blue border-l-4 border-brand-blue-light bg-brand-blue-light/10 py-4 pl-6 pr-4 italic mt-8">
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
              <div className="absolute inset-0 bg-[#60A5FA]/5 translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6 border border-[#60A5FA]/20" />
              <div className="relative h-full w-full bg-[#f8f9fa] overflow-hidden group">
                {/* <Image 
                  src="/project_2_1779118501379.png" 
                  alt="Corporate Architecture" 
                  fill 
                  className="object-cover grayscale group-hover:scale-105 transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] opacity-70" 
                /> */}
                
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
                      className="bg-white/60 backdrop-blur-md border border-black/10 px-4 md:px-6 py-3 flex items-center gap-3 w-max"
                    >
                      <FiCheckCircle className="text-[#60A5FA]" />
                      <span className="text-[10px] md:text-xs uppercase tracking-[0.1em] text-black font-medium">{badge}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — LEADERSHIP MESSAGE */}
      <section className="py-40 md:py-56 bg-gradient-to-b from-[#eef4ff] via-[#f8f9fa] to-[#eef4ff] relative flex items-center justify-center overflow-hidden">
        {/* Subtle background architecture lines */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="archGrid" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#60A5FA" strokeWidth="0.5" />
                  <path d="M 0 100 L 100 0" fill="none" stroke="#60A5FA" strokeWidth="0.5" />
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
            <motion.div variants={fadeUp} className="text-[8rem] md:text-[12rem] font-serif text-[#60A5FA] leading-none opacity-30 absolute -top-16 md:-top-24 left-1/2 -translate-x-1/2">
              &ldquo;
            </motion.div>
            <motion.h3 variants={fadeUp} className="text-3xl md:text-5xl lg:text-7xl font-serif font-light leading-[1.2] text-black tracking-wide mb-16 relative z-10 uppercase">
              &ldquo;If we <span className="text-brand-blue">build the people</span>, <br className="hidden md:block" />
              they will <span className="text-brand-blue">build the business</span>&rdquo;
            </motion.h3>
            <motion.div variants={fadeUp} className="flex flex-col items-center">
              {/* Managing Director portrait — swap the src for the real photo when available */}
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-white ring-4 ring-brand-blue-light/30 shadow-xl mb-6 relative overflow-hidden bg-brand-blue-light/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/team/m-palani-placeholder.svg"
                  alt="M. Palani - Managing Director"
                  width={192}
                  height={192}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="font-serif text-3xl md:text-4xl text-brand-blue mb-3">M. Palani</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-brand-blue-light font-semibold">Managing Director</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 — OUR STRATEGY */}
      <section className="pt-20 md:pt-32 pb-12 md:pb-16 bg-[#ffffff] border-y border-black/5">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-b-2 border-brand-blue-light/30 pb-12"
          >
            <div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-brand-blue-light font-semibold mb-6">Methodology</div>
              <h2 className="text-5xl md:text-7xl font-serif font-light text-black tracking-tight">Our <span className="text-brand-blue">Strategy</span></h2>
            </div>
            <p className="max-w-md text-gray-600 font-light text-lg md:text-xl">
              Five core pillars that define our approach to delivering world-class corporate environments.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {[
              { num: "01", title: "Core Strength", desc: "Designing & managing interior fit outs for multinationals.", card: "bg-blue-50 border-blue-200", bar: "bg-blue-500", num_: "text-blue-700", hoverTitle: "group-hover:text-blue-700" },
              { num: "02", title: "Teamwork", desc: "Planning and execution of the project from concept to handover to achieve the highest value consistent with the client’s goals.", card: "bg-amber-50 border-amber-200", bar: "bg-amber-500", num_: "text-amber-700", hoverTitle: "group-hover:text-amber-700" },
              { num: "03", title: "Technology", desc: "Integration and coordination of technology installation is the central part of our design activities.", card: "bg-emerald-50 border-emerald-200", bar: "bg-emerald-500", num_: "text-emerald-700", hoverTitle: "group-hover:text-emerald-700" },
              { num: "04", title: "Time", desc: "Importance of completing projects on time and within client budget.", card: "bg-violet-50 border-violet-200", bar: "bg-violet-500", num_: "text-violet-700", hoverTitle: "group-hover:text-violet-700" },
              { num: "05", title: "Focus", desc: "We view every project as an opportunity to establish long-term positive relationships resulting in repeat assignments.", card: "bg-rose-50 border-rose-200", bar: "bg-rose-500", num_: "text-rose-700", hoverTitle: "group-hover:text-rose-700" }
            ].map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`group p-10 ${pillar.card} border hover:-translate-y-1 hover:shadow-lg transition-all duration-500 relative overflow-hidden flex flex-col justify-between min-h-[320px]`}
              >
                {/* Colour bar keys each pillar to its own accent */}
                <div className={`absolute top-0 left-0 w-full h-[4px] ${pillar.bar}`} />

                <div>
                  <div className={`${pillar.num_} text-sm font-medium tracking-widest mb-8 font-serif`}>{pillar.num}</div>
                  <h3 className={`text-2xl font-serif font-light text-black mb-6 ${pillar.hoverTitle} transition-colors duration-500`}>{pillar.title}</h3>
                </div>
                <p className="text-gray-700 font-light leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — COMPANY APPROACH */}
      <section className="pt-16 md:pt-24 pb-12 md:pb-16 bg-gradient-to-br from-[#eef4ff] via-[#f8f9fa] to-[#fdf8f0] relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* <Image src="/hero_arch_1779118409602.png" alt="Approach Texture" fill className="object-cover opacity-[0.03] grayscale" /> */}
        </div>
        <div className="max-w-4xl mx-auto px-6 md:px-16 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="w-px h-16 bg-gradient-to-b from-transparent via-[#60A5FA]/50 to-transparent mx-auto mb-8" />
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-black leading-[1.3] mb-12 tracking-wide">
              &ldquo;Our multidisciplinary approach enables us to integrate all aspects of the project’s requirements into a{" "}
              <span className="relative inline-block italic font-medium text-brand-blue">
                <span className="relative z-10">comprehensive solution.</span>
                <span aria-hidden className="absolute inset-x-0 bottom-1 z-0 h-[0.35em] bg-brand-gold/40" />
              </span>&rdquo;
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto">
              Our team consisting of architects and project managers has the experience to execute and manage projects to produce solutions responsive to the client’s time, budgetary and aesthetic requirements.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6 — COMPANY HIGHLIGHTS */}
      <section className="pt-12 md:pt-16 pb-24 md:pb-32 bg-[#ffffff] border-t border-black/5 relative z-10">
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
                className="p-8 md:p-16 border border-brand-blue-light/20 bg-brand-blue-light/[0.06] backdrop-blur-md flex flex-col items-center justify-center text-center group hover:bg-brand-blue-light/15 hover:border-brand-blue-light/50 transition-all duration-700"
              >
                <div className="text-3xl md:text-6xl font-serif text-brand-blue mb-4 md:mb-6 group-hover:text-brand-blue-light transition-colors duration-700">{stat.value}</div>
                <div className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — WHY ADMIRE */}
      <section className="py-32 md:py-48 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-24 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-8 border-b-2 border-brand-blue-light/30 pb-12"
          >
            <div>
              <h2 className="text-4xl md:text-6xl font-serif font-light text-black tracking-tight mb-4">Why <span className="text-brand-blue">Admire</span>?</h2>
            </div>
            <p className="text-gray-600 font-light text-lg max-w-md md:text-right">
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
                <div className="w-20 h-20 rounded-full border border-brand-blue-light/30 flex items-center justify-center group-hover:border-brand-blue bg-[#ffffff] group-hover:bg-brand-blue transition-all duration-700 shadow-xl">
                  <FiCheckCircle className="text-brand-blue-light group-hover:text-white transition-colors duration-700 text-2xl" />
                </div>
                <h4 className="text-base md:text-xl font-light text-black tracking-wide">{feature}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 — CALL TO ACTION */}
      <section className="py-40 md:py-56 relative bg-[#ffffff] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* <Image src="/project_1_1779118457708.png" alt="Let's Build" fill className="object-cover opacity-20 grayscale" /> */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#ffffff] via-transparent to-[#ffffff]" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeUp} className="text-5xl md:text-[6rem] font-serif font-light text-black mb-8 leading-[1.1]">
              Let’s Build the Future <br className="hidden md:block" />
              <span className="italic text-[#60A5FA]">Together.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg md:text-2xl text-gray-600 font-light mb-16 max-w-2xl mx-auto">
              Creating intelligent, efficient, and inspiring spaces for modern enterprises.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/projects" className="w-full sm:w-auto px-10 py-5 bg-black text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#60A5FA] hover:text-black transition-colors duration-500">
                View Projects
              </Link>
              <Link href="/contact" className="w-full sm:w-auto px-10 py-5 border border-black/20 text-black text-xs uppercase tracking-[0.2em] font-medium hover:bg-black/10 transition-colors duration-500 backdrop-blur-sm">
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
