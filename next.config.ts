import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `next build` writes a complete static site to `out/`
  // (HTML, CSS, JS, images, sitemap.xml, robots.txt, 404.html). No Node.js
  // runtime is needed in production — any static file server (Caddy, nginx,
  // object storage) can host it. See deploy/ for the Caddy setup.
  output: "export",

  // This is a fully static content site. Every route is prerendered at build
  // time via classic static generation (`generateStaticParams` + `dynamicParams = false`),
  // so Cache Components (PPR / "use cache") isn't needed.
  cacheComponents: false,

  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    // Static export has no image optimizer, so responsive WebP variants are
    // generated at build time (scripts/optimize-images.mjs) and resolved by a
    // custom loader. `deviceSizes`/`imageSizes` drive the srcset candidates
    // and are aligned with the generated variant widths.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: [640, 768, 1024, 1280, 1600, 1920],
    imageSizes: [256, 384],
    qualities: [60, 75, 85],
  },

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
