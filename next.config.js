const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', '*.pages.dev', '*.vercel.app'],
    },
  },
  webpack(config) {
    // Shim 'react' so that packages importing the not-yet-stable
    // `useEffectEvent` (e.g. @sanity/vision bundled with sanity v5)
    // don't break the build on React 19.
    config.resolve.alias['react'] = path.resolve(__dirname, 'lib/react-compat.js')
    return config
  },
};

module.exports = nextConfig;
