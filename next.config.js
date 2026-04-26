/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages deployment via @cloudflare/next-on-pages
  // Static export is NOT used because Keystatic requires server-side API routes.
  // Use `npm run pages:build` to produce the Cloudflare-compatible bundle.

  images: {
    // next/image works in Cloudflare Pages via the Workers runtime
    unoptimized: true,
  },

  // Keystatic reads content from the /content directory at build time
  // and serves its admin UI via /keystatic at runtime.
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', '*.pages.dev'],
    },
  },
};

module.exports = nextConfig;
