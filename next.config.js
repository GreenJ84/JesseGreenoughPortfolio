/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
  analyzerMode: 'json',
});

const cloudinaryCloud = process.env.CLOUDINARY_CLOUD_NAME?.trim();
if (cloudinaryCloud && !/^[a-z0-9_-]+$/i.test(cloudinaryCloud)) {
  throw new Error('CLOUDINARY_CLOUD_NAME must be a Cloudinary cloud identifier');
}

// The portrait is static page content. Its Cloudinary tenant must remain
// optimizable even when an admin-media tenant is not configured for a preview.
const portraitUrl = require('./src/app/(portfolio)/portrait.json').url;
let portraitCloud;
try {
  const url = new URL(portraitUrl);
  const tenant = url.pathname.split('/')[1];
  if (url.protocol === 'https:' && url.hostname === 'res.cloudinary.com' && !url.username && !url.password && !url.search && !url.hash && /^[a-z0-9_-]+$/i.test(tenant)) {
    portraitCloud = tenant;
  }
} catch {
  // A fork may use a local portrait; it needs no remote image pattern.
}
const cloudinaryImageTenants = [...new Set([portraitCloud, cloudinaryCloud].filter(Boolean))];

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
      ...cloudinaryImageTenants.map(tenant => ({ protocol: 'https', hostname: 'res.cloudinary.com', port: '', pathname: `/${tenant}/**`, search: '' })),
    ],
    qualities: [75],
    minimumCacheTTL: 60,
  },
};

module.exports = withBundleAnalyzer(nextConfig);
