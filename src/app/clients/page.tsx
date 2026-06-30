"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { PROJECTS_DATA } from "@/data/projects";

const fadeUp: any = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

const CLIENT_LOGOS = [
  { name: "Airtel", src: "/ClientLogosImgs/airtel.png" },
  { name: "Blueprint", src: "/ClientLogosImgs/blueprint.png" },
  { name: "Cisco", src: "/ClientLogosImgs/cisco.png" },
  { name: "Concentrix", src: "/ClientLogosImgs/concentrix.png" },
  { name: "Cognizant", src: "/ClientLogosImgs/congizant.png" },
  { name: "Daimler Truck", src: "/ClientLogosImgs/daimlertruck.png" },
  { name: "Dell", src: "/ClientLogosImgs/dell.png" },
  { name: "Emids", src: "/ClientLogosImgs/emids.png" },
  { name: "Genpact", src: "/ClientLogosImgs/genpact.png" },
  { name: "Goldman Sachs", src: "/ClientLogosImgs/goldmanSachs.png" },
  { name: "HP", src: "/ClientLogosImgs/hp.png" },
  { name: "IBM", src: "/ClientLogosImgs/ibm.png" },
  { name: "Mercedes-Benz", src: "/ClientLogosImgs/mercedesbenz.png" },
  { name: "Nexxer", src: "/ClientLogosImgs/nexxer.png" },
  { name: "Nokia", src: "/ClientLogosImgs/nokia.png" },
  { name: "ParentPay", src: "/ClientLogosImgs/parentpay.png" },
  { name: "Quickplay", src: "/ClientLogosImgs/quickplay.png" },
  { name: "Schneider Electric", src: "/ClientLogosImgs/schneiderelectric.png" },
  { name: "Table Space", src: "/ClientLogosImgs/tablespace.png" },
  { name: "Target", src: "/ClientLogosImgs/target.png" },
  { name: "Wipro", src: "/ClientLogosImgs/wipro.png" },
  { name: "Zitro", src: "/ClientLogosImgs/zitro.png" },
];

// Duplicate for seamless infinite marquee
const MARQUEE_ITEMS = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS];

export default function ClientsPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-clip font-sans pb-32">
      
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
      <section className="py-24 border-b border-border overflow-hidden bg-[#ffffff] text-[#000000] flex flex-col justify-center gap-12">
        {/* Row 1 - Moves Left */}
        <div className="relative w-full flex overflow-hidden">
          <motion.div 
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap"
          >
            {MARQUEE_ITEMS.map((client, i) => (
              <div key={i} className="flex items-center">
                <div className="relative w-40 h-20 md:w-56 md:h-28 mx-12 transition-all duration-500 cursor-default">
                  <Image src={client.src} alt={client.name} fill className="object-contain" />
                </div>
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
                <div className="relative w-40 h-20 md:w-56 md:h-28 mx-12 transition-all duration-500 cursor-default">
                  <Image src={client.src} alt={client.name} fill className="object-contain" />
                </div>
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
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 border-l border-t border-border">
            {CLIENT_LOGOS.map((client, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.05 }}
                className="group relative h-48 border-r border-b border-border flex items-center justify-center overflow-hidden cursor-pointer bg-background hover:bg-secondary transition-colors duration-500 p-6"
              >
                <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-110">
                  <Image src={client.src} alt={client.name} fill className="object-contain" />
                </div>
                
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
            {PROJECTS_DATA.filter(p => p.image !== null).slice(0, 2).map((project, index) => (
              <motion.div 
                key={project.id}
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true, margin: "-100px" }} 
                variants={fadeUp}
                className={`group ${index % 2 !== 0 ? 'md:mt-24' : ''}`}
              >
                <div className="relative h-[60vh] w-full overflow-hidden mb-8 bg-secondary">
                  <Image
                    src={project.image!}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">{project.category}</div>
                    <h3 className="text-3xl font-serif font-light mb-3">{project.title}</h3>
                    <p className="text-muted-foreground font-light mb-6 max-w-sm">
                      {project.description}
                    </p>
                    <Link href="/projects" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium hover:text-accent transition-colors">
                      View All Projects <FiArrowRight />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
