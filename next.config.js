/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "github.com",
      "imgs.search.brave.com",
      "media.glassdoor.com",
      "trufflesuite.com",
    ],
  },
};

module.exports = nextConfig;
