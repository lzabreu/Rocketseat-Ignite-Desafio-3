/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // unoptimized: true,
    domains: ['avatars.githubusercontent.com', 'github.com'],
  },
}

module.exports = nextConfig
