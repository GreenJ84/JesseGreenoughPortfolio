import React from 'react';

import { AppContextProvider } from '@/app/_utils/AppContext';

import '../../../styles/globals.css';
export default function RootLayout({
  children,
}: {
  children: React.ReactElement<any, any>;
}) {
  return (
    <html lang="en">
      <body style={{padding: '0'}}>
        <AppContextProvider>
          {children}
        </AppContextProvider>
      </body>
    </html>
  )
}