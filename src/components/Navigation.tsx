"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiArrowRight } from "react-icons/fi";

const navLinks = [
  { href: "/", label: "Home", image: "/hero_arch_1779118409602.png" },
  { href: "/about", label: "About", image: "/project_1_1779118457708.png" },
  { href: "/projects", label: "Projects", image: "/project_2_1779118501379.png" },
  { href: "/services", label: "Services", image: "/hero_arch_1779118409602.png" },
  { href: "/process", label: "Process", image: "/project_1_1779118457708.png" },
  { href: "/clients", label: "Clients", image: "/project_2_1779118501379.png" },
  { href: "/contact", label: "Contact", image: "/hero_arch_1779118409602.png" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(navLinks[0].href);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const activeImage = navLinks.find(link => link.href === hoveredLink)?.image || navLinks[0].image;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-16 py-6 flex justify-between items-center mix-blend-difference text-white pointer-events-auto">
        <Link href="/" className="text-xl md:text-2xl tracking-[0.2em] font-light uppercase z-[101]">
          Admire <span className="font-medium">Architects</span>
        </Link>
        
        {/* Mobile & Desktop Hamburger */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-[101] text-3xl w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform touch-manipulation"
          aria-label="Toggle Menu"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[90] bg-[#070b11] overflow-y-auto"
            data-lenis-prevent
          >
            {/* Top Gradient Mask to hide text smoothly before it hits the logo */}
            <div className="fixed top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#070b11] via-[#070b11]/90 to-transparent z-[95] pointer-events-none" />

            {/* Bottom Gradient Mask */}
            <div className="fixed bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#070b11] to-transparent z-[95] pointer-events-none" />

            {/* Ambient Background Grid */}
            <div className="fixed inset-0 opacity-[0.02] pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(#FAFAF9 1px, transparent 1px), linear-gradient(90deg, #FAFAF9 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* Hover Image Preview (Desktop Only) */}
            <div className="hidden md:block fixed top-0 right-0 w-[45vw] h-screen z-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={hoveredLink}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeImage}
                    alt="Preview"
                    fill
                    className="object-cover grayscale opacity-30 mix-blend-screen"
                    priority
                  />
                  {/* Fade mask for the image to blend into the menu */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#070b11] via-[#070b11]/50 to-transparent" />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start min-h-max py-24 md:py-48 px-6 md:px-16 lg:px-24">
              
              <ul className="flex flex-col w-full md:w-1/2" onMouseLeave={() => setHoveredLink(pathname)}>
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.li 
                      key={link.href}
                      initial={{ opacity: 0, y: 50, rotate: 2 }}
                      animate={{ opacity: 1, y: 0, rotate: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      className="border-b border-white/5 last:border-none"
                    >
                      <Link 
                        href={link.href} 
                        onMouseEnter={() => setHoveredLink(link.href)}
                        className="group flex items-center justify-between text-4xl md:text-5xl lg:text-7xl font-serif font-light text-[#fafaf9] hover:text-[#b89b72] transition-colors duration-500 tracking-tighter leading-none py-4 md:py-8"
                      >
                        <div className="flex items-center gap-6 md:gap-10">
                          <span className={`text-[10px] md:text-xs uppercase tracking-widest font-sans font-medium transition-colors duration-500 ${isActive ? "text-[#b89b72]" : "text-gray-600 group-hover:text-gray-400"}`}>
                            0{i + 1}
                          </span>
                          <span className="group-hover:translate-x-4 transition-transform duration-500">
                            {link.label}
                          </span>
                        </div>
                        <FiArrowRight className={`text-3xl transition-all duration-500 transform ${isActive ? "text-[#b89b72] translate-x-0 opacity-100" : "text-transparent -translate-x-8 opacity-0 group-hover:text-[#b89b72] group-hover:translate-x-0 group-hover:opacity-100"}`} />
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mt-12 md:mt-0 md:w-1/3 text-[#fafaf9] flex flex-col gap-8 md:gap-10 md:pl-20 pt-8 md:pt-0 md:sticky md:top-48 pb-24 md:pb-0"
              >
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#b89b72] mb-4">Global Headquarters</h4>
                  <p className="font-light text-sm md:text-base leading-relaxed text-gray-300">
                    145 Corporate Boulevard<br/>
                    Financial District<br/>
                    New York, NY 10005
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#b89b72] mb-4">Inquiries</h4>
                  <a href="mailto:contact@admirearchitects.com" className="font-light text-sm md:text-base text-gray-300 hover:text-[#b89b72] transition-colors relative inline-block group">
                    contact@admirearchitects.com
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#b89b72] group-hover:w-full transition-all duration-500" />
                  </a>
                </div>
                <div className="flex gap-6 mt-4">
                  {["Instagram", "LinkedIn", "Twitter"].map(social => (
                    <a key={social} href="#" className="text-[10px] uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors">
                      {social}
                    </a>
                  ))}
                </div>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
