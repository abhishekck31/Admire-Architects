import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Project photography is displayed large — allow the higher quality step
    // used by the gallery/hero images alongside the default.
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
