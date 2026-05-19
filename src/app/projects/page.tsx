"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiPlus, FiMinus, FiMaximize2, FiMapPin, FiBox, FiCalendar } from "react-icons/fi";

const CATEGORIES = ["Design & PMC", "Turnkey Projects", "Latest Projects"];

const PROJECTS_DATA = [
  // DESIGN & PMC
  { id: "dell-hyd", title: "DELL", category: "Design & PMC", client: "DELL Corp", location: "Hyderabad", area: "450,000 SFT", year: "2023", description: "State-of-the-art global delivery center featuring collaborative workspaces and advanced telepresence rooms designed for hybrid agility.", image: "/project_1_1779118457708.png" },
  { id: "target-blr", title: "TARGET Services India", category: "Design & PMC", client: "Target Corp", location: "Bangalore", area: "320,000 SFT", year: "2022", description: "Modern retail technology hub designed for agile development teams, reflecting a global standard in workspace ergonomics.", image: "/project_2_1779118501379.png" },
  { id: "cisco", title: "CISCO Systems", category: "Design & PMC", client: "CISCO", location: "Bangalore", area: "800,000 SFT", year: "2024", description: "Massive campus integration featuring smart building technologies, IoT deployment, and highly sustainable infrastructure.", image: "/hero_arch_1779118409602.png" },
  { id: "ibm-research", title: "IBM India Research Lab", category: "Design & PMC", client: "IBM", location: "Bangalore", area: "150,000 SFT", year: "2021", description: "Advanced research facility with specialized thermal and acoustic isolation zones for intensive hardware testing.", image: "/project_1_1779118457708.png" },
  { id: "aruba", title: "Aruba Networks", category: "Design & PMC", client: "HPE", location: "Chennai", area: "200,000 SFT", year: "2023", description: "High-tech networking R&D center with extensive lab environments and high-density server staging areas.", image: "/project_2_1779118501379.png" },
  
  // TURNKEY PROJECTS
  { id: "ibm-collab", title: "IBM Collaboration Centre", category: "Turnkey Projects", client: "IBM", location: "Bangalore", area: "120,000 SFT", year: "2024", description: "Executive briefing center designed for high-level client engagements, featuring immersive tech demos and luxury boardrooms.", image: "/project_2_1779118501379.png" },
  { id: "genpact", title: "Genpact India", category: "Turnkey Projects", client: "Genpact", location: "Gurugram", area: "600,000 SFT", year: "2023", description: "End-to-end execution of a massive business process outsourcing facility designed for 24/7 operational resilience.", image: "/hero_arch_1779118409602.png" },
  { id: "firstsource", title: "Firstsource", category: "Turnkey Projects", client: "Firstsource", location: "Mumbai", area: "250,000 SFT", year: "2022", description: "Fast-tracked turnkey delivery of a modern ITES workspace optimized for maximal density without compromising comfort.", image: "/project_1_1779118457708.png" },
  { id: "airtel-dc", title: "Airtel Data Centre", category: "Turnkey Projects", client: "Bharti Airtel", location: "Mysore", area: "100,000 SFT", year: "2024", description: "Mission-critical data center with Tier 4 compliance, executing complex HVAC and power redundancy systems.", image: "/project_2_1779118501379.png" },
  
  // LATEST PROJECTS
  { id: "black-hawk", title: "Black Hawk", category: "Latest Projects", client: "Black Hawk Security", location: "Bangalore", area: "80,000 SFT", year: "2025", description: "Premium corporate office with aggressive geometric styling and highly secure access-controlled zones.", image: "/hero_arch_1779118409602.png" },
  { id: "genpact-surya", title: "Genpact Surya Park", category: "Latest Projects", client: "Genpact", location: "Bangalore", area: "350,000 SFT", year: "2025", description: "Next-generation sustainable campus in Electronics City pushing the boundaries of biophilic design.", image: "/project_1_1779118457708.png" },
  { id: "mercedes", title: "Mercedes Benz R&D", category: "Latest Projects", client: "Daimler AG", location: "Whitefield", area: "400,000 SFT", year: "2024", description: "Luxurious R&D facility reflecting the brand's premium automotive design language, featuring sleek lines and industrial-chic labs.", image: "/project_2_1779118501379.png" },
  { id: "google", title: "Google Millennium", category: "Latest Projects", client: "Alphabet", location: "Hyderabad", area: "1.2M SFT", year: "2026", description: "One of the largest corporate campuses in Asia, featuring LEED Platinum certification and unprecedented employee amenities.", image: "/hero_arch_1779118409602.png" },
];

