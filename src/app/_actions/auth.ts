'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET
);

export async function loginAction(formData: FormData) {
  try {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    // Validate credentials
    if (username !== process.env.ADMIN_USERNAME! || password !== process.env.ADMIN_PASSWORD!) {
      return {
        success: false,
        message: 'Invalid credentials'
      }
    }
    // Create JWT token
    const token = await new SignJWT({
      username,
      role: 'admin',
      iat: Math.floor(Date.now() / 1000),
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(JWT_SECRET);
    // Set cookie
    cookies().set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/',
    });
    // Success redirect
    redirect('/admin/dashboard');

  } catch (error) {

    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error
    }
    console.error('Login error:', error)
    return {
      success: false,
      message: 'Internal server error'
    }
  }
}

export async function logoutAction() {
  // Clear the cookie
  cookies().set('admin-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0, // Expire immediately
    path: '/',
  });

  // Redirect to login
  redirect('/admin/login');
}

export async function verifyAuth() {
  try {
    const token = cookies().get('admin-token')?.value;
    // Missing tokens unauthorized
    if (!token) {
      return { isValid: false };
    }
    // Verify the JWT token
    const { payload } = await jwtVerify(token, JWT_SECRET);
    // Valid token
    return {
      isValid: true,
      user: {
        username: payload.username,
        role: payload.role,
        iat: payload.iat
      }
    };

  } catch (error) {

    console.error('Auth verification error:', error);
    return { isValid: false };
  }
}