"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

export default function ProjectCaseStudyPage({ params }: { params: { slug: string } }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  // Format slug to title (e.g., the-zenith-tower -> The Zenith Tower)
  const title = params.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden font-sans pb-32">
      
      {/* Hero Banner */}
      <section ref={containerRef} className="relative h-[90vh] w-full flex items-end pb-24 px-6 md:px-16 lg:px-24 overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <Image
            src="/project_1_1779118457708.png"
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </motion.div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.2 } }
            }}
          >
            <motion.div variants={fadeUp} className="text-[10px] uppercase tracking-[0.3em] text-accent mb-6">
              Commercial / 2025
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-6xl md:text-[8rem] font-serif font-light text-foreground tracking-tighter leading-[0.9] mb-12">
              {title}
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Project Meta Details */}
      <section className="py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-border pt-16">
            {[
              { label: "Client", value: "Nexus Finance Group" },
              { label: "Location", value: "Frankfurt, Germany" },
              { label: "Scale", value: "1.2M Sq. Ft." },
              { label: "Status", value: "Completed 2025" }
            ].map((meta, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">{meta.label}</div>
                <div className="text-lg font-serif">{meta.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 flex flex-col md:flex-row gap-20">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="md:w-1/3"
          >
            <h2 className="text-4xl font-serif font-light">The Challenge & <br/><span className="text-muted-foreground">Vision</span></h2>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="md:w-2/3"
          >
            <p className="text-xl md:text-3xl font-light leading-relaxed text-muted-foreground mb-12">
              Nexus Finance required a global headquarters that projected unshakeable stability while maintaining absolute environmental sustainability. The site posed severe geometric constraints, forcing a profound rethinking of vertical structural engineering.
            </p>
            <p className="text-lg font-light leading-relaxed text-foreground">
              Our approach was entirely subtractive. Rather than building outward, we carved spaces inward, creating massive, multi-story atriums that serve as the lungs of the building. The exterior utilizes an advanced responsive glass facade that adjusts to solar radiation in real-time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-20">
        <div className="px-6 md:px-16 lg:px-24 grid grid-cols-1 md:grid-cols-12 gap-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="md:col-span-12 relative h-[80vh] bg-secondary"
          >
             <Image src="/project_2_1779118501379.png" alt="Interior Detail" fill className="object-cover" />
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="md:col-span-5 relative h-[60vh] bg-secondary"
          >
             <Image src="/hero_arch_1779118409602.png" alt="Lobby Area" fill className="object-cover" />
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="md:col-span-7 relative h-[60vh] bg-secondary"
          >
             <Image src="/project_1_1779118457708.png" alt="Exterior Angle" fill className="object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-32 bg-card">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 grid grid-cols-1 md:grid-cols-2 gap-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h3 className="text-3xl font-serif font-light mb-10">Technology & Materials</h3>
            <ul className="space-y-8">
              {[
                { title: "Dynamic Solar Facade", desc: "Automated louvers reduce HVAC load by 40%." },
                { title: "Post-Tensioned Concrete", desc: "Allowed for 20-meter column-free spans." },
                { title: "BIM Integration", desc: "Full lifecycle digital twin management." }
              ].map((item, i) => (
                <li key={i} className="border-t border-border pt-6">
                  <div className="text-lg font-medium mb-2">{item.title}</div>
                  <div className="text-muted-foreground font-light">{item.desc}</div>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h3 className="text-3xl font-serif font-light mb-10">Project Metrics</h3>
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-background p-8 border border-border">
                <div className="text-5xl font-serif text-accent mb-2">LEED</div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Platinum Certified</div>
              </div>
              <div className="bg-background p-8 border border-border">
                <div className="text-5xl font-serif text-accent mb-2">-45%</div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Energy Consumption</div>
              </div>
              <div className="bg-background p-8 border border-border">
                <div className="text-5xl font-serif text-accent mb-2">36mo</div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Completion Time</div>
              </div>
              <div className="bg-background p-8 border border-border">
                <div className="text-5xl font-serif text-accent mb-2">0</div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Lost-Time Incidents</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Next Project CTA */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-6">Up Next</div>
            <Link href="/projects/aura-residences" className="group inline-flex flex-col items-center">
              <h2 className="text-5xl md:text-7xl font-serif font-light mb-8 group-hover:text-accent transition-colors duration-500">
                Aura Residences
              </h2>
              <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-500">
                <FiArrowRight size={24} />
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
