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
  { href: "/gallery", label: "Gallery", image: "/heroSectionImgs/OpenPlanHero.png" },
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
        className={`fixed top-4 left-4 right-4 md:left-10 md:right-10 z-[100] px-6 md:px-10 transition-all duration-500 flex justify-between items-center pointer-events-auto rounded-[2rem] ${isScrolled ? "py-2 bg-white/95 backdrop-blur-md shadow-lg border border-black/5" : "py-3 md:py-4 bg-transparent"
          }`}
      >
        <Link href="/" className="flex items-center gap-4 md:gap-5 z-[101] group cursor-pointer">
          <Image src="/favicon/favicon.svg" alt="Admire Architects Logo" width={56} height={56} className="object-contain transition-transform group-hover:scale-105 mix-blend-multiply" />
          <span className="flex flex-col leading-none">
            <span className="text-2xl md:text-3xl tracking-[0.2em] font-light uppercase transition-colors duration-300 text-brand-blue">
              Admire <span className="font-medium">Architects</span>
            </span>
            {/* Company motto */}
            <span className="mt-1.5 text-[8px] md:text-[9px] uppercase tracking-[0.35em] font-medium transition-colors duration-300 text-brand-blue-light">
              Designing the Future
            </span>
          </span>
        </Link>

        {/* Action Buttons and Hamburger */}
        <div className="flex items-center gap-6 z-[101]">
          <div className={`hidden md:flex items-center gap-5 mr-1 transition-all duration-300 ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            <Link
              href="/projects"
              className="text-[9px] md:text-[10px] uppercase tracking-widest font-medium text-black hover:text-[#60A5FA] transition-colors cursor-pointer"
            >
              Projects
            </Link>
            <Link
              href="/gallery"
              className="text-[9px] md:text-[10px] uppercase tracking-widest font-medium text-black hover:text-[#60A5FA] transition-colors cursor-pointer"
            >
              Gallery
            </Link>
            <Link
              href="/contact"
              className="text-[9px] md:text-[10px] uppercase tracking-widest font-medium px-5 py-2 rounded-full bg-black text-white hover:bg-[#60A5FA] transition-colors shadow-sm cursor-pointer"
            >
              Contact
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative text-xl md:text-2xl w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform touch-manipulation cursor-pointer text-black dark:text-white"
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
            className="fixed inset-0 z-[90] bg-white dark:bg-background overflow-y-auto"
            data-lenis-prevent
          >
            {/* Top Gradient Mask to hide text smoothly before it hits the logo */}
            <div className="fixed top-0 left-0 right-0 h-40 bg-gradient-to-b from-white via-white/90 to-transparent dark:from-background dark:via-background/90 dark:to-transparent z-[95] pointer-events-none" />

            {/* Bottom Gradient Mask */}
            <div className="fixed bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent dark:from-background dark:to-transparent z-[95] pointer-events-none" />

            {/* Ambient Background Grid */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

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
                  {/* Fade mask for the image to blend into the menu */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent dark:from-background dark:via-background/50 dark:to-transparent" />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center min-h-max py-28 md:py-48 px-6 md:px-16 lg:px-24">

              <ul className="flex flex-col w-full md:w-1/2" onMouseLeave={() => setHoveredLink(pathname)}>
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, y: 30, rotate: 1 }}
                      animate={{ opacity: 1, y: 0, rotate: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.6, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                      className="border-b border-black/10 dark:border-white/10 last:border-none"
                    >
                      <Link
                        href={link.href}
                        onMouseEnter={() => setHoveredLink(link.href)}
                        className="group flex items-center justify-between text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-light text-black/85 dark:text-white/85 hover:text-[#60A5FA] transition-colors duration-300 tracking-tighter leading-none py-4 sm:py-6 md:py-8 cursor-pointer"
                      >
                        <div className="flex items-center gap-4 sm:gap-6 md:gap-10">
                          <span className={`text-[10px] md:text-xs uppercase tracking-widest font-sans font-medium transition-colors duration-300 ${isActive ? "text-[#60A5FA]" : "text-black/40 dark:text-white/40 group-hover:text-[#60A5FA]"}`}>
                            0{i + 1}
                          </span>
                          <span className="group-hover:translate-x-2 md:group-hover:translate-x-4 transition-transform duration-300">
                            {link.label}
                          </span>
                        </div>
                        <FiArrowRight className={`text-2xl md:text-3xl transition-all duration-300 transform ${isActive ? "text-[#60A5FA] translate-x-0 opacity-100" : "text-transparent -translate-x-8 opacity-0 group-hover:text-[#60A5FA] group-hover:translate-x-0 group-hover:opacity-100"}`} />
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mt-16 md:mt-0 md:w-1/3 text-black dark:text-white flex flex-col gap-10 md:pl-20 pt-8 md:pt-0"
              >
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#60A5FA] mb-4 font-medium">Global Headquarters</h4>
                  <p className="font-light text-sm md:text-base leading-relaxed text-black/60 dark:text-white/60">
                    1853, 17th Main, 30th B Cross<br />
                    5th Block, HBR Layout<br />
                    Bangalore - 560043
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#60A5FA] mb-4 font-medium">Inquiries</h4>
                  <div className="flex flex-col gap-3">
                    <a href="mailto:palani.m@admiregrp.in" className="font-light text-sm md:text-base text-black/60 dark:text-white/60 hover:text-[#60A5FA] transition-colors relative inline-block group self-start">
                      palani.m@admiregrp.in
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#60A5FA] group-hover:w-full transition-all duration-300" />
                    </a>
                    <a href="tel:9448370989" className="font-light text-sm md:text-base text-black/60 dark:text-white/60 hover:text-[#60A5FA] transition-colors relative inline-block group self-start">
                      9448370989
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#60A5FA] group-hover:w-full transition-all duration-300" />
                    </a>
                  </div>
                </div>
                <div className="flex gap-6 mt-4">
                  {["Instagram", "LinkedIn", "Twitter"].map(social => (
                    <a key={social} href="#" className="text-[10px] uppercase tracking-[0.2em] text-black/40 dark:text-white/40 hover:text-[#60A5FA] transition-colors">
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
