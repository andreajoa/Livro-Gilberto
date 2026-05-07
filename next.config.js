/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  serverExternalPackages: ['framer-motion'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.r2.dev' },
    ],
  },
}
module.exports = nextConfig
