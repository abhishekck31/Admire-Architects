"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Catches a render error anywhere under the root layout.
 *
 * Navigation and the footer still render around this, so a visitor who hits it
 * has a way out that is not the back button.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Vercel collects this from the function logs. The digest is what ties a
    // visitor's report back to a specific server-side failure.
    console.error("[error boundary]", error.digest ?? "", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex items-center">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-32">
        <div className="text-[10px] uppercase tracking-[0.3em] text-accent mb-6">
          Something went wrong
        </div>

        <h1 className="text-5xl md:text-8xl font-serif font-light leading-[1] tracking-tighter mb-8">
          We hit a snag
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl leading-relaxed mb-6">
          This page didn&rsquo;t load properly. Trying again usually clears it.
          If it keeps happening, we would like to know &mdash; write to{" "}
          <a
            href="mailto:palani.m@admiregrp.in"
            className="text-foreground hover:text-brand-blue transition-colors"
          >
            palani.m@admiregrp.in
          </a>
          .
        </p>

        {error.digest && (
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground/60 font-mono mb-16">
            Reference: {error.digest}
          </p>
        )}

        <div className="flex flex-wrap gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-4 text-sm uppercase tracking-[0.2em] bg-foreground text-background px-10 py-5 hover:bg-muted hover:text-foreground transition-colors duration-500 cursor-pointer"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-4 text-sm uppercase tracking-[0.2em] border border-border px-10 py-5 hover:border-primary transition-colors duration-500"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
