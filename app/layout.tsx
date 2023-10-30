/**
 * Main App Layout
 *
 * @format
 */

import React from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";


// Custom Components
import AppContextProvider from "../utils/AppContext";
import Particle from "../components/Layout/particle";
import NavBar from "../components/Layout/NavBar";
const Footer = dynamic(() => import("../components/Layout/Footer"));

// Styles
import "../styles/globals.css";

// Application Main Metadata
const META_TITLE = "Jesse Greenough's Development Portfolio";
const META_DESCRIPTION =
  "View the Technical Development Skills possessed by Full Stack Engineer Jesse Greenough";
const META_KEYWORDS = [
  "Jesse Greenough",
  "Software",
  "Developer",
  "Engineer",
  "Full-Stack",
  "Portfolio",
  "Next.js",
  "React",
  "TypeScript",
];
const META_URL = "https://jesse-greenough-portfolio.vercel.app/";
const META_PORTRAIT =
  "https://res.cloudinary.com/portfolio-g84/image/upload/v1690310921/personal/personal_portrait.jpg";
const META_ICON =
  "https://res.cloudinary.com/portfolio-g84/image/upload/v1690310979/personal/TrippyFrens1.jpg";
export const metadata: Metadata = {
  applicationName: "Developer Portfolio",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  authors: [
    { name: "Jesse Greenough", url: "https://linktr.ee/jessegreenough" },
  ],
  creator: "Jesse Greenough",
  publisher: "Vercel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(META_URL),
  alternates: {
    canonical: "/",
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
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: META_URL,
    title: META_TITLE,
    description: META_DESCRIPTION,
    creator: "@GoodGreens84",
    images: {
      url: META_PORTRAIT,
      alt: "Jesse Greenough",
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
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  appLinks: {
    web: {
      url: META_URL,
      should_fallback: true,
    },
  },
};

// Application Viewport
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "rgb(2, 198, 201)" },
    { media: "(prefers-color-scheme: dark)", color: "rgb(12, 43, 33)" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US">
      <body>
        <AppContextProvider>
          <Particle />
          <NavBar />
          {children}
          <Footer />
        </AppContextProvider>
      </body>
    </html>
  );
}
