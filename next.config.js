/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn.cosmicjs.com', 
      'imgix.cosmicjs.com',
      'images.unsplash.com'
    ],
  },
  experimental: {
    typedRoutes: false,
  },
}

module.exports = nextConfig