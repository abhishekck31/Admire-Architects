"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const SERVICES = [
  {
    id: "architecture",
    title: "Architecture",
    number: "01",
    description: "Iconic structural design tailored for global corporate headquarters and monumental enterprise developments.",
    image: "/project_1_1779118457708.png",
    bg: "bg-[#DCEEFE] dark:bg-[#0c4a6e] border border-[#BAE6FD] dark:border-[#0284c7]/40 hover:bg-[#CEE5FC] dark:hover:bg-[#075985]",
    numColor: "text-[#0369A1] dark:text-[#38BDF8]",
    titleColor: "text-[#0f172a] dark:text-white",
    descColor: "text-[#334155] dark:text-sky-100/90",
    arrowBg: "bg-white/80 dark:bg-white/10 text-[#0369A1] dark:text-[#38BDF8] group-hover:bg-[#0284c7] group-hover:text-white"
  },
  {
    id: "interior-design",
    title: "Interior Design",
    number: "02",
    description: "Precision-crafted internal spaces that enhance enterprise productivity while exuding quiet, profound luxury.",
    image: "/project_2_1779118501379.png",
    bg: "bg-[#FEF3C7] dark:bg-[#78350f] border border-[#FDE68A] dark:border-[#b45309]/40 hover:bg-[#FDEBB2] dark:hover:bg-[#854d0e]",
    numColor: "text-[#B45309] dark:text-[#FBBF24]",
    titleColor: "text-[#0f172a] dark:text-white",
    descColor: "text-[#334155] dark:text-amber-100/90",
    arrowBg: "bg-white/80 dark:bg-white/10 text-[#B45309] dark:text-[#FBBF24] group-hover:bg-[#b45309] group-hover:text-white"
  },
  {
    id: "project-management",
    title: "Project Management",
    number: "03",
    description: "Rigorous oversight and risk mitigation, ensuring multi-million dollar developments are executed flawlessly.",
    image: "/hero_arch_1779118409602.png",
    bg: "bg-[#E2E8F0] dark:bg-[#334155] border border-[#CBD5E1] dark:border-[#475569]/50 hover:bg-[#D5DEE8] dark:hover:bg-[#3b4b61]",
    numColor: "text-[#475569] dark:text-[#94A3B8]",
    titleColor: "text-[#0f172a] dark:text-white",
    descColor: "text-[#334155] dark:text-slate-100/90",
    arrowBg: "bg-white/80 dark:bg-white/10 text-[#475569] dark:text-[#94A3B8] group-hover:bg-[#475569] group-hover:text-white"
  },
  {
    id: "design-build",
    title: "Design Build",
    number: "04",
    description: "A unified workflow bridging the gap between visionary concept and physical construction under one entity.",
    image: "/project_1_1779118457708.png",
    bg: "bg-[#FFEDD5] dark:bg-[#7c2d12] border border-[#FED7AA] dark:border-[#c2410c]/40 hover:bg-[#FEE4C3] dark:hover:bg-[#9a3412]",
    numColor: "text-[#C2410C] dark:text-[#FB923C]",
    titleColor: "text-[#0f172a] dark:text-white",
    descColor: "text-[#334155] dark:text-orange-100/90",
    arrowBg: "bg-white/80 dark:bg-white/10 text-[#C2410C] dark:text-[#FB923C] group-hover:bg-[#c2410c] group-hover:text-white"
  },
  {
    id: "turnkey-solutions",
    title: "Turnkey Solutions",
    number: "05",
    description: "End-to-end delivery of enterprise spaces. From empty land to the final piece of curated furniture.",
    image: "/project_2_1779118501379.png",
    bg: "bg-[#DCEEFE] dark:bg-[#0c4a6e] border border-[#BAE6FD] dark:border-[#0284c7]/40 hover:bg-[#CEE5FC] dark:hover:bg-[#075985]",
    numColor: "text-[#0369A1] dark:text-[#38BDF8]",
    titleColor: "text-[#0f172a] dark:text-white",
    descColor: "text-[#334155] dark:text-sky-100/90",
    arrowBg: "bg-white/80 dark:bg-white/10 text-[#0369A1] dark:text-[#38BDF8] group-hover:bg-[#0284c7] group-hover:text-white"
  }
];

export default function ServicesIndex() {
  const [activeService, setActiveService] = useState(SERVICES[0]);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-clip font-sans pt-24 md:pt-32 pb-20 md:pb-32">
      
      {/* Background Image that crossfades based on hover */}
      <div className="fixed top-0 right-0 w-full md:w-[50vw] h-screen z-0 hidden md:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            {/* Cinematic Gradient Mask */}
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-20"
        >
          <div className="text-[10px] uppercase tracking-[0.3em] text-accent mb-4 sm:mb-6">Expertise</div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif font-light tracking-tighter">Our Services</h1>
        </motion.div>

        <div className="w-full md:w-4/5 flex flex-col gap-4 sm:gap-6">
          {SERVICES.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setActiveService(service)}
              className="block"
            >
              <Link href={`/services/${service.id}`} className="block">
                <div className={`w-full min-h-[auto] sm:min-h-[175px] md:min-h-[190px] p-6 sm:p-8 md:p-10 rounded-2xl ${service.bg} shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 group cursor-pointer`}>
                  <div className="flex gap-4 sm:gap-6 md:gap-12 items-start">
                    <span className={`text-xs font-semibold uppercase tracking-[0.2em] mt-1.5 sm:mt-2 font-mono ${service.numColor}`}>
                      {service.number}
                    </span>
                    <div>
                      <h2 className={`text-2xl sm:text-3xl md:text-4xl font-serif font-light mb-2 sm:mb-3 ${service.titleColor}`}>
                        {service.title}
                      </h2>
                      <p className={`font-light max-w-xl text-sm sm:text-base leading-relaxed ${service.descColor}`}>
                        {service.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-all duration-300 group-hover:scale-110 self-end sm:self-auto ${service.arrowBg}`}>
                    <FiArrowRight size={18} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
