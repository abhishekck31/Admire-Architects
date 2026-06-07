"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiPlus, FiMinus, FiMaximize2, FiMapPin, FiBox, FiSearch, FiFilter } from "react-icons/fi";

const CATEGORIES = ["Design & PMC", "Turnkey Projects", "Latest Projects"];

const RAW_DESIGN_PMC = [
  "DELL, Hyderabad (40,000 SFT)",
  "TARGET Services India, Bangalore (1,50,000 SFT)",
  "CISCO SYSTEMS, Cafeteria, Bannerghatta Road, Bangalore (13,000 SFT)",
  "CORPORATE OFFICE FOR M/S.SCDC, Bangalore (60,000 SFT)",
  "INTEGRATED TOWNSHIP, Mysore (70 Acres)",
  "Integrated Township, Mysore (200 Acres) – With KHB",
  "First source, Millers Road, Bangalore (20,000 SFT)",
  "CGI Information Systems, Electronic City, Bangalore (1,000,000 SFT)",
  "DELL, Domlur (1,10,000 SFT)",
  "Dell, LAB (6000 SFT)",
  "Dell – CV Raman Nagar (55,000 SFT)",
  "IBM India Research Laboratory (4500 SFT)",
  "IBM, Client Briefing Centre, EGL, Bangalore – 7,500 SFT",
  "IBM Sterling Commerce (70,000 SFT)",
  "eMIDS Bangalore (55,000 SFT)",
  "Aruba Networks Bangalore (36,000 SFT)",
  "Synchronoss Technologies Bangalore (40,000 SFT)",
  "Collabera (33,000 SFT)",
  "Symphony Teleca Bangalore (3,00,000 SFT)",
  "Dell DLF Chennai (50,000 SFT)",
  "Dell Ambit Tech Park (50,000 SFT)",
  "IBM D1&D4 Retro Fit Works (25,000 SFT)",
  "IBM Food Court & LAB (20,000 SFT)",
  "Quickplay Chennai (10,000 SFT)"
];

const RAW_TURNKEY = [
  "IBM Collaboration Centre, Bangalore",
  "Genpact India, Pritech Park, Bangalore (50,000 SFT)",
  "Firstsource, Pritech Park, Bangalore (25,000 SFT)",
  "Genpact, DLF Hyderabad (50,000 SFT)",
  "Genpact, Pocharam Hyderabad (30,000 SFT)",
  "InMobi Bangalore (75,000 SFT)",
  "Retro-fit Projects (Project Value Rs.7.5 Crore to 10 Crore)",
  "Quickplay Chennai (10,000 SFT)",
  "Airtel Data Centre Mysore (1000 SFT)",
  "IBM Prince Info City Chennai (30,000 SFT)",
  "UBQ Technologies Bangalore (11,000 SFT)",
  "Thought Focus Bangalore (25,000 SFT)",
  "Concentrix Pune (6500 SFT)",
  "Concentrix Bangalore (7000 SFT)",
  "IBM Food Court Bangalore (15,000 SFT)",
  "Truven Health Analytics Hyderabad (32,000 SFT)",
  "Truven Health Analytics Hyderabad (16,000 SFT)",
  "Concentrix Hyderabad (8000 SFT)",
  "Firstsource Chennai (25,000 SFT)",
  "Cognizant Bangalore (50,000 SFT)",
  "Cognizant Chennai (12,000 SFT)",
  "Schneider Electric Hyderabad (25,000 SFT)",
  "Schneider, Attibele Bangalore (45,000 SFT)",
  "Schneider, Marathahalli Bangalore (50,000 SFT)",
  "IBM Automation Lab (5000 SFT)"
];

