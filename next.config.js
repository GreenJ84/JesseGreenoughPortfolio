/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
  analyzerMode: 'json',
});

const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
        ...(process.env.NODE_ENV === 'production'
          ? [{ key: 'Strict-Transport-Security', value: 'max-age=31536000' }]
          : []),
      ],
    }];
  },
  images: {
    dangerouslyAllowSVG: false,
    dangerouslyAllowLocalIP: false,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'none'; script-src 'none'; sandbox;",
    localPatterns: [
      { pathname: '/assets/**', search: '' },
      { pathname: '/projectImages/**', search: '' },
      { pathname: '/_next/static/media/**', search: '' },
    ],
    remotePatterns: [
      { protocol: 'https', hostname: 'github.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'imgs.search.brave.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'media.glassdoor.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'trufflesuite.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'res.cloudinary.com', port: '', pathname: '/portfolio-g84/**', search: '' },
    ],
    qualities: [75],
    minimumCacheTTL: 60,
  },
};

module.exports = withBundleAnalyzer(nextConfig);
