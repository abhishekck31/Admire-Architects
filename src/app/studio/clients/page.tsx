"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

const CLIENTS = [
  "IBM", "Dell", "Genpact", "Schneider Electric", 
  "Mercedes-Benz", "Cognizant", "Cisco", "Airtel", "Goldman Sachs"
];

// Duplicate for seamless infinite marquee
const MARQUEE_ITEMS = [...CLIENTS, ...CLIENTS, ...CLIENTS];

export default function ClientsPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden font-sans pb-32">
      
      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6 md:px-16 lg:px-24 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="md:w-2/3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-accent mb-6">Partners in Scale</div>
            <h1 className="text-5xl md:text-[7rem] font-serif font-light text-foreground tracking-tighter leading-[1] mb-10">
              Enterprise <br/> <span className="text-muted-foreground italic">Trust.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl leading-relaxed">
              Global leaders do not compromise. We are the architects of choice for the world's most demanding corporate entities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Infinite Marquee Logo Wall */}
      <section className="py-24 border-b border-border overflow-hidden bg-[#070b11] text-[#fafaf9] flex flex-col justify-center gap-12">
        {/* Row 1 - Moves Left */}
        <div className="relative w-full flex overflow-hidden">
          <motion.div 
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap"
          >
            {MARQUEE_ITEMS.map((client, i) => (
              <div key={i} className="flex items-center">
                <span className="text-5xl md:text-7xl font-serif font-light px-12 opacity-50 hover:opacity-100 transition-opacity duration-500 cursor-default">
                  {client}
                </span>
                <span className="text-accent opacity-30 text-2xl">•</span>
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Row 2 - Moves Right */}
        <div className="relative w-full flex overflow-hidden">
          <motion.div 
            animate={{ x: ["-33.33%", "0%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap"
          >
            {MARQUEE_ITEMS.map((client, i) => (
              <div key={i} className="flex items-center">
                <span className="text-5xl md:text-7xl font-serif font-light px-12 opacity-30 hover:opacity-100 transition-opacity duration-500 cursor-default">
                  {client}
                </span>
                <span className="text-accent opacity-30 text-2xl">•</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Client Statistics & Trust Indicators */}
      <section className="py-32 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight">The Weight of Experience</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left">
             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className="text-5xl md:text-7xl font-serif font-light text-primary mb-4">40+</div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Fortune 500 Clients</div>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className="text-5xl md:text-7xl font-serif font-light text-primary mb-4">95%</div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Client Retention Rate</div>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className="text-5xl md:text-7xl font-serif font-light text-primary mb-4">8M</div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Sq Ft Delivered</div>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className="text-5xl md:text-7xl font-serif font-light text-primary mb-4">25</div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Global Markets</div>
              </motion.div>
          </div>
        </div>
      </section>

      {/* Structured Client Grid with Hover Effects */}
      <section className="py-32 bg-card">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 border-l border-t border-border">
            {CLIENTS.map((client, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className="group relative h-48 border-r border-b border-border flex items-center justify-center overflow-hidden cursor-pointer bg-background hover:bg-secondary transition-colors duration-500"
              >
                {/* Minimalist text representation of client */}
                <h3 className="relative z-10 text-2xl font-sans tracking-widest uppercase font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                  {client}
                </h3>
                
                {/* Reveal line on hover */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-accent group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Highlights */}
      <section className="py-40 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
            <h2 className="text-5xl md:text-6xl font-serif font-light tracking-tight">Enterprise Highlights</h2>
            <Link href="/projects" className="uppercase tracking-[0.2em] text-xs border-b border-foreground pb-2 hover:text-muted-foreground hover:border-muted-foreground transition-colors duration-500">
              View All Works
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-100px" }} 
              variants={fadeUp}
              className="group"
            >
              <div className="relative h-[60vh] w-full overflow-hidden mb-8 bg-secondary">
                <Image
                  src="/project_1_1779118457708.png"
                  alt="IBM Global Campus"
                  fill
                  className="object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Technology Sector</div>
                  <h3 className="text-3xl font-serif font-light mb-3">IBM Innovation Campus</h3>
                  <p className="text-muted-foreground font-light mb-6 max-w-sm">
                    A 1.5M sq ft development engineered for extreme collaboration and absolute data security.
                  </p>
                  <Link href="/projects/ibm-campus" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium hover:text-accent transition-colors">
                    View Case Study <FiArrowRight />
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-100px" }} 
              variants={fadeUp}
              className="group md:mt-24"
            >
              <div className="relative h-[60vh] w-full overflow-hidden mb-8 bg-secondary">
                <Image
                  src="/project_2_1779118501379.png"
                  alt="Mercedes-Benz R&D"
                  fill
                  className="object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Automotive Sector</div>
                  <h3 className="text-3xl font-serif font-light mb-3">Mercedes-Benz R&D Center</h3>
                  <p className="text-muted-foreground font-light mb-6 max-w-sm">
                    A structural masterpiece housing state-of-the-art automotive testing facilities in a LEED Platinum shell.
                  </p>
                  <Link href="/projects/mercedes-benz-rd" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium hover:text-accent transition-colors">
                    View Case Study <FiArrowRight />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
