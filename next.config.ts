import type { NextConfig } from "next";

// The site is served from https://gutemag.github.io/personal-portfolio/,
// so every route and asset lives under /personal-portfolio in production.
const basePath = process.env.NODE_ENV === "production" ? "/personal-portfolio" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
