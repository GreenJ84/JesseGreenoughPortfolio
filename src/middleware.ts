// middleware.ts
import { NextResponse, NextRequest } from 'next/server'

import { verifyAuth } from './app/_actions/auth'

export async function middleware(request: NextRequest) {
  const authorized = await verifyAuth();
  // Redirect if already logged in and accessing login page
  if (request.nextUrl.pathname === '/admin/login') {
    return authorized.isValid ?
      NextResponse.redirect(new URL('/admin/dashboard', request.url))
      : NextResponse.next();
  }
  // If trying to access protected routes without token
  if (request.nextUrl.pathname.startsWith('/admin') && !authorized.isValid) {
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