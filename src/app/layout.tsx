/** @format */

import React from 'react';
import dynamic from 'next/dynamic';
import { Metadata, Viewport } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';

// import { AppContextProvider } from './_utils/AppContext';
// import Navbar from './_components/Layout/Navbar/Navbar';
// const Footer = dynamic(() => import('./_components/Layout/Footer/Footer'));

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
        {/*
          <AppContextProvider>
            <Navbar />
            {children}
            <Footer />
          </AppContextProvider>
        */}

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

// Application Metadata
const META_TITLE = "Jesse Greenough's Development Portfolio";
const META_DESCRIPTION =
  'View the Technical Development Skills possessed by Full Stack Engineer Jesse Greenough';
const META_KEYWORDS = [
  'Jesse Greenough',
  'Software',
  'Developer',
  'Engineer',
  'Full-Stack',
  'Portfolio',
  'Next.js',
  'React',
  'TypeScript',
];
const META_URL = 'https://jesse-greenough-portfolio.vercel.app/';
const META_PORTRAIT =
  'https://res.cloudinary.com/portfolio-g84/image/upload/v1690310921/personal/personal_portrait.jpg';
const META_ICON =
  'https://res.cloudinary.com/portfolio-g84/image/upload/v1690310979/personal/TrippyFrens1.jpg';

export const metadata: Metadata = {
  applicationName: 'Developer Portfolio',
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
  metadataBase: new URL(META_URL),
  alternates: {
    canonical: '/',
  },
  title: META_TITLE,
  description: META_DESCRIPTION,
  keywords: META_KEYWORDS,
  icons: {
    icon: META_ICON,
  },
  openGraph: {
    title: META_TITLE,
    description: META_DESCRIPTION,
    url: META_URL,
    siteName: META_TITLE,
    images: [
      {
        url: META_PORTRAIT,
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: META_URL,
    title: META_TITLE,
    description: META_DESCRIPTION,
    creator: '@GoodGreens84',
    images: {
      url: META_PORTRAIT,
      alt: 'Jesse Greenough',
    },
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
  appLinks: {
    web: {
      url: META_URL,
      should_fallback: true,
    },
  },
};
