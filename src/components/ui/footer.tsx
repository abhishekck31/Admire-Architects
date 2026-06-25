"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Blocks, Handshake, Scale, Webhook, CodeXml, CreditCard } from "lucide-react";

export const Footer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("pt-24 border-t border-border bg-background z-50 relative", className)}
        {...props}
      >
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <a href="#" className="text-xl font-semibold font-serif">
                Admire Architects
              </a>
              <p className="text-sm text-foreground/60 mt-2 max-w-sm">
                Shaping the physical environment of global enterprises through relentless engineering, absolute minimalism, and visionary design.
              </p>

              <p className="text-sm font-light text-foreground/55 mt-6">
                <a
                  className="hover:text-foreground/90 transition-colors"
                  target="_blank"
                  href="https://linkedin.com"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                {" • "}
                <a
                  className="hover:text-foreground/90 transition-colors"
                  target="_blank"
                  href="https://instagram.com"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
                {" • "}
                <a
                  className="hover:text-foreground/90 transition-colors"
                  target="_blank"
                  href="https://twitter.com"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </p>
            </div>

            <div className="grid grid-cols-2 mt-16 md:grid-cols-3 lg:col-span-8 lg:justify-items-end lg:mt-0">
              <div className="last:mt-12 md:last:mt-0">
                <h3 className="text-sm font-semibold uppercase tracking-wider">Our Work</h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <a href="/projects" className="text-sm transition-all text-foreground/60 hover:text-foreground/90 group flex items-center">
                      <Blocks className="inline stroke-2 h-4 w-4 mr-2 transition-all stroke-foreground/60 group-hover:stroke-foreground/90" />
                      Projects
                    </a>
                  </li>
                  <li>
                    <a href="/clients" className="text-sm transition-all text-foreground/60 hover:text-foreground/90 group flex items-center">
                      <Handshake className="inline stroke-2 h-4 w-4 mr-2 transition-all stroke-foreground/60 group-hover:stroke-foreground/90" />
                      Clients
                    </a>
                  </li>
                </ul>
              </div>

              <div className="last:mt-12 md:last:mt-0">
                <h3 className="text-sm font-semibold uppercase tracking-wider">Company</h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <a href="/about" className="text-sm transition-all text-foreground/60 hover:text-foreground/90 group flex items-center">
                      <Scale className="inline stroke-2 h-4 w-4 mr-2 transition-all stroke-foreground/60 group-hover:stroke-foreground/90" />
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="/services" className="text-sm transition-all text-foreground/60 hover:text-foreground/90 group flex items-center">
                      <Webhook className="inline stroke-2 h-4 w-4 mr-2 transition-all stroke-foreground/60 group-hover:stroke-foreground/90" />
                      Services
                    </a>
                  </li>
                  <li>
                    <a href="/process" className="text-sm transition-all text-foreground/60 hover:text-foreground/90 group flex items-center">
                      <CodeXml className="inline stroke-2 h-4 w-4 mr-2 transition-all stroke-foreground/60 group-hover:stroke-foreground/90" />
                      Process
                    </a>
                  </li>
                </ul>
              </div>

              <div className="last:mt-12 md:last:mt-0 mt-12 md:mt-0">
                <h3 className="text-sm font-semibold uppercase tracking-wider">Contact</h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <a href="/contact" className="text-sm transition-all text-foreground/60 hover:text-foreground/90 group flex items-center">
                      <CreditCard className="inline stroke-2 h-4 w-4 mr-2 transition-all stroke-foreground/60 group-hover:stroke-foreground/90" />
                      Get in Touch
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-20 border-t border-border pt-6 pb-8">
            <p className="text-xs text-foreground/55 text-center md:text-left">Admire Architects Pvt Ltd © 2024. All rights reserved.</p>
          </div>
        </div>
      </div>
    );
  }
);

Footer.displayName = "Footer";