const RAW_LATEST = [
  "SJR Union City, Whitefield, Bangalore",
  "Black Hawk, Domlur, Bangalore",
  "Genpact, Surya Park, Electronic City, Bangalore",
  "Genpact, SEZ Bellandur, Bangalore",
  "Blueprint Technologies, Manyata Tech Park, Bangalore",
  "Everest, Manyata Tech Park, Bangalore",
  "ZS Technologies, Manyata Tech Park, Bangalore",
  "Daimler Truck, Whitefield, Bangalore",
  "Mercedes Benz, Whitefield, Bangalore",
  "Nexer, Manyata Tech Park, Bangalore",
  "ParentPay, Manyata Tech Park, Bangalore",
  "Zitro India, Whitefield, Bangalore",
  "Prestige Golfshire Villa, Nandi Hills, Bangalore",
  "Google Millennium, 1 Shobha, Bangalore",
  "Elastic Technologies, Domlur, Bangalore",
  "Maximus, SJR Primeco, Arekere, Bangalore",
  "Resillion, SJR Primeco, Arekere, Bangalore",
  "Rocketlane, Perungudi, Chennai",
  "Brillio, Perungudi, Chennai",
  "Faiser, Perungudi, Chennai",
  "ZS, Perungudi, Chennai",
  "GIP, Common Area, Perungudi, Chennai",
  "HealthMinds @ Yeshwanthpur, Bangalore",
  "GIP 13th Floor, Chennai",
  "Celonis @ Table Space Tower, Bangalore",
  "PWC, Elnath Building, PTP, Bangalore",
  "Table Space Office, Bangalore",
  "Green Space Office @ Yeshwanthpur, Bangalore",
  "Green Space Factory @ Nelamangala, Bangalore"
];

function parseProject(str: string, category: string, index: number) {
  let title = str;
  let area = "Undisclosed";
  let location = "Multiple Locations";
  
  // Extract area if present in parentheses
  const areaMatch = str.match(/\(([^)]+)\)/);
  if (areaMatch) {
    area = areaMatch[1];
    title = title.replace(`(${area})`, '').trim();
  }
  
  // Extract location if present after comma
  const parts = title.split(',');
  if (parts.length > 1) {
    location = parts.pop()?.trim() || "";
    title = parts.join(',').trim();
  } else {
    // If no comma, check if Bangalore/Chennai/Hyderabad is in the title
    if (title.toLowerCase().includes("bangalore")) { location = "Bangalore"; title = title.replace(/bangalore/i, "").trim(); }
    else if (title.toLowerCase().includes("chennai")) { location = "Chennai"; title = title.replace(/chennai/i, "").trim(); }
    else if (title.toLowerCase().includes("hyderabad")) { location = "Hyderabad"; title = title.replace(/hyderabad/i, "").trim(); }
  }
  
  // Clean up stray hyphens or commas at the end
  title = title.replace(/[-,\s]+$/, '');
  
  if (location === "Multiple Locations" && title === "Retro-fit Projects") {
    area = "Rs.7.5 Crore to 10 Crore";
  }

  const images = ["/project_1_1779118457708.png", "/project_2_1779118501379.png", "/hero_arch_1779118409602.png"];

  return {
    id: `${category.toLowerCase().replace(/[^a-z]/g, '')}-${index}`,
    title,
    location,
    area,
    category,
    image: images[index % images.length],
    description: `Enterprise-scale corporate architecture and interior project located in ${location}. Delivered by Admire Architects Pvt Ltd focusing on high-efficiency workspace design and structural precision.`
  }
}

