/** @format */

// TODO: Implement streaming and preloading where needed in the application
import React from 'react';
import dynamic from 'next/dynamic';
import { Metadata, Viewport } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { AppContextProvider } from './_utils/AppContext';
import Navbar from './_layout/Navbar/Navbar';
const Footer = dynamic(() => import('./_layout/Footer/Footer'));
const Particle = dynamic(() => import('./_layout/Particle'));

// Styles
import '../styles/globals.css';
export default function RootLayout({
  children,
}: {
  children: React.ReactElement<any, any>;
}) {
  return (
    <html lang='en-US'>
      <body>
        <AppContextProvider>
          <Navbar />
          {children}
          <Footer />
          <Particle />
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
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'rgb(2, 198, 201)' },
    { media: '(prefers-color-scheme: dark)', color: 'rgb(12, 43, 33)' },
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
