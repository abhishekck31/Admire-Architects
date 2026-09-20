"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence, Variants, useInView, useMotionValue, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { FiArrowRight, FiMenu } from "react-icons/fi";
import Hero from "@/components/Hero";
import type { Project } from "@/data/projects";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

function AnimatedCounter({ value, label }: { value: string, label: string }) {
  const numMatch = value.match(/\d+/);
  const suffix = value.replace(/\d+/g, '');
  const targetNumber = numMatch ? parseInt(numMatch[0], 10) : 0;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    if (isInView) {
      animate(count, targetNumber, { duration: 2.5, ease: "easeOut" });
    }
  }, [isInView, count, targetNumber]);

  return (
    <motion.div ref={ref} variants={fadeUp} className="flex flex-col items-center justify-center">
      <div className="text-5xl md:text-6xl font-serif font-light text-primary mb-4 flex items-center">
        <motion.span>{rounded}</motion.span>
        <span>{suffix}</span>
      </div>
      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground text-center">{label}</div>
    </motion.div>
  );
}

export default function HomeClient({ projects }: { projects: Project[] }) {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-clip font-sans">



      <Hero />

      {/* Statistics Section */}
      <section className="py-24 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center items-center justify-center"
          >
            {[
              { number: "20+", label: "Years of Excellence" },
              { number: "250+", label: "Projects Delivered" },
              { number: "40+", label: "Enterprise Clients" }
            ].map((stat, i) => (
              <AnimatedCounter key={i} value={stat.number} label={stat.label} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enterprise Clients Showcase */}
      <section className="pt-32 pb-16 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
          <motion.h3
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-lg md:text-xl uppercase tracking-[0.2em] text-muted-foreground text-center md:text-left mb-12"
          >
            Trusted by Industry Leaders
          </motion.h3>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-10 md:gap-x-12 md:gap-y-14 items-center justify-items-center transition-all duration-1000"
          >
            {[
              { name: "Table Space", src: "/ClientLogosImgs/tablespace.png" },
              { name: "Schneider Electric", src: "/ClientLogosImgs/schneiderelectric.png" },
              { name: "Genpact", src: "/ClientLogosImgs/genpact.png" },
              { name: "HP", src: "/ClientLogosImgs/hp.png" },
              { name: "IBM", src: "/ClientLogosImgs/ibm.png" },
              { name: "Wipro", src: "/ClientLogosImgs/wipro.png" },
              { name: "Airtel", src: "/ClientLogosImgs/airtel.png" },
              { name: "Blueprint", src: "/ClientLogosImgs/blueprint.png" },
              { name: "Cisco", src: "/ClientLogosImgs/cisco.png" },
              { name: "Concentrix", src: "/ClientLogosImgs/concentrix.png" },
              { name: "Cognizant", src: "/ClientLogosImgs/congizant.png" },
              { name: "Daimler Truck", src: "/ClientLogosImgs/daimlertruck.png" },
              { name: "Dell", src: "/ClientLogosImgs/dell.png" },
              { name: "Emids", src: "/ClientLogosImgs/emids.png" },
              { name: "Goldman Sachs", src: "/ClientLogosImgs/goldmanSachs.png" },
              { name: "Mercedes-Benz", src: "/ClientLogosImgs/mercedesbenz.png" },
              { name: "Nexxer", src: "/ClientLogosImgs/nexxer.png" },
              { name: "Nokia", src: "/ClientLogosImgs/nokia.png" },
              { name: "ParentPay", src: "/ClientLogosImgs/parentpay.png" },
              { name: "Quickplay", src: "/ClientLogosImgs/quickplay.png" },
              { name: "Target", src: "/ClientLogosImgs/target.png" },
              { name: "Zitro", src: "/ClientLogosImgs/zitro.png" },
            ].map((client, i) => (
              <motion.div key={i} variants={fadeUp} className="relative w-full aspect-[600/260] group hover:scale-105 transition-transform duration-300">
                <Image src={client.src} alt={client.name} fill sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, 260px" className="object-contain" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Philosophy Intro */}
      <section className="py-40 bg-card">
        <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-light leading-[1.2] tracking-tight mb-12 text-primary"
          >
            "Architecture is the physical manifestation of corporate ambition. We strip away the non-essential to reveal the profound."
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <Link href="/about" className="text-xs uppercase tracking-[0.2em] border-b border-primary pb-2 hover:text-muted-foreground hover:border-muted-foreground transition-colors duration-500">
              Read Our Manifesto
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-40 bg-background">
        <div className="px-6 md:px-16 lg:px-24 mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-5xl md:text-7xl font-serif font-light tracking-tight">Selected Works</h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <Link href="/projects" className="uppercase tracking-[0.2em] text-xs border-b border-foreground pb-2 hover:text-muted-foreground hover:border-muted-foreground transition-colors duration-500">
              View Complete Portfolio
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32 px-6 md:px-16 lg:px-24">
          {Array.from(new Map(projects.filter(p => p.image).map(p => [p.title, p])).values()).slice(0, 2).map((project, index) => (
            <Link href={`/projects/${project.id}`} key={project.id}>
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: index % 2 === 0 ? 0 : 0.2 }}
                className={`group cursor-pointer ${index % 2 !== 0 ? 'md:mt-48' : ''}`}
              >
                <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden mb-8 bg-secondary rounded-xl">
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={90}
                      className="object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-serif font-light mb-3 text-black group-hover:text-[#60A5FA] transition-colors">{project.title}</h3>
                    <p className="text-gray-500 uppercase tracking-[0.2em] text-xs">{project.location}{project.area ? ` / ${project.area}` : ""}</p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Services / Expertise */}
      <section className="py-20 md:py-40 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-12 md:mb-20"
          >
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif font-light tracking-tight">Our Expertise</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                number: "01",
                title: "Master Planning",
                desc: "Strategic urban and corporate campus planning that integrates seamlessly with surrounding environments.",
                boxStyle: "bg-[#179FB7] text-white hover:bg-[#138A9E] shadow-lg hover:shadow-2xl hover:shadow-[#179FB7]/30 border-transparent",
                numStyle: "text-white/80 font-bold",
                titleStyle: "text-white",
                descStyle: "text-white/90"
              },
              {
                number: "02",
                title: "Commercial Architecture",
                desc: "Iconic corporate headquarters engineered for sustainability, scalability, and profound visual impact.",
                boxStyle: "bg-[#E09D00] text-white hover:bg-[#C98C00] shadow-lg hover:shadow-2xl hover:shadow-[#E09D00]/30 border-transparent",
                numStyle: "text-white/85 font-bold",
                titleStyle: "text-white",
                descStyle: "text-white/90"
              },
              {
                number: "03",
                title: "Interior Architecture",
                desc: "Precision-crafted internal spaces that enhance enterprise productivity while exuding quiet luxury.",
                boxStyle: "bg-[#F36900] text-white hover:bg-[#D95D00] shadow-lg hover:shadow-2xl hover:shadow-[#F36900]/30 border-transparent",
                numStyle: "text-white/80 font-bold",
                titleStyle: "text-white",
                descStyle: "text-white/90"
              }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={`w-full min-h-[auto] sm:min-h-[220px] p-6 sm:p-8 md:p-10 rounded-2xl ${service.boxStyle} transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  <div className={`text-xs uppercase tracking-[0.2em] mb-4 sm:mb-6 ${service.numStyle}`}>
                    {service.number}
                  </div>
                  <h3 className={`text-2xl sm:text-3xl font-serif font-light mb-4 sm:mb-6 ${service.titleStyle}`}>
                    {service.title}
                  </h3>
                  <p className={`font-light leading-relaxed text-sm sm:text-base ${service.descStyle}`}>
                    {service.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-40 bg-background overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif font-light tracking-tight mb-6 md:mb-12">The Methodology</h2>
              <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed mb-8 md:mb-12 max-w-lg">
                We approach every project as a structural puzzle. From the initial conceptual sketches to the final steel beam, our process is defined by absolute precision.
              </p>
              <Link href="/expertise/process" className="inline-flex items-center gap-4 text-xs uppercase tracking-[0.2em] border-b border-primary pb-2 hover:text-muted-foreground hover:border-muted-foreground transition-colors duration-500">
                Explore The Process <FiArrowRight />
              </Link>
            </motion.div>

            <div className="flex flex-col gap-4 sm:gap-5 w-full">
              {[
                { 
                  step: "01", 
                  title: "Site & Scale Analysis", 
                  text: "Evaluating environmental impact, spatial flow, and enterprise requirements.",
                  bg: "bg-[#179FB7] text-white shadow-md hover:shadow-xl hover:shadow-[#179FB7]/30 hover:bg-[#138A9E]",
                  numColor: "text-white/80 font-bold",
                  titleColor: "text-white",
                  textColor: "text-white/90"
                },
                { 
                  step: "02", 
                  title: "Conceptual Geometry", 
                  text: "Translating corporate vision into foundational architectural forms.",
                  bg: "bg-[#E09D00] text-white shadow-md hover:shadow-xl hover:shadow-[#E09D00]/30 hover:bg-[#C98C00]",
                  numColor: "text-white/85 font-bold",
                  titleColor: "text-white",
                  textColor: "text-white/90"
                },
                { 
                  step: "03", 
                  title: "Parametric Engineering", 
                  text: "Validating structural integrity through advanced BIM and digital twins.",
                  bg: "bg-[#95B00F] text-white shadow-md hover:shadow-xl hover:shadow-[#95B00F]/30 hover:bg-[#839B0D]",
                  numColor: "text-white/85 font-bold",
                  titleColor: "text-white",
                  textColor: "text-white/90"
                },
                { 
                  step: "04", 
                  title: "Execution & Delivery", 
                  text: "Orchestrating global contractors to ensure flawless material execution.",
                  bg: "bg-[#F36900] text-white shadow-md hover:shadow-xl hover:shadow-[#F36900]/30 hover:bg-[#D95D00]",
                  numColor: "text-white/80 font-bold",
                  titleColor: "text-white",
                  textColor: "text-white/90"
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`w-full min-h-[auto] sm:min-h-[165px] p-6 sm:p-7 md:p-8 rounded-2xl ${item.bg} shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between`}
                >
                  <div className={`text-xs uppercase tracking-[0.2em] mb-2 sm:mb-3 ${item.numColor}`}>
                    {item.step}
                  </div>
                  <h4 className={`text-xl sm:text-2xl font-serif font-light mb-2 ${item.titleColor}`}>
                    {item.title}
                  </h4>
                  <p className={`font-light text-sm leading-relaxed ${item.textColor}`}>
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-40 bg-card border-y border-border flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="mb-12 text-accent">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="mx-auto opacity-50">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <p className="text-2xl md:text-5xl font-serif font-light leading-[1.3] mb-12">
              "Admire Architects didn't just design our workspace; they physically manifested our enterprise's operational identity into steel and glass. Absolute visionaries."
            </p>
            <div className="text-xs uppercase tracking-[0.2em]">
              <strong className="font-medium text-foreground block mb-1">Director, Corporate Real Estate</strong>
              <span className="text-muted-foreground">Fortune 500 Technology Partner</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-48 bg-[#ffffff] text-[#000000] text-center px-6 relative overflow-hidden">
        {/* Faint architectural grid background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#000000 1px, transparent 1px), linear-gradient(90deg, #000000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto relative z-10"
        >
          <motion.h2 variants={fadeUp} className="text-5xl md:text-[6rem] font-serif font-light mb-12 leading-[1.1]">
            Ready to build <br /> <span className="italic text-[#60A5FA]">your legacy?</span>
          </motion.h2>
          <motion.div variants={fadeUp}>
            <Link href="/contact" className="inline-block border-b border-black/30 pb-4 text-sm md:text-xl uppercase tracking-[0.2em] hover:text-[#60A5FA] hover:border-[#60A5FA] transition-colors duration-500">
              Start a Conversation
            </Link>
          </motion.div>
        </motion.div>
      </section>


    </div>
  );
}
