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
    image: "/project_1_1779118457708.png"
  },
  {
    id: "interior-design",
    title: "Interior Design",
    number: "02",
    description: "Precision-crafted internal spaces that enhance enterprise productivity while exuding quiet, profound luxury.",
    image: "/project_2_1779118501379.png"
  },
  {
    id: "project-management",
    title: "Project Management",
    number: "03",
    description: "Rigorous oversight and risk mitigation, ensuring multi-million dollar developments are executed flawlessly.",
    image: "/hero_arch_1779118409602.png"
  },
  {
    id: "design-build",
    title: "Design Build",
    number: "04",
    description: "A unified workflow bridging the gap between visionary concept and physical construction under one entity.",
    image: "/project_1_1779118457708.png"
  },
  {
    id: "turnkey-solutions",
    title: "Turnkey Solutions",
    number: "05",
    description: "End-to-end delivery of enterprise spaces. From empty land to the final piece of curated furniture.",
    image: "/project_2_1779118501379.png"
  }
];

export default function ServicesIndex() {
  const [activeService, setActiveService] = useState(SERVICES[0]);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-clip font-sans pt-32 pb-32">
      
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
            <Image
              src={activeService.image}
              alt={activeService.title}
              fill
              className="object-cover grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
              priority
            />
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
          className="mb-24"
        >
          <div className="text-[10px] uppercase tracking-[0.3em] text-accent mb-6">Expertise</div>
          <h1 className="text-5xl md:text-8xl font-serif font-light tracking-tighter">Our Services</h1>
        </motion.div>

        <div className="w-full md:w-3/5 flex flex-col gap-0 border-t border-border">
          {SERVICES.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setActiveService(service)}
              className="group border-b border-border py-12 cursor-pointer"
            >
              <Link href={`/services/${service.id}`} className="block">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex gap-8 md:gap-16 items-start">
                    <span className="text-xs font-medium text-muted-foreground mt-3 group-hover:text-accent transition-colors duration-500">
                      {service.number}
                    </span>
                    <div>
                      <h2 className="text-4xl md:text-5xl font-serif font-light mb-4 group-hover:translate-x-4 transition-transform duration-500">
                        {service.title}
                      </h2>
                      <p className="text-muted-foreground font-light max-w-sm group-hover:translate-x-4 transition-transform duration-500 delay-75">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="hidden md:flex w-16 h-16 rounded-full border border-border items-center justify-center group-hover:bg-foreground group-hover:text-background transform -translate-x-10 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                    <FiArrowRight size={24} />
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
