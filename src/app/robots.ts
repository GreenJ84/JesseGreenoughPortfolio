import type { MetadataRoute } from 'next';
import { APP_URL } from './(portfolio)/sharedMetadata';

export default function robots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV === 'preview') {
    return { rules: { userAgent: '*', disallow: '/' } };
  }
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/api/'] },
    sitemap: `${APP_URL}/sitemap.xml`,
  };
}
