"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Blocks, Handshake, Images, Scale, Webhook, CodeXml, CreditCard, Mail, Phone, MapPin } from "lucide-react";
import { FiLinkedin, FiInstagram, FiTwitter } from "react-icons/fi";

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com", Icon: FiLinkedin, hoverClass: "hover:bg-[#0A66C2]" },
  { label: "Instagram", href: "https://instagram.com", Icon: FiInstagram, hoverClass: "hover:bg-[#C13584]" },
  { label: "Twitter", href: "https://twitter.com", Icon: FiTwitter, hoverClass: "hover:bg-[#1DA1F2]" },
];

export const Footer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("pt-24 z-50 relative bg-[#0c1a2e]", className)}
        {...props}
      >
        {/* Subtle top edge glow */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#60A5FA]/30 to-transparent" />

        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <a href="#" className="text-xl font-semibold font-serif text-white">
                Admire Architects
              </a>
              <p className="text-sm text-white/50 mt-2 max-w-sm leading-relaxed">
                Shaping the physical environment of global enterprises through relentless engineering, absolute minimalism, and visionary design.
              </p>

              <div className="flex gap-4 mt-6">
                {SOCIAL_LINKS.map(({ label, href, Icon, hoverClass }) => (
                  <a
                    key={label}
                    className={cn(
                      "p-3 rounded-full bg-white/10 text-white/70 ring-1 ring-white/10",
                      "hover:-translate-y-0.5 hover:bg-[#60A5FA] hover:text-white hover:shadow-lg hover:shadow-[#60A5FA]/20 hover:ring-[#60A5FA]/40",
                      "transition-all duration-300 cursor-pointer"
                    )}
                    target="_blank"
                    href={href}
                    rel="noopener noreferrer"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 mt-16 md:grid-cols-3 lg:col-span-8 lg:justify-items-end lg:mt-0">
              <div className="last:mt-12 md:last:mt-0">
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#60A5FA]">Our Work</h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <a href="/projects" className="text-sm transition-all text-white/50 hover:text-white group flex items-center">
                      <Blocks className="inline stroke-2 h-4 w-4 mr-2 transition-all stroke-white/40 group-hover:stroke-white" />
                      Projects
                    </a>
                  </li>
                  <li>
                    <a href="/gallery" className="text-sm transition-all text-white/50 hover:text-white group flex items-center">
                      <Images className="inline stroke-2 h-4 w-4 mr-2 transition-all stroke-white/40 group-hover:stroke-white" />
                      Gallery
                    </a>
                  </li>
                  <li>
                    <a href="/clients" className="text-sm transition-all text-white/50 hover:text-white group flex items-center">
                      <Handshake className="inline stroke-2 h-4 w-4 mr-2 transition-all stroke-white/40 group-hover:stroke-white" />
                      Clients
                    </a>
                  </li>
                </ul>
              </div>

              <div className="last:mt-12 md:last:mt-0">
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#60A5FA]">Company</h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <a href="/about" className="text-sm transition-all text-white/50 hover:text-white group flex items-center">
                      <Scale className="inline stroke-2 h-4 w-4 mr-2 transition-all stroke-white/40 group-hover:stroke-white" />
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="/services" className="text-sm transition-all text-white/50 hover:text-white group flex items-center">
                      <Webhook className="inline stroke-2 h-4 w-4 mr-2 transition-all stroke-white/40 group-hover:stroke-white" />
                      Services
                    </a>
                  </li>
                  <li>
                    <a href="/process" className="text-sm transition-all text-white/50 hover:text-white group flex items-center">
                      <CodeXml className="inline stroke-2 h-4 w-4 mr-2 transition-all stroke-white/40 group-hover:stroke-white" />
                      Process
                    </a>
                  </li>
                </ul>
              </div>

              <div className="last:mt-12 md:last:mt-0 mt-12 md:mt-0">
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#60A5FA]">Contact</h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <a href="/contact" className="text-sm transition-all text-white/50 hover:text-white group flex items-center">
                      <CreditCard className="inline stroke-2 h-4 w-4 mr-2 transition-all stroke-white/40 group-hover:stroke-white" />
                      Get in Touch
                    </a>
                  </li>
                  <li>
                    <a href="mailto:palani.m@admiregrp.in" className="text-sm transition-all text-white/50 hover:text-white group flex items-center">
                      <Mail className="inline stroke-2 h-4 w-4 mr-2 transition-all stroke-white/40 group-hover:stroke-white" />
                      palani.m@admiregrp.in
                    </a>
                  </li>
                  <li>
                    <a href="tel:9448370989" className="text-sm transition-all text-white/50 hover:text-white group flex items-center">
                      <Phone className="inline stroke-2 h-4 w-4 mr-2 transition-all stroke-white/40 group-hover:stroke-white" />
                      9448370989
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-20 border-t border-white/10 pt-6 pb-8">
            <p className="text-xs text-white/35 text-center md:text-left">Admire Architects Pvt Ltd © 2026. All rights reserved.</p>
          </div>
        </div>
      </div>
    );
  }
);

Footer.displayName = "Footer";
