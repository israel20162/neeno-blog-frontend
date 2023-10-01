/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [process.env.API_URL,'localhost'],
  },
};

module.exports = nextConfig
