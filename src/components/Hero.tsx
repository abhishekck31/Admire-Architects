"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FiArrowRight, FiPlay, FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";

const heroImages = [
  "/heroSectionImgs/CEOofficeHero.png",
  "/heroSectionImgs/CorporateMeetingHero.png",
  "/heroSectionImgs/LoungeHero.png",
  "/heroSectionImgs/OpenPlanHero.png"
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [showVideo, setShowVideo] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Image slider effect - changes every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Scroll Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full bg-white p-3 pt-20 md:p-5 md:pt-[5.5rem] flex flex-col"
    >
      {/* Capsule Container for Hero Images */}
      <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl bg-black">
        
        {/* Background Image Slider */}
        <motion.div 
          style={{ y: bgY, opacity }} 
          className="absolute inset-0 z-0 bg-black"
        >
          {heroImages.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ 
                opacity: index === currentImageIndex ? 1 : 0,
                scale: index === currentImageIndex ? 1 : 1.05
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={src}
                alt={`Modern Enterprise Architecture Space ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </motion.div>
          ))}
          {/* Subtle dark gradient overlays to ensure text readability without washing out the image */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60 z-10 pointer-events-none" />
        </motion.div>

        {/* Main Content inside the capsule */}
        <motion.div 
          style={{ opacity }} 
          className="relative z-20 w-full max-w-[90rem] mx-auto px-6 md:px-16 lg:px-24 flex flex-col justify-center h-full"
        >
          <div className="max-w-3xl text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-3xl md:text-5xl lg:text-[4.5rem] font-serif font-light tracking-tighter leading-[1.05] mb-5 drop-shadow-lg">
                Modern Workspaces. <br />
                <span className="italic text-[#60A5FA]">Timeless Execution.</span>
              </h1>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm md:text-base text-gray-200 font-light tracking-wide max-w-xl mb-8 drop-shadow-md"
            >
              We shape the physical environment of global enterprises through relentless engineering, absolute minimalism, and visionary design.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4"
            >
              <button 
                onClick={() => router.push('/projects')}
                className="group flex items-center gap-3 bg-white text-black px-6 py-3 hover:bg-[#60A5FA] hover:text-white transition-colors duration-500 rounded-full shadow-lg"
              >
                <span className="uppercase tracking-[0.2em] text-[9px] md:text-[10px] font-medium">Explore Projects</span>
                <FiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => setShowVideo(true)}
                className="group flex items-center gap-3 border border-white/40 bg-black/30 backdrop-blur-sm text-white px-6 py-3 hover:border-white transition-colors duration-500 rounded-full"
              >
                <span className="uppercase tracking-[0.2em] text-[9px] md:text-[10px] font-medium">Watch Showreel</span>
                <FiPlay className="transform group-hover:scale-110 transition-transform" />
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats/Metrics Element - Reduced size and minimalistic */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-12 right-6 md:right-16 lg:right-24 z-20 flex-col gap-6 text-right hidden md:flex text-white"
        >
          <div>
            <div className="text-2xl md:text-3xl font-serif mb-1 drop-shadow-lg">150<span className="text-[#60A5FA]">+</span></div>
            <div className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-gray-300">Enterprise HQs</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-serif mb-1 drop-shadow-lg">20<span className="text-[#60A5FA]">+</span></div>
            <div className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-gray-300">Years Experience</div>
          </div>
        </motion.div>

      </div> {/* End Capsule Container */}

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md"
          >
            <button 
              onClick={() => setShowVideo(false)}
              className="absolute top-10 right-10 text-white hover:text-[#60A5FA] transition-colors p-2"
            >
              <FiX className="w-8 h-8" />
            </button>
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ delay: 0.1 }}
              className="w-full max-w-5xl aspect-video bg-black overflow-hidden border border-white/10 rounded-2xl shadow-2xl"
            >
              <video 
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
                controls 
                autoPlay 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
