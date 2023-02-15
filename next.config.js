/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "github.com",
      "raw.githubusercontent.com",
      "imgs.search.brave.com",
      "media.glassdoor.com",
      "trufflesuite.com",
    ],
  },
};

module.exports = nextConfig;
