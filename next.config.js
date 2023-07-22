/**
 * @format
 * @type {import('next').NextConfig}
 */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST",
          },
        ],
      },
    ];
  },
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
      "res.cloudinary.com",
    ],
    minimumCacheTTL: 60,
  },
  env: {},
};

module.exports = withBundleAnalyzer(nextConfig);
