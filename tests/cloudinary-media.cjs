const assert = require('node:assert/strict');
const { test } = require('node:test');
const sharp = require('sharp');
const { loadSource, sourcePath } = require('./security-harness.cjs');
const image = { public_id: 'portfolio-admin/sample', secure_url: 'https://res.cloudinary.com/portfolio-g84/image/upload/v1/portfolio-admin/sample.webp', width: 200, height: 100 };

test('Cloudinary media accepts only the configured secure tenant', () => {
  const media = loadSource()('src/app/_lib/cloudinaryMedia.ts');
  assert.equal(media.portfolioImage(image).url, image.secure_url);
  for (const url of [
    'http://res.cloudinary.com/portfolio-g84/image/upload/sample.webp',
    'https://res.cloudinary.com:444/portfolio-g84/image/upload/sample.webp',
    'https://res.cloudinary.com/another-cloud/image/upload/sample.webp',
    'https://res.cloudinary.com/portfolio-g84/image/upload/sample.webp?unsafe=1',
  ]) assert.throws(() => media.portfolioImage({ ...image, secure_url: url }));
});

test('Cloudinary list and upload use server credentials and transform images to WebP', async () => {
  const calls = [];
  const media = loadSource({ fetch: async (url, options) => {
    calls.push({ url: String(url), options });
    if (options.method === 'POST') {
      assert.equal(options.body.get('folder'), 'portfolio-admin');
      assert.equal(options.body.get('file').type, 'image/webp');
      return Response.json(image);
    }
    return Response.json({ resources: [image], next_cursor: 'next_page' });
  } }, { CLOUDINARY_API_KEY: 'test-key', CLOUDINARY_API_SECRET: 'test-secret' })('src/app/_lib/cloudinaryMedia.ts');
  const listed = await media.listPortfolioImages();
  assert.equal(listed.images[0].publicId, image.public_id);
  assert.equal(listed.nextCursor, 'next_page');
  const source = await sharp({ create: { width: 3, height: 3, channels: 3, background: '#00aa88' } }).png().toBuffer();
  assert.equal((await media.uploadPortfolioImage(source)).url, image.secure_url);
  assert.equal(calls.length, 2);
  assert.ok(calls.every(call => call.options.headers.Authorization.startsWith('Basic ')));
  assert.throws(() => media.portfolioImage({ ...image, secure_url: 'https://evil.test/image.webp' }));
  await assert.rejects(media.uploadPortfolioImage(new Uint8Array(0)));
});

test('media routes reject anonymous and cross-origin requests before Cloudinary calls', async () => {
  let calls = 0;
  const mediaMock = {
    CLOUDINARY_CLOUD: 'portfolio-g84', MAX_IMAGE_BYTES: 5 * 1024 * 1024,
    MediaConfigurationError: class extends Error {}, MediaInputError: class extends Error {},
    listPortfolioImages: async () => { calls++; return { images: [] }; },
    uploadPortfolioImage: async () => { calls++; return image; },
  };
  function route(admin) {
    return loadSource({
      'next/server': { NextResponse: Response },
      [sourcePath('src/app/_security/session.ts')]: { currentAdmin: async () => admin },
      [sourcePath('src/app/_lib/cloudinaryMedia.ts')]: mediaMock,
    })('src/app/api/admin/media/route.ts');
  }
  const url = 'https://portfolio.test/api/admin/media';
  const request = (method, headers = {}, body) => {
    const value = new Request(url, { method, headers, body });
    value.nextUrl = new URL(url);
    return value;
  };
  assert.equal((await route(null).GET(request('GET'))).status, 401);
  assert.equal((await route(null).POST(request('POST', { origin: 'https://portfolio.test' }))).status, 401);
  assert.equal((await route({ username: 'owner' }).POST(request('POST', { origin: 'https://other.test' }))).status, 403);
  assert.equal((await route({ username: 'owner' }).POST(request('POST', { origin: url.replace('/api/admin/media', '') }, 'plain'))).status, 415);
  assert.equal(calls, 0);
  assert.equal((await route({ username: 'owner' }).GET(request('GET'))).status, 200);
  assert.equal(calls, 1);
  const form = new FormData();
  form.set('file', new File([new Uint8Array([1, 2, 3])], 'image.png', { type: 'image/png' }));
  assert.equal((await route({ username: 'owner' }).POST(request('POST', { origin: 'https://portfolio.test' }, form))).status, 201);
  assert.equal(calls, 2);
});
