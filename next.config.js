/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.cosmicjs.com', 'imgix.cosmicjs.com'],
  },
  experimental: {
    typedRoutes: false, // Disable to prevent TypeScript route errors
  },
};

module.exports = nextConfig;