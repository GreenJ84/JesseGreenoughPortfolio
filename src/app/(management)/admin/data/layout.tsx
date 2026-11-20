import { currentAdmin } from '@/app/_security/session';
import { redirect } from 'next/navigation';
import React from 'react'

import Navigation from '../_components/Navigation';

import '@/styles/globals.css';

export default async function DataLayout({
  children,
}: {
  children: React.ReactElement<any, any>;
}) {
  if (!await currentAdmin()) redirect('/admin/login');
  return (<>
    <Navigation />
    {children}
  </>)
}