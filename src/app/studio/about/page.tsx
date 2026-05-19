"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const fadeUp: any = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden font-sans pb-32">
      
      {/* Hero Section */}
      <section ref={containerRef} className="relative h-[90vh] w-full flex items-end pb-24 px-6 md:px-16 lg:px-24 overflow-hidden bg-card">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <Image
            src="/hero_arch_1779118409602.png"
            alt="Admire Architects Head Office"
            fill
            className="object-cover opacity-30 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
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
              The Firm
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-6xl md:text-[8rem] font-serif font-light text-foreground tracking-tighter leading-[0.9] mb-12">
              A Legacy in <br />
              <span className="italic text-muted-foreground">Concrete & Glass.</span>
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission (Editorial Grid) */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="md:col-span-4"
          >
            <h2 className="text-sm uppercase tracking-[0.2em] font-medium border-b border-border pb-4 mb-8">
              Corporate Vision
            </h2>
            <p className="text-2xl font-serif font-light leading-relaxed text-foreground">
              To shape the skylines of tomorrow by fusing uncompromising structural integrity with profound aesthetic minimalism.
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="md:col-span-8"
          >
            <h2 className="text-sm uppercase tracking-[0.2em] font-medium border-b border-border pb-4 mb-8">
              The Mission & Story
            </h2>
            <div className="flex flex-col md:flex-row gap-12">
              <p className="text-lg font-light leading-relaxed text-muted-foreground md:w-1/2">
                Founded on the principle that architecture is the physical manifestation of enterprise ambition, Admire Architects Pvt Ltd was established to disrupt the generic commercial landscape. We do not build mere office spaces; we engineer ecosystems of productivity and power.
              </p>
              <p className="text-lg font-light leading-relaxed text-muted-foreground md:w-1/2">
                For over two decades, our methodology has remained absolute: strip away the non-essential, utilize the most durable materials on Earth, and deliver monumental structures that stand as testaments to the corporations that inhabit them.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leadership Message */}
      <section className="py-40 bg-[#070b11] text-[#fafaf9] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/project_2_1779118501379.png')] bg-cover bg-center grayscale" />
        <div className="max-w-5xl mx-auto px-6 md:px-16 lg:px-24 relative z-10 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="text-accent mb-12">
               <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="mx-auto opacity-80">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
            </div>
            <h3 className="text-4xl md:text-6xl font-serif font-light leading-[1.2] mb-16">
              "We approach every foundation not just as a structural challenge, but as a strategic asset. True luxury in architecture is found in absolute precision."
            </h3>
            <div>
              <div className="text-sm uppercase tracking-[0.2em] font-medium mb-1">Kamlesh Kumar</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#b89b72]">Principal Architect & Founder</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="py-40 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-4xl md:text-6xl font-serif font-light tracking-tight mb-24"
          >
            Evolution of the Firm
          </motion.h2>

          <div className="relative border-l border-border pl-10 md:pl-20 space-y-24">
            {[
              { year: "1998", title: "Foundation", text: "Admire Architects Pvt Ltd is established with a focus on brutalist, hyper-efficient commercial structures." },
              { year: "2005", title: "National Expansion", text: "Secured our first Tier-1 enterprise campus, scaling our operations across the subcontinent." },
              { year: "2015", title: "Global Integration", text: "Opened regional offices in Frankfurt and Tokyo to service multinational corporate clients." },
              { year: "2024", title: "Sustainable Future", text: "Achieved 100% LEED Platinum compliance across all active commercial builds." }
            ].map((milestone, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative group"
              >
                {/* Timeline Dot */}
                <div className="absolute w-4 h-4 bg-background border-2 border-primary rounded-full -left-[49px] md:-left-[89px] top-2 group-hover:bg-accent group-hover:border-accent transition-colors duration-500" />
                
                <div className="text-5xl md:text-7xl font-serif text-muted mb-4 group-hover:text-foreground transition-colors duration-500">{milestone.year}</div>
                <h4 className="text-2xl font-serif font-light mb-4">{milestone.title}</h4>
                <p className="text-muted-foreground font-light max-w-lg leading-relaxed">{milestone.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements & Certifications */}
      <section className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight">Accreditations & Honors</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
             {[
               { title: "ISO 9001:2015", subtitle: "Quality Management Systems" },
               { title: "LEED Platinum", subtitle: "USGBC Certified Partner" },
               { title: "AIA Excellence", subtitle: "Commercial Architecture Award" },
               { title: "BIM Level 2", subtitle: "Full Lifecycle Integration" },
               { title: "Safety First", subtitle: "Zero LTI Enterprise Award" },
               { title: "RIBA Chartered", subtitle: "International Practice" },
               { title: "Structural Innovator", subtitle: "Global Engineering Council" },
               { title: "Top 50 Firms", subtitle: "Architectural Digest Global" }
             ].map((cert, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8, delay: i * 0.1 }}
                 className="border-t border-border pt-6 group"
               >
                 <h4 className="text-lg font-medium text-foreground mb-2 group-hover:text-accent transition-colors duration-300">{cert.title}</h4>
                 <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{cert.subtitle}</p>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Enterprise Experience & Culture */}
      <section className="py-32 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="relative h-[70vh] w-full bg-secondary grayscale hover:grayscale-0 transition-all duration-1000"
          >
            <Image src="/project_1_1779118457708.png" alt="Enterprise Scale Architecture" fill className="object-cover" />
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-sm uppercase tracking-[0.2em] font-medium text-accent mb-6">Enterprise Scale & Culture</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-light leading-tight mb-8">
              We operate at the intersection of extreme scale and microscopic detail.
            </h3>
            <p className="text-muted-foreground font-light leading-relaxed mb-6">
              Our culture is built on a foundation of intellectual rigor. We employ over 200 of the world's finest parametric engineers, landscape architects, and urban planners. Every team member is deeply trained in enterprise risk mitigation and lifecycle sustainability.
            </p>
            <p className="text-muted-foreground font-light leading-relaxed mb-10">
              When an enterprise chooses Admire Architects, they are backed by a culture that refuses to compromise on structural reality.
            </p>

            <div className="flex gap-12">
              <div>
                <div className="text-4xl font-serif text-primary mb-2">200+</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Specialized Experts</div>
              </div>
              <div>
                <div className="text-4xl font-serif text-primary mb-2">24/7</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Global Operations</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
