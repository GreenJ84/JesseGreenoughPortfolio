'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
const routes = new Set(['/', '/about', '/skills', '/projects', '/education', '/work', '/resumes']);
export default function VisitorTracker() {
  const path = usePathname();
  useEffect(() => {
    if (!path || !routes.has(path) || navigator.doNotTrack === '1') return;
    void fetch('/api/metrics/visit', { method: 'POST', headers: { 'content-type': 'application/json' }, credentials: 'omit', keepalive: true, body: JSON.stringify({ route: path }) }).catch(() => {});
  }, [path]);
  return null;
}
