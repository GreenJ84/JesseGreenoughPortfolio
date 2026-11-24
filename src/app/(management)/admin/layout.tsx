import React from 'react';
import { connection } from 'next/server';

import { AppContextProvider } from '@/app/_utils/AppContext';

import '@/styles/globals.css';
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
