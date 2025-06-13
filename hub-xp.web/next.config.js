/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    turbo: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ],
  },
};

module.exports = nextConfig; 