'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const AmbientBackground = dynamic(() => import('./AmbientBackground'), { ssr: false });

export default function LazyAmbientBackground() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(() => setReady(true), { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(() => setReady(true), 1200);
    return () => clearTimeout(id);
  }, []);
  return ready ? <AmbientBackground /> : null;
}
