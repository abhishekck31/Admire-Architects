"use client";

import { useEffect } from "react";

/**
 * Last resort: an error thrown by the root layout itself.
 *
 * This replaces the whole document, so the layout's fonts and stylesheet are
 * not loaded here. Everything is inlined deliberately — a fallback that
 * depends on the thing that just failed is not a fallback.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[global error boundary]", error.digest ?? "", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#0a0a0a",
          color: "#fafafa",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        }}
      >
        <main style={{ maxWidth: "42rem", padding: "2rem 1.5rem", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "0.625rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#179FB7",
              marginBottom: "1.5rem",
            }}
          >
            Something went wrong
          </p>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              margin: "0 0 1.5rem",
            }}
          >
            We hit a snag
          </h1>

          <p
            style={{
              fontSize: "1.125rem",
              fontWeight: 300,
              lineHeight: 1.7,
              color: "rgba(250,250,250,0.7)",
              margin: "0 0 2rem",
            }}
          >
            The site failed to load. Please try again, or write to{" "}
            <a href="mailto:palani.m@admiregrp.in" style={{ color: "#fafafa" }}>
              palani.m@admiregrp.in
            </a>{" "}
            if it keeps happening.
          </p>

          {error.digest && (
            <p
              style={{
                fontSize: "0.75rem",
                fontFamily: "ui-monospace, monospace",
                letterSpacing: "0.1em",
                color: "rgba(250,250,250,0.4)",
                margin: "0 0 2rem",
              }}
            >
              Reference: {error.digest}
            </p>
          )}

          <button
            onClick={reset}
            style={{
              fontSize: "0.875rem",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              background: "#fafafa",
              color: "#0a0a0a",
              border: "none",
              padding: "1.25rem 2.5rem",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
