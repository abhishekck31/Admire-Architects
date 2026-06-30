"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiPlus, FiMinus, FiMaximize2, FiMapPin, FiBox, FiSearch, FiFilter, FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { CATEGORIES, PROJECTS_DATA } from "@/data/projects";

export default function ProjectsShowcase() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter logic
  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter(p => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const matchesSearch = 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const projectsWithImages = filteredProjects.filter(p => p.image);
  const projectsWithoutImages = filteredProjects.filter(p => !p.image);

  // Find initial project with image
  const initialDefaultProject = PROJECTS_DATA.find(p => p.category === CATEGORIES[0] && p.image) || PROJECTS_DATA[0];

  const [activeProject, setActiveProject] = useState(initialDefaultProject);
  const [expandedId, setExpandedId] = useState<string | null>(initialDefaultProject.id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Handle Category Change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    // Find first project in new category that has an image, fallback to any project in category
    const firstProject = PROJECTS_DATA.find(p => p.category === category && p.image) || PROJECTS_DATA.find(p => p.category === category);
    if (firstProject) {
      setActiveProject(firstProject);
      setExpandedId(firstProject.id);
      setCurrentImageIndex(0);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Project Click
  const handleProjectClick = (project: typeof PROJECTS_DATA[0]) => {
    if (expandedId === project.id) {
      setExpandedId(null);
    } else {
      setExpandedId(project.id);
      setActiveProject(project);
      setCurrentImageIndex(0);
    }
  };

  // Auto carousel effect
  useEffect(() => {
    if (!activeProject?.allImages || activeProject.allImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % activeProject.allImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [activeProject]);

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#000000] font-sans flex flex-col md:flex-row relative pt-24 md:pt-0">
      
      {/* LEFT SIDE - VISUAL SHOWCASE (Sticky) */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen md:sticky top-0 overflow-hidden relative border-r border-black/5 order-1 md:order-none z-10">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            {activeProject.allImages && activeProject.allImages.length > 0 ? (
              <div className="absolute inset-0 group/carousel">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={activeProject.allImages[currentImageIndex]}
                      alt={activeProject.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Carousel Controls */}
                {activeProject.allImages.length > 1 && (
                  <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-4 z-30 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setCurrentImageIndex(prev => prev === 0 ? activeProject.allImages.length - 1 : prev - 1);
                      }}
                      className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-[#60A5FA] transition-colors"
                    >
                      <FiChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setCurrentImageIndex(prev => prev === activeProject.allImages.length - 1 ? 0 : prev + 1);
                      }}
                      className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-[#60A5FA] transition-colors"
                    >
                      <FiChevronRight size={24} />
                    </button>
                  </div>
                )}
                {/* Dots indicator */}
                {activeProject.allImages.length > 1 && (
                  <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-30">
                    {activeProject.allImages.map((_, idx) => (
                      <div 
                        key={idx}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'bg-[#60A5FA] w-4' : 'bg-white/50'}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="absolute inset-0 bg-gray-900 flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-t border-l border-[#60A5FA]/40 rounded-tl-xl mb-4 opacity-50" />
                <span className="text-gray-400 uppercase tracking-[0.3em] font-light text-sm z-10">Images Coming Soon</span>
                <div className="w-16 h-16 border-b border-r border-[#60A5FA]/40 rounded-br-xl mt-4 opacity-50" />
              </div>
            )}
            {/* Architectural Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
            
            {/* Premium Corner Frame */}
            <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-[#60A5FA]/40" />
            <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-[#60A5FA]/40" />
            
            {/* Cinematic Info Overlay */}
            <div className="absolute bottom-10 left-10 md:bottom-16 md:left-16 max-w-lg z-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="flex items-center gap-4 mb-4"
              >
                <div className="w-8 h-[1px] bg-[#60A5FA]" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#60A5FA] font-medium">{activeProject.category}</span>
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white leading-[1.1] mb-6 drop-shadow-md"
              >
                {activeProject.title}
              </motion.h2>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-wrap gap-6"
              >
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-gray-300 mb-1">Location</span>
                  <span className="text-sm font-light text-white drop-shadow-sm">{activeProject.location}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-gray-300 mb-1">Scale</span>
                  <span className="text-sm font-light text-white drop-shadow-sm">{activeProject.area}</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* View Details Floating Button */}
        <div className="absolute top-8 right-8 md:top-auto md:bottom-16 md:right-16 z-30">
          <Link href={`/projects/${activeProject.id}`} className="group relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-md border border-black/20 hover:bg-[#60A5FA] hover:border-[#60A5FA] transition-all duration-700 overflow-hidden cursor-pointer">
            <FiMaximize2 className="text-black group-hover:scale-110 transition-transform duration-500 relative z-10" />
          </Link>
        </div>
      </div>

      {/* RIGHT SIDE - INTERACTIVE LIST */}
      <div className="w-full md:w-1/2 min-h-screen pt-16 md:pt-32 pb-40 px-6 md:px-12 lg:px-20 order-2 md:order-none">
        
        {/* Header & Search */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-serif font-light tracking-tight text-black mb-6">
            Enterprise <span className="italic text-[#60A5FA]">Showcase</span>
          </h1>
          
          <div className="relative mb-8">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search by project name, client, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/5 border border-black/10 rounded-full py-4 pl-12 pr-6 text-black text-sm font-light focus:outline-none focus:border-[#60A5FA] transition-colors"
            />
          </div>
        </div>

        {/* Category Filters (Sticky) */}
        <div className="flex flex-wrap gap-3 mb-10 border-b border-black/10 pb-6 sticky top-0 bg-[#ffffff]/90 backdrop-blur-xl z-30 pt-6 -mx-2 px-2">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-medium px-5 py-3 border transition-all duration-500 rounded-full ${
                activeCategory === category 
                  ? "bg-[#60A5FA] border-[#60A5FA] text-white" 
                  : "bg-transparent border-black/20 text-gray-600 hover:border-black/60 hover:text-black"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Project Results Stats */}
        <div className="mb-8 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-gray-500">
          <span>{filteredProjects.length} Projects Found</span>
          <span className="flex items-center gap-2"><FiFilter /> {activeCategory}</span>
        </div>

        {/* Project Accordion List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredProjects.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 text-gray-500 font-light">
                No projects found matching your criteria.
              </motion.div>
            )}
            
            {projectsWithImages.map((project, i) => {
              const isExpanded = expandedId === project.id;
              
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.6, delay: i * 0.02 }}
                  key={project.id}
                  className={`border border-black/5 overflow-hidden transition-colors duration-500 ${isExpanded ? "bg-[#f8f9fa]" : "bg-transparent hover:border-black/20"}`}
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => handleProjectClick(project)}
                    className="w-full px-6 py-6 md:py-8 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-6">
                      <div className={`text-[10px] font-serif italic transition-colors duration-500 ${isExpanded ? "text-[#60A5FA]" : "text-gray-600"}`}>
                        {(i + 1).toString().padStart(2, '0')}
                      </div>
                      <h3 className={`text-xl md:text-2xl font-serif font-light text-left transition-colors duration-500 ${isExpanded ? "text-black" : "text-gray-600 group-hover:text-black"}`}>
                        {project.title}
                      </h3>
                    </div>
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 flex-shrink-0 ${isExpanded ? "border-[#60A5FA] bg-[#60A5FA]/10 text-[#60A5FA]" : "border-black/10 text-gray-500 group-hover:border-black/30 group-hover:text-black"}`}>
                      {isExpanded ? <FiMinus size={12} /> : <FiPlus size={12} />}
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
                        className="px-6 pb-8"
                      >
                        <div className="pt-6 border-t border-black/5">
                          <p className="text-gray-600 font-light leading-relaxed mb-8 text-sm md:text-base">
                            {project.description}
                          </p>
                          
                          {/* Project Meta Grid */}
                          <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
                            <div>
                              <div className="flex items-center gap-2 text-[#60A5FA] mb-1">
                                <FiMapPin size={12} />
                                <span className="text-[9px] uppercase tracking-[0.2em] font-medium">Location</span>
                              </div>
                              <div className="text-sm font-light text-black">{project.location}</div>
                            </div>
                            <div>
                              <div className="flex items-center gap-2 text-[#60A5FA] mb-1">
                                <FiBox size={12} />
                                <span className="text-[9px] uppercase tracking-[0.2em] font-medium">Scale</span>
                              </div>
                              <div className="text-sm font-light text-black">{project.area}</div>
                            </div>
                          </div>

                          {/* Action Button */}
                          <Link href={`/projects/${project.id}`} className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] border-b border-[#60A5FA] pb-1 text-black hover:text-[#60A5FA] transition-colors duration-500 group">
                            View full project <FiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
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

        {/* Other Projects List */}
        {projectsWithoutImages.length > 0 && (
          <div className="mt-20 pt-12 border-t border-black/10">
            <h2 className="text-2xl font-serif font-light mb-8 text-black">Other Projects</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projectsWithoutImages.map((project) => (
                <li key={project.id} className="text-sm font-light text-gray-600 flex items-start gap-3">
                  <span className="w-1.5 h-1.5 mt-1.5 flex-shrink-0 rounded-full bg-[#60A5FA]/60"></span>
                  <span className="leading-relaxed">{project.title}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>

    </div>
  );
}
