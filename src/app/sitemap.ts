import type { MetadataRoute } from 'next';
import { APP_URL } from './(portfolio)/sharedMetadata';

// Only public, canonical pages belong in the index; admin and APIs stay out.
const pages = ['/', '/about', '/skills', '/projects', '/education', '/work', '/resumes'];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(path => ({ url: `${APP_URL}${path}` }));
}
