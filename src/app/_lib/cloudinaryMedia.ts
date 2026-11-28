import 'server-only';
import sharp from 'sharp';

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
export const CLOUDINARY_CLOUD = process.env.CLOUDINARY_CLOUD_NAME?.trim() ?? '';

function cloudName(): string {
  if (!/^[a-z0-9_-]+$/i.test(CLOUDINARY_CLOUD)) throw new MediaConfigurationError('Cloudinary media is not configured');
  return CLOUDINARY_CLOUD;
}

function apiBase(): string {
  return `https://api.cloudinary.com/v1_1/${cloudName()}`;
}

export type PortfolioImage = { publicId: string; url: string; width: number; height: number };

export class MediaConfigurationError extends Error {}
export class MediaInputError extends Error {}

function authorization(): string {
  cloudName();
  const key = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;
  if (!key || !secret) throw new MediaConfigurationError('Cloudinary media is not configured');
  return `Basic ${Buffer.from(`${key}:${secret}`).toString('base64')}`;
}

export function portfolioImage(value: unknown): PortfolioImage {
  const cloud = cloudName();
  if (!value || typeof value !== 'object') throw new Error('Invalid media response');
  const item = value as Record<string, unknown>;
  if (typeof item.public_id !== 'string' || typeof item.secure_url !== 'string') throw new Error('Invalid media response');
  const url = new URL(item.secure_url);
  if (url.origin !== 'https://res.cloudinary.com' || url.username || url.password || url.pathname.startsWith(`/${cloud}/image/upload/`) === false || url.search || url.hash) throw new Error('Unexpected media URL');
  return { publicId: item.public_id, url: item.secure_url, width: Number(item.width) || 0, height: Number(item.height) || 0 };
}

export async function listPortfolioImages(cursor?: string): Promise<{ images: PortfolioImage[]; nextCursor?: string }> {
  if (cursor && !/^[A-Za-z0-9_-]{1,2048}$/.test(cursor)) throw new MediaInputError('Invalid page cursor');
  const url = new URL(`${apiBase()}/resources/image/upload`);
  url.searchParams.set('max_results', '60');
  if (cursor) url.searchParams.set('next_cursor', cursor);
  const response = await fetch(url, { headers: { Authorization: authorization() }, cache: 'no-store', signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error('Could not load Cloudinary images');
  const result = await response.json() as { resources?: unknown[]; next_cursor?: unknown };
  if (!Array.isArray(result.resources)) throw new Error('Invalid media response');
  return {
    images: result.resources.map(portfolioImage),
    ...(typeof result.next_cursor === 'string' ? { nextCursor: result.next_cursor } : {}),
  };
}

export async function uploadPortfolioImage(bytes: Uint8Array): Promise<PortfolioImage> {
  if (!bytes.length || bytes.length > MAX_IMAGE_BYTES) throw new MediaInputError('Choose an image smaller than 5 MB');
  let image: Buffer;
  try {
    const source = sharp(Buffer.from(bytes), { limitInputPixels: 40_000_000 });
    const metadata = await source.metadata();
    if (!metadata.width || !metadata.height || !['jpeg', 'png', 'webp'].includes(metadata.format)) throw new MediaInputError('Choose a JPEG, PNG, or WebP image');
    image = await source.rotate().resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true }).webp({ quality: 84 }).toBuffer();
  } catch (error) {
    if (error instanceof MediaInputError) throw error;
    throw new MediaInputError('The image could not be processed');
  }
  const form = new FormData();
  form.set('file', new Blob([new Uint8Array(image)], { type: 'image/webp' }), 'portfolio-image.webp');
  form.set('folder', 'portfolio-admin');
  const response = await fetch(`${apiBase()}/image/upload`, { method: 'POST', headers: { Authorization: authorization() }, body: form, signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error('Could not upload image to Cloudinary');
  return portfolioImage(await response.json());
}
