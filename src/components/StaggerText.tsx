"use client";

import { motion } from "framer-motion";

export default function StaggerText({ text, className }: { text: string, className?: string }) {
  const words = text.split(" ");
  
  const container: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.1 }
    }
  };
  
  const child: any = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
    hidden: { opacity: 0, y: 30 } // Subtle vertical slide rather than aggressive flying
  };
  
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`flex flex-wrap overflow-hidden ${className}`}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="mr-[0.25em] inline-block">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
