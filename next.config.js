/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', '*.vercel.app'],
    },
  },
  // Permanent (308) redirects for the old WordPress site's URL shapes.
  // Old Step Up listings and backlinks still point at these — keep them resolving
  // to current, accurate pages so families don't lose reimbursement paperwork.
  async redirects() {
    return [
      {
        source: '/',
        has: [{ type: 'query', key: 'page_id', value: '44' }],
        destination: '/tuition-scholarship',
        permanent: true,
      },
      {
        source: '/',
        has: [{ type: 'query', key: 'page_id', value: '65' }],
        destination: '/programs',
        permanent: true,
      },
      {
        source: '/wp-content/uploads/:path*',
        destination: '/tuition-scholarship',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
