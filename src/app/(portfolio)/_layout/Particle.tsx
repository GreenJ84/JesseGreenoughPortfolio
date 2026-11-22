"use client";
import { useContext, useEffect, useState } from "react";
import type { ComponentType } from "react";
import { AppContext } from "../../_utils/AppContext";

// Keep the gradient available even when animation is disabled or cannot load.
export default function Particle() {
  const { theme } = useContext(AppContext);
  const [Canvas, setCanvas] = useState<ComponentType<{ theme: string; compact: boolean }> | null>(null);
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarse = window.matchMedia('(pointer: coarse)');
    const connection = (navigator as Navigator & { connection?: EventTarget & { saveData?: boolean } }).connection;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const update = () => {
      if (timer) clearTimeout(timer);
      setCompact(coarse.matches || window.innerWidth < 768);
      if (motion.matches || connection?.saveData) { setCanvas(null); return; }
      // Give initial page content and input handlers time to become usable.
      timer = setTimeout(() => {
        void import('./ParticleCanvas').then(module => {
          if (!cancelled && !motion.matches && !connection?.saveData) setCanvas(() => module.default);
        }).catch(() => { /* Decorative animation is optional. */ });
      }, 1500);
    };
    const ready = () => update();
    if (document.readyState === 'complete') update();
    else window.addEventListener('load', ready, { once: true });
    motion.addEventListener('change', update);
    coarse.addEventListener('change', update);
    connection?.addEventListener?.('change', update);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      window.removeEventListener('load', ready);
      motion.removeEventListener('change', update);
      coarse.removeEventListener('change', update);
      connection?.removeEventListener?.('change', update);
    };
  }, []);
  const background = theme === 'dark'
    ? 'radial-gradient(rgb(36, 94, 36), rgb(12, 27, 22))'
    : 'radial-gradient(rgb(119, 255, 201), rgb(75, 255, 240))';
  return <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: -10, background, pointerEvents: 'none' }}>
    {Canvas && <Canvas theme={theme} compact={compact} />}
  </div>;
}
