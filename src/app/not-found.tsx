import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  // A 404 that gets indexed is worse than one that does not exist.
  robots: { index: false, follow: true },
};

const SUGGESTIONS = [
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex items-center">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-32">
        <div className="text-[10px] uppercase tracking-[0.3em] text-accent mb-6">
          Error 404
        </div>

        <h1 className="text-5xl md:text-8xl font-serif font-light leading-[1] tracking-tighter mb-8">
          This page isn&rsquo;t here
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl leading-relaxed mb-16">
          The link may be out of date, or the page may have moved. Everything
          else is still where you left it.
        </p>

        <nav
          aria-label="Suggested pages"
          className="flex flex-wrap gap-x-10 gap-y-4 mb-16"
        >
          {SUGGESTIONS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-sm uppercase tracking-[0.2em] font-light text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-brand-blue-light transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="inline-flex items-center gap-4 text-sm uppercase tracking-[0.2em] bg-foreground text-background px-10 py-5 hover:bg-muted hover:text-foreground transition-colors duration-500"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
