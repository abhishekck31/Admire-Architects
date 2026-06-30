"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiArrowRight } from "react-icons/fi";

const navLinks = [
  { href: "/", label: "Home", image: "/heroSectionImgs/CEOofficeHero.png" },
  { href: "/about", label: "About", image: "/heroSectionImgs/CorporateMeetingHero.png" },
  { href: "/projects", label: "Projects", image: "/heroSectionImgs/LoungeHero.png" },
  { href: "/services", label: "Services", image: "/heroSectionImgs/OpenPlanHero.png" },
  { href: "/process", label: "Process", image: "/heroSectionImgs/CEOofficeHero.png" },
  { href: "/clients", label: "Clients", image: "/heroSectionImgs/CorporateMeetingHero.png" },
  { href: "/contact", label: "Contact", image: "/heroSectionImgs/LoungeHero.png" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(navLinks[0].href);
  const [isScrolled, setIsScrolled] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeImage = navLinks.find(link => link.href === hoveredLink)?.image || navLinks[0].image;

  return (
    <>
      <nav 
        className={`fixed top-4 left-4 right-4 md:left-10 md:right-10 z-[100] px-6 md:px-10 transition-all duration-500 flex justify-between items-center pointer-events-auto rounded-[2rem] ${
          isScrolled ? "py-2 bg-white/95 backdrop-blur-md shadow-lg border border-black/5" : "py-3 md:py-4 bg-transparent"
        }`}
      >
        <Link href="/" className="flex items-center gap-3 z-[101] group">
          {/* <Image src="/logo.png" alt="Admire Architects Logo" width={32} height={32} className="object-contain mix-blend-multiply transition-transform group-hover:scale-105" /> */}
          <span className="text-base md:text-lg tracking-[0.2em] font-light uppercase text-black">
            Admire <span className="font-medium">Architects</span>
          </span>
        </Link>

        {/* Action Buttons and Hamburger */}
        <div className="flex items-center gap-6 z-[101]">
          <div className={`hidden md:flex items-center gap-5 mr-1 transition-all duration-300 ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            <Link 
              href="/projects" 
              className="text-[9px] md:text-[10px] uppercase tracking-widest font-medium text-black hover:text-[#60A5FA] transition-colors"
            >
              Projects
            </Link>
            <Link 
              href="/contact" 
              className="text-[9px] md:text-[10px] uppercase tracking-widest font-medium px-5 py-2 rounded-full bg-black text-white hover:bg-[#60A5FA] transition-colors shadow-sm"
            >
              Contact
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative text-xl md:text-2xl w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform touch-manipulation text-black"
            aria-label="Toggle Menu"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[90] bg-[#ffffff] overflow-y-auto"
            data-lenis-prevent
          >
            {/* Top Gradient Mask to hide text smoothly before it hits the logo */}
            <div className="fixed top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#ffffff] via-[#ffffff]/90 to-transparent z-[95] pointer-events-none" />

            {/* Bottom Gradient Mask */}
            <div className="fixed bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#ffffff] to-transparent z-[95] pointer-events-none" />

            {/* Ambient Background Grid */}
            <div className="fixed inset-0 opacity-[0.02] pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(#000000 1px, transparent 1px), linear-gradient(90deg, #000000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

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
                  {/* <Image
                    src={activeImage}
                    alt="Preview"
                    fill
                    className="object-cover grayscale opacity-30 mix-blend-screen"
                    priority
                  /> */}
                  {/* Fade mask for the image to blend into the menu */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ffffff] via-[#ffffff]/50 to-transparent" />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center min-h-max py-48 px-6 md:px-16 lg:px-24">

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
                      className="border-b border-black/5 last:border-none"
                    >
                      <Link
                        href={link.href}
                        onMouseEnter={() => setHoveredLink(link.href)}
                        className="group flex items-center justify-between text-4xl md:text-5xl lg:text-7xl font-serif font-light text-[#000000] hover:text-[#60A5FA] transition-colors duration-500 tracking-tighter leading-none py-6 md:py-8"
                      >
                        <div className="flex items-center gap-6 md:gap-10">
                          <span className={`text-[10px] md:text-xs uppercase tracking-widest font-sans font-medium transition-colors duration-500 ${isActive ? "text-[#60A5FA]" : "text-gray-600 group-hover:text-gray-600"}`}>
                            0{i + 1}
                          </span>
                          <span className="group-hover:translate-x-4 transition-transform duration-500">
                            {link.label}
                          </span>
                        </div>
                        <FiArrowRight className={`text-3xl transition-all duration-500 transform ${isActive ? "text-[#60A5FA] translate-x-0 opacity-100" : "text-transparent -translate-x-8 opacity-0 group-hover:text-[#60A5FA] group-hover:translate-x-0 group-hover:opacity-100"}`} />
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mt-16 md:mt-0 md:w-1/3 text-[#000000] flex flex-col gap-10 md:pl-20 pt-8 md:pt-0"
              >
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#60A5FA] mb-4">Global Headquarters</h4>
                  <p className="font-light text-sm md:text-base leading-relaxed text-gray-700">
                    1853, 17th Main, 30th B Cross<br />
                    5th Block, HBR Layout<br />
                    Bangalore - 560043
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#60A5FA] mb-4">Inquiries</h4>
                  <div className="flex flex-col gap-3">
                    <a href="mailto:palani.m@admiregrp.in" className="font-light text-sm md:text-base text-gray-700 hover:text-[#60A5FA] transition-colors relative inline-block group self-start">
                      palani.m@admiregrp.in
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#60A5FA] group-hover:w-full transition-all duration-500" />
                    </a>
                    <a href="tel:9448370989" className="font-light text-sm md:text-base text-gray-700 hover:text-[#60A5FA] transition-colors relative inline-block group self-start">
                      9448370989
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#60A5FA] group-hover:w-full transition-all duration-500" />
                    </a>
                  </div>
                </div>
                <div className="flex gap-6 mt-4">
                  {["Instagram", "LinkedIn", "Twitter"].map(social => (
                    <a key={social} href="#" className="text-[10px] uppercase tracking-[0.2em] text-gray-500 hover:text-black transition-colors">
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
