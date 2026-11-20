// middleware.ts
import { NextResponse, NextRequest } from 'next/server'

import { verifySessionToken } from './app/_security/token'

export async function middleware(request: NextRequest) {
  let authorized = false;
  const token = request.cookies.get('admin-token')?.value;
  if (token) {
    try { await verifySessionToken(token); authorized = true; } catch { /* Treat invalid tokens as signed out. */ }
  }
  // Always allow login: a signed token may have been revoked in the session store.
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next();
  }
  // If trying to access protected routes without token
  if (request.nextUrl.pathname.startsWith('/admin') && !authorized) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (request.nextUrl.pathname === '/admin') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}