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
        className={`fixed top-2.5 left-2.5 right-2.5 sm:top-3 sm:left-4 sm:right-4 md:top-4 md:left-10 md:right-10 z-[100] px-3.5 sm:px-5 md:px-10 transition-all duration-300 flex justify-between items-center pointer-events-auto rounded-2xl md:rounded-[2rem] ${
          isScrolled
            ? "py-2 sm:py-2.5 md:py-2.5 bg-white/95 dark:bg-background/95 backdrop-blur-md shadow-md border border-black/5 dark:border-white/10"
            : "py-2 sm:py-2.5 md:py-3.5 bg-white/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none border border-black/5 md:border-transparent shadow-sm md:shadow-none"
        }`}
      >
        <Link href="/" className="flex items-center gap-2.5 sm:gap-4 md:gap-5 z-[101] group cursor-pointer min-w-0">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex-shrink-0">
            <Image
              src="/favicon/favicon.svg"
              alt="Admire Architects Logo"
              fill
              className="object-contain transition-transform group-hover:scale-105 mix-blend-multiply"
              priority
            />
          </div>
          <span className="flex flex-col leading-tight min-w-0">
            <span className="text-sm xs:text-base sm:text-lg md:text-2xl lg:text-3xl tracking-[0.12em] sm:tracking-[0.18em] md:tracking-[0.2em] font-light uppercase transition-colors duration-300 text-brand-blue truncate">
              Admire <span className="font-semibold">Architects</span>
            </span>
            {/* Company motto */}
            <span className="hidden sm:block mt-0.5 text-[7.5px] md:text-[9px] uppercase tracking-[0.25em] md:tracking-[0.35em] font-medium transition-colors duration-300 text-brand-blue-light">
              Designing the Future
            </span>
          </span>
        </Link>

        {/* Action Buttons and Hamburger */}
        <div className="flex items-center gap-3 sm:gap-6 z-[101]">
          <div className={`hidden lg:flex items-center gap-5 mr-1 transition-all duration-300 ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
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
            className="relative text-xl md:text-2xl w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 hover:scale-105 transition-all touch-manipulation cursor-pointer text-black dark:text-white flex-shrink-0"
            aria-label="Toggle Menu"
          >
            {isOpen ? <FiX className="w-5 h-5 sm:w-6 sm:h-6" /> : <FiMenu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[90] bg-white dark:bg-background overflow-y-auto min-h-screen"
            data-lenis-prevent
          >
            {/* Top Gradient Mask */}
            <div className="fixed top-0 left-0 right-0 h-24 md:h-36 bg-gradient-to-b from-white via-white/90 to-transparent dark:from-background dark:via-background/90 dark:to-transparent z-[95] pointer-events-none" />

            {/* Bottom Gradient Mask */}
            <div className="fixed bottom-0 left-0 right-0 h-16 md:h-20 bg-gradient-to-t from-white to-transparent dark:from-background dark:to-transparent z-[95] pointer-events-none" />

            {/* Ambient Background Grid */}
            <div
              className="fixed inset-0 opacity-[0.03] pointer-events-none z-0"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            {/* Hover Image Preview (Desktop Only) */}
            <div className="hidden lg:block fixed top-0 right-0 w-[45vw] h-screen z-0">
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
                    className="object-cover"
                    priority
                  />
                  {/* Fade mask for the image to blend into the menu */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent dark:from-background dark:via-background/50 dark:to-transparent" />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center min-h-screen pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-36 md:pb-24 px-5 sm:px-8 md:px-16 lg:px-24">
              <ul className="flex flex-col w-full lg:w-1/2" onMouseLeave={() => setHoveredLink(pathname)}>
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={{ duration: 0.5, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
                      className="border-b border-black/5 dark:border-white/10 last:border-none"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        onMouseEnter={() => setHoveredLink(link.href)}
                        className="group flex items-center justify-between text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif font-light text-black/85 dark:text-white/85 hover:text-[#60A5FA] transition-colors duration-300 tracking-tight leading-tight py-2.5 sm:py-3.5 md:py-6 cursor-pointer"
                      >
                        <div className="flex items-center gap-3 sm:gap-5 md:gap-8">
                          <span
                            className={`text-[9px] sm:text-[10px] md:text-xs uppercase tracking-widest font-sans font-medium transition-colors duration-300 ${
                              isActive ? "text-[#60A5FA]" : "text-black/35 dark:text-white/40 group-hover:text-[#60A5FA]"
                            }`}
                          >
                            0{i + 1}
                          </span>
                          <span className="group-hover:translate-x-1.5 md:group-hover:translate-x-3 transition-transform duration-300">
                            {link.label}
                          </span>
                        </div>
                        <FiArrowRight
                          className={`text-base sm:text-xl md:text-2xl transition-all duration-300 transform ${
                            isActive
                              ? "text-[#60A5FA] translate-x-0 opacity-100"
                              : "text-transparent -translate-x-4 opacity-0 group-hover:text-[#60A5FA] group-hover:translate-x-0 group-hover:opacity-100"
                          }`}
                        />
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="mt-8 lg:mt-0 w-full lg:w-1/3 text-black dark:text-white flex flex-col gap-6 md:gap-8 lg:pl-16 pt-6 lg:pt-0 border-t border-black/5 lg:border-t-0"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5 sm:gap-6">
                  <div>
                    <h4 className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-[#60A5FA] mb-2 font-semibold">
                      Global Headquarters
                    </h4>
                    <p className="font-light text-xs sm:text-sm md:text-base leading-relaxed text-black/70 dark:text-white/70">
                      1853, 17th Main, 30th B Cross<br />
                      5th Block, HBR Layout<br />
                      Bangalore - 560043
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-[#60A5FA] mb-2 font-semibold">
                      Inquiries
                    </h4>
                    <div className="flex flex-col gap-2">
                      <a
                        href="mailto:palani.m@admiregrp.in"
                        className="font-light text-xs sm:text-sm md:text-base text-black/70 dark:text-white/70 hover:text-[#60A5FA] transition-colors relative inline-block group self-start"
                      >
                        palani.m@admiregrp.in
                        <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#60A5FA] group-hover:w-full transition-all duration-300" />
                      </a>
                      <a
                        href="tel:9448370989"
                        className="font-light text-xs sm:text-sm md:text-base text-black/70 dark:text-white/70 hover:text-[#60A5FA] transition-colors relative inline-block group self-start"
                      >
                        +91 9448370989
                        <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#60A5FA] group-hover:w-full transition-all duration-300" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-5 pt-2">
                  {["Instagram", "LinkedIn", "Twitter"].map(social => (
                    <a
                      key={social}
                      href="#"
                      className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-black/50 dark:text-white/50 hover:text-[#60A5FA] transition-colors"
                    >
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
