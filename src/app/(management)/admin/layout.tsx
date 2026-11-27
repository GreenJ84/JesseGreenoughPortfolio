import React from 'react';
import { connection } from 'next/server';
import type { Metadata } from 'next';

import { AppContextProvider } from '@/app/_utils/AppContext';

import '@/styles/globals.css';
export const metadata: Metadata = { robots: { index: false, follow: false } };
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();
  return (
    <html lang="en">
      <body>
        <AppContextProvider>
          {children}
        </AppContextProvider>
      </body>
    </html>
  )
}
