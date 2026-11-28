'use client';

import { useEffect, useRef } from 'react';
import css from './AmbientBackground.module.css';

type Point = { x: number; y: number; vx: number; vy: number; radius: number };
type NetworkInformation = EventTarget & { saveData?: boolean };

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !context) return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    let width = 0;
    let height = 0;
    let points: Point[] = [];
    let frame = 0;
    let previous = 0;
    let light = document.body.dataset.theme === 'light';

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = width < 760 ? 12 : 28;
      points = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: 1.5 + Math.random() * 1.4,
      }));
    };

    const draw = (move: boolean) => {
      context.clearRect(0, 0, width, height);
      const color = light ? '25, 82, 91' : '126, 224, 188';
      const reach = width < 760 ? 100 : 145;
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        if (move) {
          point.x += point.vx;
          point.y += point.vy;
          if (point.x < 0 || point.x > width) point.vx *= -1;
          if (point.y < 0 || point.y > height) point.vy *= -1;
        }
        for (let j = i + 1; j < points.length; j++) {
          const other = points[j];
          const distance = Math.hypot(point.x - other.x, point.y - other.y);
          if (distance >= reach) continue;
          context.strokeStyle = `rgba(${color}, ${((1 - distance / reach) * (light ? 0.23 : 0.3)).toFixed(3)})`;
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(other.x, other.y);
          context.stroke();
        }
        context.fillStyle = `rgba(${color}, ${light ? 0.45 : 0.55})`;
        context.beginPath();
        context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        context.fill();
      }
    };

    const tick = (time: number) => {
      frame = window.requestAnimationFrame(tick);
      if (time - previous < 1000 / 24) return;
      previous = time;
      draw(true);
    };
    const refresh = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      light = document.body.dataset.theme === 'light';
      draw(false);
      if (!document.hidden && !motion.matches && !connection?.saveData) {
        previous = 0;
        frame = window.requestAnimationFrame(tick);
      }
    };
    const onResize = () => { resize(); refresh(); };
    const observer = new MutationObserver(refresh);
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });
    window.addEventListener('resize', onResize, { passive: true });
    document.addEventListener('visibilitychange', refresh);
    motion.addEventListener('change', refresh);
    connection?.addEventListener?.('change', refresh);
    resize();
    refresh();
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', refresh);
      motion.removeEventListener('change', refresh);
      connection?.removeEventListener?.('change', refresh);
    };
  }, []);

  return <canvas ref={canvasRef} className={css.canvas} aria-hidden="true" />;
}
