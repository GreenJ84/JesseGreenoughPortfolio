/** @format */

import React, { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";

const Particle = ({ theme }: { theme: string }) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: -10,
      }}
      options={{
        background: {
          image:
            theme == "dark"
              ? "radial-gradient(rgb(36, 94, 36), rgb(12, 27, 22))"
              : "radial-gradient(rgb(119, 255, 201), rgb(75, 255, 240))",
        },
        fpsLimit: 50,
        interactivity: {
          detectsOn: "window",
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
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
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 6,
            straight: true,
            bounce: true,
          },
          number: {
            value: 200,
            density: {
              enable: true,
              area: 800,
            },
          },
          opacity: {
            value: { min: 0.3, max: 0.6 },
          },
          shape: {
            type: "triangle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default Particle;
