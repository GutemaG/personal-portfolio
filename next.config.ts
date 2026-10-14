import type { NextConfig } from "next";

// The site is served from the root of https://birhanu.dev (GitHub Pages custom domain).
// The deploy workflow passes GitHub Pages' base path here, which is empty for a custom
// domain and "/personal-portfolio" if the custom domain is ever removed.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