const PROJECTS_DATA = [
  ...RAW_DESIGN_PMC.map((p, i) => parseProject(p, "Design & PMC", i)),
  ...RAW_TURNKEY.map((p, i) => parseProject(p, "Turnkey Projects", i)),
  ...RAW_LATEST.map((p, i) => parseProject(p, "Latest Projects", i)),
];

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

  const [activeProject, setActiveProject] = useState(PROJECTS_DATA[0]);
  const [expandedId, setExpandedId] = useState<string | null>(PROJECTS_DATA[0].id);

  // Handle Category Change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    // Find first project in new filtered list (wait for re-render, so calculate it here)
    const firstProject = PROJECTS_DATA.find(p => p.category === category);
    if (firstProject) {
      setActiveProject(firstProject);
      setExpandedId(firstProject.id);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Project Click
  const handleProjectClick = (project: typeof PROJECTS_DATA[0]) => {
    if (expandedId === project.id) {
      setExpandedId(null);
      return; 
    }
    setExpandedId(project.id);
    setActiveProject(project);
  };

  return (
    <div className="min-h-screen bg-[#070b11] text-[#fafaf9] font-sans flex flex-col md:flex-row relative">
      
      {/* LEFT SIDE - VISUAL SHOWCASE (Sticky) */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen md:sticky top-0 overflow-hidden relative border-r border-white/5 order-1 md:order-none z-10">
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
            <div className="absolute inset-0 bg-gradient-to-t from-[#070b11]/90 via-[#070b11]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070b11]/50 via-transparent to-transparent" />
            
            {/* Premium Corner Frame */}
            <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-[#b89b72]/40" />
            <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-[#b89b72]/40" />
            
            {/* Cinematic Info Overlay */}
            <div className="absolute bottom-10 left-10 md:bottom-16 md:left-16 max-w-lg z-20">
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
                className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white leading-[1.1] mb-6"
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
                  <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500 mb-1">Location</span>
                  <span className="text-sm font-light text-white">{activeProject.location}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500 mb-1">Scale</span>
                  <span className="text-sm font-light text-white">{activeProject.area}</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* View Details Floating Button */}
        <div className="absolute top-8 right-8 md:top-auto md:bottom-16 md:right-16 z-30">
          <Link href={`/projects/${activeProject.id}`} className="group relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/20 backdrop-blur-md border border-white/20 hover:bg-[#b89b72] hover:border-[#b89b72] transition-all duration-700 overflow-hidden cursor-pointer">
            <FiMaximize2 className="text-white group-hover:scale-110 transition-transform duration-500 relative z-10" />
          </Link>
        </div>
      </div>

      {/* RIGHT SIDE - INTERACTIVE LIST */}
      <div className="w-full md:w-1/2 min-h-screen pt-16 md:pt-32 pb-40 px-6 md:px-12 lg:px-20 order-2 md:order-none">
        
        {/* Header & Search */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-serif font-light tracking-tight text-white mb-6">
            Enterprise <span className="italic text-[#b89b72]">Showcase</span>
          </h1>
          
          <div className="relative mb-8">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search by project name, client, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-6 text-white text-sm font-light focus:outline-none focus:border-[#b89b72] transition-colors"
            />
          </div>
        </div>

        {/* Category Filters (Sticky) */}
        <div className="flex flex-wrap gap-3 mb-10 border-b border-white/10 pb-6 sticky top-0 bg-[#070b11]/90 backdrop-blur-xl z-30 pt-6 -mx-2 px-2">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-medium px-5 py-3 border transition-all duration-500 rounded-full ${
                activeCategory === category 
                  ? "bg-[#b89b72] border-[#b89b72] text-black" 
                  : "bg-transparent border-white/20 text-gray-400 hover:border-white/60 hover:text-white"
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
            
            {filteredProjects.map((project, i) => {
              const isExpanded = expandedId === project.id;
              
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.6, delay: i * 0.02 }}
                  key={project.id}
                  className={`border border-white/5 overflow-hidden transition-colors duration-500 ${isExpanded ? "bg-[#0a0f16]" : "bg-transparent hover:border-white/20"}`}
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => handleProjectClick(project)}
                    className="w-full px-6 py-6 md:py-8 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-6">
                      <div className={`text-[10px] font-serif italic transition-colors duration-500 ${isExpanded ? "text-[#b89b72]" : "text-gray-600"}`}>
                        {(i + 1).toString().padStart(2, '0')}
                      </div>
                      <h3 className={`text-xl md:text-2xl font-serif font-light text-left transition-colors duration-500 ${isExpanded ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
                        {project.title}
                      </h3>
                    </div>
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 flex-shrink-0 ${isExpanded ? "border-[#b89b72] bg-[#b89b72]/10 text-[#b89b72]" : "border-white/10 text-gray-500 group-hover:border-white/30 group-hover:text-white"}`}>
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
                        <div className="pt-6 border-t border-white/5">
                          <p className="text-gray-400 font-light leading-relaxed mb-8 text-sm md:text-base">
                            {project.description}
                          </p>
                          
                          {/* Project Meta Grid */}
                          <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
                            <div>
                              <div className="flex items-center gap-2 text-[#b89b72] mb-1">
                                <FiMapPin size={12} />
                                <span className="text-[9px] uppercase tracking-[0.2em] font-medium">Location</span>
                              </div>
                              <div className="text-sm font-light text-white">{project.location}</div>
                            </div>
                            <div>
                              <div className="flex items-center gap-2 text-[#b89b72] mb-1">
                                <FiBox size={12} />
                                <span className="text-[9px] uppercase tracking-[0.2em] font-medium">Scale</span>
                              </div>
                              <div className="text-sm font-light text-white">{project.area}</div>
                            </div>
                          </div>

                          {/* Action Button */}
                          <Link href={`/projects/${project.id}`} className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] border-b border-[#b89b72] pb-1 text-white hover:text-[#b89b72] transition-colors duration-500 group">
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
