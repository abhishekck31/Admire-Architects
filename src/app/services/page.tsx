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
    bg: "bg-[#179FB7] text-white hover:bg-[#138A9E] shadow-md hover:shadow-xl hover:shadow-[#179FB7]/30 border-transparent",
    numColor: "text-white/80 font-bold",
    titleColor: "text-white",
    descColor: "text-white/90",
    arrowBg: "bg-white/20 text-white group-hover:bg-white group-hover:text-[#179FB7]"
  },
  {
    id: "interior-design",
    title: "Interior Design",
    number: "02",
    description: "Precision-crafted internal spaces that enhance enterprise productivity while exuding quiet, profound luxury.",
    image: "/project_2_1779118501379.png",
    bg: "bg-[#008BB0] text-white hover:bg-[#007A9A] shadow-md hover:shadow-xl hover:shadow-[#008BB0]/30 border-transparent",
    numColor: "text-white/80 font-bold",
    titleColor: "text-white",
    descColor: "text-white/90",
    arrowBg: "bg-white/20 text-white group-hover:bg-white group-hover:text-[#008BB0]"
  },
  {
    id: "project-management",
    title: "Project Management",
    number: "03",
    description: "Rigorous oversight and risk mitigation, ensuring multi-million dollar developments are executed flawlessly.",
    image: "/hero_arch_1779118409602.png",
    bg: "bg-[#E09D00] text-white hover:bg-[#C98C00] shadow-md hover:shadow-xl hover:shadow-[#E09D00]/30 border-transparent",
    numColor: "text-white/85 font-bold",
    titleColor: "text-white",
    descColor: "text-white/90",
    arrowBg: "bg-white/20 text-white group-hover:bg-white group-hover:text-[#E09D00]"
  },
  {
    id: "design-build",
    title: "Design Build",
    number: "04",
    description: "A unified workflow bridging the gap between visionary concept and physical construction under one entity.",
    image: "/project_1_1779118457708.png",
    bg: "bg-[#95B00F] text-white hover:bg-[#839B0D] shadow-md hover:shadow-xl hover:shadow-[#95B00F]/30 border-transparent",
    numColor: "text-white/85 font-bold",
    titleColor: "text-white",
    descColor: "text-white/90",
    arrowBg: "bg-white/20 text-white group-hover:bg-white group-hover:text-[#95B00F]"
  },
  {
    id: "turnkey-solutions",
    title: "Turnkey Solutions",
    number: "05",
    description: "End-to-end delivery of enterprise spaces. From empty land to the final piece of curated furniture.",
    image: "/project_2_1779118501379.png",
    bg: "bg-[#F36900] text-white hover:bg-[#D95D00] shadow-md hover:shadow-xl hover:shadow-[#F36900]/30 border-transparent",
    numColor: "text-white/80 font-bold",
    titleColor: "text-white",
    descColor: "text-white/90",
    arrowBg: "bg-white/20 text-white group-hover:bg-white group-hover:text-[#F36900]"
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
