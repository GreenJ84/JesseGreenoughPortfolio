import { requireOwnerPage } from '@/app/_security/ownerPage';
import React from 'react'

import Navigation from '../_components/Navigation';

import '@/styles/globals.css';

export default async function DataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireOwnerPage();
  return (<>
    <Navigation />
    {children}
  </>)
}