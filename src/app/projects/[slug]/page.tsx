"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, use } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { PROJECTS_DATA } from "@/data/projects";

const fadeUp: any = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

export default function ProjectCaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  // Find project
  const project = PROJECTS_DATA.find(p => p.id === resolvedParams.slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col bg-white text-black">
        <h1 className="text-2xl font-serif mb-4">Project Not Found</h1>
        <Link href="/projects" className="text-[#60A5FA] underline">Return to Projects</Link>
      </div>
    );
  }

  const hasImages = project.allImages && project.allImages.length > 0;

  return (
    <div className="relative min-h-screen bg-[#ffffff] text-black overflow-clip font-sans pb-32">
      
      {/* Navigation back */}
      <div className="fixed top-24 left-6 md:left-12 z-50">
        <Link href="/projects" className="flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium text-black hover:text-[#60A5FA] transition-colors bg-white/80 backdrop-blur-md py-3 px-5 rounded-full border border-black/10 shadow-sm">
          <FiArrowLeft /> Back to Showcase
        </Link>
      </div>

      {/* Hero Banner */}
      <section ref={containerRef} className="relative h-[60vh] md:h-[70vh] w-full flex items-end pb-16 px-6 md:px-16 lg:px-24 overflow-hidden bg-gray-50 border-b border-black/5">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          {hasImages ? (
            <Image
              src={project.allImages[0]}
              alt={project.title}
              fill
              className="object-cover opacity-80"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gray-900 flex flex-col items-center justify-center opacity-10" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
        </motion.div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.2 } }
            }}
          >
            <motion.div variants={fadeUp} className="text-[10px] uppercase tracking-[0.3em] text-[#60A5FA] mb-6 font-medium">
              {project.category}
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-[6rem] font-serif font-light text-black tracking-tight leading-[1] mb-8 max-w-5xl">
              {project.title}
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Project Meta Details */}
      <section className="py-16 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { label: "Location", value: project.location },
              { label: "Scale", value: project.area },
              { label: "Category", value: project.category }
            ].map((meta, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="border-l border-black/10 pl-6"
              >
                <div className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-2">{meta.label}</div>
                <div className="text-xl font-serif text-black">{meta.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-light text-black border-l-2 border-[#60A5FA] pl-6">
              Project <span className="text-gray-400">Gallery</span>
            </h2>
          </motion.div>

          {hasImages ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.allImages.map((img, index) => {
                // Create a varied masonry-like layout
                let spanClass = "col-span-1 h-[40vh]";
                if (index % 5 === 0) {
                  spanClass = "md:col-span-2 lg:col-span-2 h-[60vh]";
                } else if (index % 7 === 0) {
                  spanClass = "md:col-span-1 lg:col-span-3 h-[70vh]";
                }
                
                return (
                  <motion.div 
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeUp}
                    className={`relative w-full ${spanClass} bg-gray-100 overflow-hidden group rounded-xl border border-black/5 shadow-sm hover:shadow-md transition-shadow duration-500`}
                  >
                    <Image 
                      src={img} 
                      alt={`${project.title} - Gallery Image ${index + 1}`} 
                      fill 
                      className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="w-full py-32 flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-2xl bg-gray-50">
              <div className="w-16 h-16 border-t border-l border-[#60A5FA]/40 rounded-tl-xl mb-4 opacity-50" />
              <span className="text-gray-400 uppercase tracking-[0.3em] font-light text-sm z-10">Images Coming Soon</span>
              <div className="w-16 h-16 border-b border-r border-[#60A5FA]/40 rounded-br-xl mt-4 opacity-50" />
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
