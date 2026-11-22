"use client";
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
const Activity = dynamic(() => import('./GithubCard'), { ssr: false });

export default function DeferredActivity() {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!host.current) return;
    if (!('IntersectionObserver' in window)) {
      const timer = setTimeout(() => setVisible(true), 0);
      return () => clearTimeout(timer);
    }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: '200px' });
    observer.observe(host.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={host} style={{ minHeight: '700px' }}>
    {visible ? <Activity /> : <section aria-label="Coding activity"><h2>Coding Activity</h2><p>Activity charts load when you scroll here.</p></section>}
  </div>;
}
