/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  swcMinify: true,
  images: {
    // loader: 'custom',
    // loaderFile: './utils/loader.ts',
    domains: [
      "github.com",
      "raw.githubusercontent.com",
      "imgs.search.brave.com",
      "media.glassdoor.com",
      "trufflesuite.com",
      "res.cloudinary.com"
    ],
    minimumCacheTTL: 60,
  },
  env: {
    
  }
};

module.exports = withBundleAnalyzer(nextConfig);
