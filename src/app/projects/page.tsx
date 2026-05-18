"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const PROJECTS = [
  {
    id: "zenith-tower",
    title: "The Zenith Tower",
    category: "Commercial",
    location: "Frankfurt, Germany",
    year: "2025",
    client: "Nexus Finance",
    image: "/project_1_1779118457708.png",
    height: "h-[80vh]",
  },
  {
    id: "aura-residences",
    title: "Aura Residences",
    category: "Residential",
    location: "Tokyo, Japan",
    year: "2024",
    client: "Omni Corp",
    image: "/project_2_1779118501379.png",
    height: "h-[60vh]",
  },
  {
    id: "lumina-museum",
    title: "Lumina Museum of Art",
    category: "Public Sector",
    location: "Oslo, Norway",
    year: "2026",
    client: "Ministry of Culture",
    image: "/project_1_1779118457708.png",
    height: "h-[70vh]",
  },
  {
    id: "synthesis-hq",
    title: "Synthesis Global HQ",
    category: "Commercial",
    location: "New York, USA",
    year: "2023",
    client: "Synthesis Global",
    image: "/project_2_1779118501379.png",
    height: "h-[90vh]",
  },
];

const CATEGORIES = ["All", "Commercial", "Residential", "Public Sector", "Hospitality"];

export default function ProjectsIndex() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen pt-40 px-6 md:px-16 lg:px-24 bg-background text-foreground pb-40">
      
      {/* Header & Filtering */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-32 border-b border-border pb-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-6xl md:text-8xl font-serif font-light tracking-tight">Selected Works</h1>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-wrap gap-8 uppercase tracking-[0.2em] text-[10px] md:text-xs text-muted-foreground"
        >
          {CATEGORIES.map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`transition-colors duration-500 hover:text-primary ${activeCategory === cat ? "text-primary border-b border-primary pb-1" : ""}`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Masonry-Style Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.4 } }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
              key={project.id}
              className={`group cursor-pointer ${index % 2 !== 0 ? "md:mt-48" : ""}`}
            >
              <Link href={`/projects/${project.id}`} className="block">
                <div className={`relative ${project.height} w-full overflow-hidden mb-8 bg-secondary`}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full p-6 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-700">
                      <FiArrowRight size={24} />
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div>
                    <h3 className="text-3xl font-serif font-light mb-3 group-hover:text-accent transition-colors duration-500">{project.title}</h3>
                    <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      <span>{project.category}</span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span>{project.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-foreground mb-1">{project.year}</div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{project.client}</div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

    </div>
  );
}
