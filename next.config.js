/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  swcMinify: true,
  images: {
    domains: [
      "github.com",
      "raw.githubusercontent.com",
      "imgs.search.brave.com",
      "media.glassdoor.com",
      "trufflesuite.com",
    ],
    minimumCacheTTL: 60,
  },
  env: {
    
  }
};

module.exports = nextConfig;
