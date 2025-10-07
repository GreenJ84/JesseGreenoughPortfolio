import React from 'react'

import Navigation from '../_components/Navigation';

import '@/styles/globals.css';

export default function DataLayout({
  children,
}: {
  children: React.ReactElement<any, any>;
}) {
  return (<>
    <Navigation />
    {children}
  </>)
}