export default function ProjectsShowcase() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [activeProject, setActiveProject] = useState(PROJECTS_DATA[0]);
  const [expandedId, setExpandedId] = useState<string | null>(PROJECTS_DATA[0].id);

  // Filter projects based on category
  const filteredProjects = PROJECTS_DATA.filter(p => p.category === activeCategory);

  // Handle Category Change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    const firstProject = PROJECTS_DATA.find(p => p.category === category);
    if (firstProject) {
      setActiveProject(firstProject);
      setExpandedId(firstProject.id);
    }
    // Scroll to top of the list slightly gracefully
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Project Click
  const handleProjectClick = (project: typeof PROJECTS_DATA[0]) => {
    if (expandedId === project.id) {
      // Optional: allow collapsing, but it's better to always keep one open
      return; 
    }
    setExpandedId(project.id);
    setActiveProject(project);
  };

  return (
    <div className="min-h-screen bg-[#070b11] text-[#fafaf9] font-sans flex flex-col md:flex-row">
      
      {/* LEFT SIDE - VISUAL SHOWCASE (Sticky) */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen md:sticky top-0 overflow-hidden relative border-r border-white/5">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={activeProject.image}
              alt={activeProject.title}
              fill
              className="object-cover"
              priority
            />
            {/* Architectural Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070b11]/80 via-[#070b11]/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070b11]/60 via-transparent to-transparent" />
            
            {/* Premium Corner Frame */}
            <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-[#b89b72]/40" />
            <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-[#b89b72]/40" />
            
            {/* Cinematic Info Overlay */}
            <div className="absolute bottom-10 left-10 md:bottom-16 md:left-16 max-w-md">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="flex items-center gap-4 mb-4"
              >
                <div className="w-8 h-[1px] bg-[#b89b72]" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#b89b72] font-medium">{activeProject.category}</span>
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-4xl md:text-6xl font-serif font-light text-white leading-tight"
              >
                {activeProject.title}
              </motion.h2>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* View Details Floating Button */}
        <div className="absolute top-32 right-10 md:top-auto md:bottom-16 md:right-16 z-20 hidden md:block">
          <Link href={`/projects/${activeProject.id}`} className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-white/5 backdrop-blur-md border border-white/20 hover:bg-[#b89b72] hover:border-[#b89b72] transition-all duration-700 overflow-hidden cursor-none md:cursor-pointer">
            <FiMaximize2 className="text-white group-hover:scale-110 transition-transform duration-500 relative z-10" />
          </Link>
        </div>
      </div>

      {/* RIGHT SIDE - INTERACTIVE LIST */}
      <div className="w-full md:w-1/2 min-h-screen pt-32 pb-40 px-6 md:px-16 lg:px-24">
        
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-serif font-light tracking-tight text-white mb-6">
            Selected <span className="italic text-[#b89b72]">Works</span>
          </h1>
          <p className="text-gray-400 font-light text-lg max-w-md leading-relaxed">
            A curated portfolio of enterprise environments engineered for global industry leaders.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-4 mb-16 border-b border-white/10 pb-6 sticky top-0 bg-[#070b11]/90 backdrop-blur-md z-30 pt-6 -mx-2 px-2">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium px-6 py-3 border transition-all duration-500 rounded-full ${
                activeCategory === category 
                  ? "bg-[#b89b72] border-[#b89b72] text-black" 
                  : "bg-transparent border-white/20 text-gray-400 hover:border-white/60 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Project Accordion List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => {
              const isExpanded = expandedId === project.id;
              
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  key={project.id}
                  className={`border border-white/10 overflow-hidden transition-colors duration-500 ${isExpanded ? "bg-[#0a0f16]" : "bg-transparent hover:border-white/30"}`}
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => handleProjectClick(project)}
                    className="w-full px-8 py-8 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-8">
                      <div className={`text-xs font-serif italic transition-colors duration-500 ${isExpanded ? "text-[#b89b72]" : "text-gray-600"}`}>
                        {(i + 1).toString().padStart(2, '0')}
                      </div>
                      <h3 className={`text-2xl md:text-3xl font-serif font-light text-left transition-colors duration-500 ${isExpanded ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
                        {project.title}
                      </h3>
                    </div>
                    <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 ${isExpanded ? "border-[#b89b72] bg-[#b89b72]/10 text-[#b89b72]" : "border-white/10 text-gray-500 group-hover:border-white/30 group-hover:text-white"}`}>
                      {isExpanded ? <FiMinus /> : <FiPlus />}
                    </div>
                  </button>

                  {/* Accordion Body */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="px-8 pb-10"
                      >
                        <div className="pt-6 border-t border-white/5">
                          <p className="text-gray-300 font-light leading-relaxed mb-10 text-lg">
                            {project.description}
                          </p>
                          
                          {/* Project Meta Grid */}
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-6 mb-10">
                            <div>
                              <div className="flex items-center gap-2 text-[#b89b72] mb-2">
                                <FiMapPin size={14} />
                                <span className="text-[9px] uppercase tracking-[0.2em] font-medium">Location</span>
                              </div>
                              <div className="text-sm font-light text-white">{project.location}</div>
                            </div>
                            <div>
                              <div className="flex items-center gap-2 text-[#b89b72] mb-2">
                                <FiBox size={14} />
                                <span className="text-[9px] uppercase tracking-[0.2em] font-medium">Scale</span>
                              </div>
                              <div className="text-sm font-light text-white">{project.area}</div>
                            </div>
                            <div>
                              <div className="flex items-center gap-2 text-[#b89b72] mb-2">
                                <FiCalendar size={14} />
                                <span className="text-[9px] uppercase tracking-[0.2em] font-medium">Year</span>
                              </div>
                              <div className="text-sm font-light text-white">{project.year}</div>
                            </div>
                          </div>

                          {/* Action Button */}
                          <Link href={`/projects/${project.id}`} className="inline-flex items-center gap-4 text-xs uppercase tracking-[0.2em] border-b border-[#b89b72] pb-2 text-white hover:text-[#b89b72] transition-colors duration-500 group">
                            Explore Case Study <FiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
