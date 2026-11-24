import { NextResponse, type NextRequest } from 'next/server';
import { randomUUID } from 'node:crypto';
import { verifySessionToken } from './app/_security/token';

export async function proxy(request: NextRequest) {
  const nonce = Buffer.from(randomUUID()).toString('base64');
  const development = process.env.NODE_ENV === 'development';
  const policy = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://va.vercel-scripts.com${development ? " 'unsafe-eval'" : ''}`,
    `style-src 'self' 'nonce-${nonce}'`,
    "style-src-attr 'none'",
    "img-src 'self' data: blob: https:",
    "font-src 'self'",
    `connect-src 'self' https://github-contributions-api.jogruber.de https://vitals.vercel-insights.com https://*.vercel-insights.com${development ? ' ws: wss:' : ''}`,
    "worker-src 'self' blob:",
    "frame-src 'none'",
  ].join('; ');
  const headers = new Headers(request.headers);
  headers.set('x-nonce', nonce);
  headers.set('Content-Security-Policy', policy);
  let response: NextResponse;
  if (request.nextUrl.pathname.startsWith('/admin')) {
    let authorized = false;
    const token = request.cookies.get('admin-token')?.value;
    if (token) {
      try { await verifySessionToken(token); authorized = true; } catch { /* Signed out. */ }
    }
    if (request.nextUrl.pathname !== '/admin/login' && !authorized) {
      response = NextResponse.redirect(new URL('/admin/login', request.url));
    } else if (request.nextUrl.pathname === '/admin') {
      response = NextResponse.redirect(new URL('/admin/dashboard', request.url));
    } else response = NextResponse.next({ request: { headers } });
  } else response = NextResponse.next({ request: { headers } });
  response.headers.set('Content-Security-Policy', policy);
  return response;
}

export const config = { matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|ico)$).*)'] };
