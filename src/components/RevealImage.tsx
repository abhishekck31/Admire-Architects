"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function RevealImage({ src, alt, className }: { src: string, alt: string, className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const el = containerRef.current;
    const img = imageRef.current;
    
    if (el && img) {
      // Setup architectural block mask
      gsap.set(el, { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" });
      gsap.set(img, { scale: 1.2 }); // Initial zoomed in state
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 85%", // Trigger right before element fully enters
          toggleActions: "play none none none"
        }
      });
      
      // The reveal animation
      tl.to(el, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 1.6,
        ease: "power4.inOut" // Cinematic slow ease
      }).to(img, {
        scale: 1,
        duration: 2,
        ease: "power3.out"
      }, "-=1.2"); // Overlap scale down with clip mask reveal
    }
  }, []);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        fill
        className="object-cover"
      />
    </div>
  );
}
