/** @format */

// TODO: Implement streaming and preloading where needed in the application
import React from 'react';
import { connection } from 'next/server';
import { Metadata, Viewport } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { AppContextProvider } from '../_utils/AppContext';
import Navbar from './_layout/Navbar/Navbar';
import LazyAmbientBackground from './_layout/LazyAmbientBackground';
import VisitorTracker from './_layout/VisitorTracker';

// Styles
import '../../styles/globals.css';
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();
  return (
    <html lang='en-US'>
      <body>
        <AppContextProvider>
          <LazyAmbientBackground />
          <Navbar />
          <VisitorTracker />
          {children}
        </AppContextProvider>
        {/* Monitoring */}
        <SpeedInsights />
      </body>
    </html>
  );
}

// Application Viewport
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#d8e5dd' },
    { media: '(prefers-color-scheme: dark)', color: '#091d1b' },
  ],
  colorScheme: 'dark light',
};


export const metadata: Metadata = {
  applicationName: 'Jesse Greenough Portfolio',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  authors: [
    { name: 'Jesse Greenough', url: 'https://linktr.ee/jessegreenough' },
  ],
  creator: 'Jesse Greenough',
  publisher: 'Jesse Greenough',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: { icon: '/icon.svg' },
  robots: {
    index: process.env.VERCEL_ENV !== 'preview',
    follow: process.env.VERCEL_ENV !== 'preview',
    googleBot: {
      index: process.env.VERCEL_ENV !== 'preview',
      follow: process.env.VERCEL_ENV !== 'preview',
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
