import type { NextConfig } from "next";

/**
 * The backend host, used to allow its uploaded photos through next/image.
 * Derived from BACKEND_URL so there is one place to change it.
 */
const backendHost = process.env.BACKEND_URL
  ? new URL(process.env.BACKEND_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  images: {
    // Project photography is displayed large — allow the higher quality step
    // used by the gallery/hero images alongside the default.
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],

    // Photos uploaded through the dashboard are served from PythonAnywhere,
    // which has no CDN and a small CPU budget. next/image fetches each one
    // once, optimises it, then serves every later request from Vercel's edge
    // cache — so the long TTL here is what keeps the backend out of the hot
    // path. 31 days.
    minimumCacheTTL: 2678400,
    remotePatterns: backendHost
      ? [{ protocol: "https", hostname: backendHost, pathname: "/media/**" }]
      : [],
  },
};

export default nextConfig;
