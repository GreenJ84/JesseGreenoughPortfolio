/** @format */

// TODO: Implement streaming and preloading where needed in the application
import React from 'react';
import { Metadata, Viewport } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { AppContextProvider } from '../_utils/AppContext';
import Navbar from './_layout/Navbar/Navbar';
import VisitorTracker from './_layout/VisitorTracker';

// Styles
import '../../styles/globals.css';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en-US'>
      <body>
        <AppContextProvider>
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
  publisher: 'Vercel',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: 'https://res.cloudinary.com/portfolio-g84/image/upload/v1690310979/personal/TrippyFrens1.jpg',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
