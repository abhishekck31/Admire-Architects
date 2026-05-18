"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import { FiArrowRight, FiPlay, FiMousePointer } from "react-icons/fi";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth out the mouse values
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize between -1 and 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x * 15); // max pixel shift
      mouseY.set(y * 15);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#070b11]"
    >
      {/* Background Image Container with both Scroll and Mouse Parallax */}
      <motion.div 
        style={{ 
          y: bgY, 
          x: smoothX,
          opacity 
        }} 
        className="absolute inset-[-5%] z-0"
      >
        <motion.div style={{ y: smoothY }} className="relative w-full h-full">
          <Image
            src="/hero_arch_1779118409602.png"
            alt="Modern Enterprise Architecture"
            fill
            className="object-cover scale-105"
            priority
          />
          {/* Heavy cinematic gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b11] via-[#070b11]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070b11] via-transparent to-[#070b11]/30" />
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        style={{ y: textY, opacity }} 
        className="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-16 lg:px-24 flex flex-col justify-end h-full pb-32"
      >
        <div className="flex flex-col md:flex-row justify-between items-end gap-12">
          
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
              animate={{ opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-serif font-light text-[#fafaf9] tracking-tighter leading-[1.05] mb-8">
                Modern Workspaces. <br />
                <span className="italic text-[#b89b72]">Timeless Execution.</span>
              </h1>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-gray-300 font-light tracking-wide max-w-2xl"
            >
              We shape the physical environment of global enterprises through relentless engineering, absolute minimalism, and visionary design.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-col gap-6"
          >
            <button className="group flex items-center justify-between gap-8 border border-white/20 bg-white/5 backdrop-blur-md px-8 py-5 hover:bg-white hover:text-black transition-all duration-700 w-64">
              <span className="uppercase tracking-[0.2em] text-xs font-medium">Explore Projects</span>
              <FiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group flex items-center justify-between gap-8 border border-white/20 bg-white/5 backdrop-blur-md px-8 py-5 hover:bg-[#b89b72] hover:border-[#b89b72] hover:text-black transition-all duration-700 w-64">
              <span className="uppercase tracking-[0.2em] text-xs font-medium">Watch Showreel</span>
              <FiPlay className="transform transition-transform" />
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Glassmorphism Element */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-1/4 right-10 md:right-32 z-20"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]) }}
      >
        <div className="glass p-6 border-l border-t border-white/20 shadow-2xl backdrop-blur-xl bg-white/5 max-w-[200px]">
          <div className="text-4xl font-serif text-white mb-2">150<span className="text-[#b89b72]">+</span></div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-gray-400 leading-relaxed">
            Enterprise HQs <br /> Delivered Globally
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-gray-400">Scroll</span>
        <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/2 bg-white"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>

    </section>
  );
}
