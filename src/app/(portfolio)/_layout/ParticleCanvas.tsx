"use client";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";
let engine: Promise<void> | undefined;
export default function ParticleCanvas({ theme, compact }: { theme: string; compact: boolean }) {
  const [init, setInit] = useState(false);
  useEffect(() => {
    let active = true;
    engine ??= initParticlesEngine(loadSlim);
    void engine.then(() => { if (active) setInit(true); }).catch(() => { engine = undefined; });
    return () => { active = false; };
  }, []);
  const options: ISourceOptions = useMemo(() => ({
        pauseOnBlur: true,
        detectRetina: false,
        fpsLimit: compact ? 20 : 24,
        smooth: true,
        background: {
          image:
            theme == "dark"
              ? "radial-gradient(rgb(36, 94, 36), rgb(12, 27, 22))"
              : "radial-gradient(rgb(119, 255, 201), rgb(75, 255, 240))",
        },
        interactivity: {
          detectsOn: "window",
          events: {
            onClick: {
              enable: false,
              mode: ["push"],
            },
            onHover: {
              enable: !compact,
              mode: ["repulse"],
            },
            resize: {
              enable: true,
              delay: 10,
            },
          },
          modes: {
            push: {
              quantity: 8,
              duration: 1,
            },
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value:
              theme == "dark" ? ["#01ffff", "#01ff80"] : ["#184747", "#103522"],
          },
          links: {
            color: theme == "dark" ? "#65fffa" : "#013e3c",
            distance: 100,
            enable: true,
            opacity: 0.4,
            width: 1,
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: {
              default: 'bounce',
            },
            random: true,
            speed: 1.5,
            straight: true,
            bounce: true,
          },
          number: {
            value: compact ? 18 : 48,
            density: {
              enable: false,
            },
          },
          opacity: {
            value: { min: 0.3, max: 0.6 },
          },
          shape: {
            type: "triangle",
          },
          size: {
            value: { min: 1, max: 4 },
          },
        },
    }), [theme, compact]);

  return init ? <Particles id="tsparticles" options={options} /> : null;
}
