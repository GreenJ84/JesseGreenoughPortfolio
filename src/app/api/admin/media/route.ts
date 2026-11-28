import { NextRequest, NextResponse } from 'next/server';
import { currentAdmin } from '@/app/_security/session';
import { CLOUDINARY_CLOUD, MAX_IMAGE_BYTES, MediaConfigurationError, MediaInputError, listPortfolioImages, uploadPortfolioImage } from '@/app/_lib/cloudinaryMedia';

export const runtime = 'nodejs';
const maxRequestBytes = MAX_IMAGE_BYTES + 32_768;
const responseHeaders = { 'Cache-Control': 'private, no-store' };
const errorResponse = (message: string, status: number) => NextResponse.json({ error: message }, { status, headers: responseHeaders });

async function owner() {
  const session = await currentAdmin();
  return Boolean(session?.username);
}

export async function GET(request: NextRequest) {
  if (!await owner()) return errorResponse('Unauthorized', 401);
  try {
    const cursor = request.nextUrl.searchParams.get('cursor') || undefined;
    return NextResponse.json(await listPortfolioImages(cursor), { headers: responseHeaders });
  } catch (error) {
    if (error instanceof MediaConfigurationError) return errorResponse('Cloudinary media is not configured', 503);
    return errorResponse(error instanceof MediaInputError ? error.message : 'Unable to load media', error instanceof MediaInputError ? 400 : 502);
  }
}

export async function POST(request: NextRequest) {
  if (!await owner()) return errorResponse('Unauthorized', 401);
  if (request.headers.get('origin') !== request.nextUrl.origin || request.headers.get('sec-fetch-site') === 'cross-site') return errorResponse('Request not allowed', 403);
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.toLowerCase().startsWith('multipart/form-data; boundary=')) return errorResponse('Expected an image upload', 415);
  const length = request.headers.get('content-length');
  if (length && (!/^\d+$/.test(length) || Number(length) > maxRequestBytes)) return errorResponse('Image is too large', 413);
  try {
    if (!request.body) throw new MediaInputError('Choose an image');
    const reader = request.body.getReader();
    const chunks: Uint8Array[] = [];
    let size = 0;
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > maxRequestBytes) { await reader.cancel(); return errorResponse('Image is too large', 413); }
        chunks.push(value);
      }
    } finally { reader.releaseLock(); }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    const upload = new Request(request.url, { method: 'POST', headers: { 'content-type': contentType }, body: bytes });
    const file = (await upload.formData()).get('file');
    if (!(file instanceof File)) throw new MediaInputError('Choose an image');
    if (file.size > MAX_IMAGE_BYTES) return errorResponse('Image is too large', 413);
    const image = await uploadPortfolioImage(new Uint8Array(await file.arrayBuffer()));
    return NextResponse.json({ image, cloud: CLOUDINARY_CLOUD }, { status: 201, headers: responseHeaders });
  } catch (error) {
    if (error instanceof MediaConfigurationError) return errorResponse('Cloudinary media is not configured', 503);
    return errorResponse(error instanceof MediaInputError ? error.message : 'Unable to upload image', error instanceof MediaInputError ? 400 : 502);
  }
}
