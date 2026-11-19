import type { NextConfig } from "next";

/**
 * Static export for Cloudflare Pages.
 * `next build` writes a fully static site to ./out — no Node server required.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
