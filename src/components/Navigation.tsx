"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/studio/about", label: "Studio" },
  { href: "/projects", label: "Projects" },
  { href: "/expertise/services", label: "Services" },
  { href: "/expertise/process", label: "Process" },
  { href: "/studio/clients", label: "Clients" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open (mobile optimization)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

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
            className="fixed inset-0 z-[90] bg-[#070b11] flex flex-col justify-center px-6 md:px-24"
          >
            {/* Ambient Background Grid */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#FAFAF9 1px, transparent 1px), linear-gradient(90deg, #FAFAF9 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end h-full py-32 md:py-48">
              
              <ul className="flex flex-col gap-4 md:gap-8 w-full md:w-2/3">
                {navLinks.map((link, i) => (
                  <motion.li 
                    key={link.href}
                    initial={{ opacity: 0, y: 50, rotate: 2 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link 
                      href={link.href} 
                      className="text-5xl md:text-[6rem] font-serif font-light text-[#fafaf9] hover:text-[#b89b72] transition-colors duration-500 tracking-tighter leading-none block py-2"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mt-16 md:mt-0 md:w-1/3 text-[#fafaf9] flex flex-col gap-8 border-t border-white/20 md:border-t-0 md:border-l md:pl-12 pt-8 md:pt-0"
              >
                <div>
                  <h4 className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">Global Headquarters</h4>
                  <p className="font-light text-sm md:text-base leading-relaxed">
                    145 Corporate Boulevard<br/>
                    Financial District<br/>
                    New York, NY 10005
                  </p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">Inquiries</h4>
                  <a href="mailto:contact@admirearchitects.com" className="font-light text-sm md:text-base hover:text-[#b89b72] transition-colors">
                    contact@admirearchitects.com
                  </a>
                </div>
                <div className="flex gap-6 mt-4">
                  {["Instagram", "LinkedIn", "Twitter"].map(social => (
                    <a key={social} href="#" className="text-xs uppercase tracking-[0.2em] text-gray-500 hover:text-[#b89b72] transition-colors">
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
