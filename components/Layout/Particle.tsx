/** @format */

import React, { useCallback } from "react";
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

const Particle = ({theme}: {theme: string}) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      await console.log(container);
    },
    []
  );
  return (
    <Particles
      id="tsparticles"
      style={{ "position": "fixed", "width": "100%", "height": "100%" }}
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          image: theme == "dark" ? "radial-gradient(rgb(36, 94, 36), rgb(12, 27, 22))": "radial-gradient(rgb(119, 255, 201), rgb(75, 255, 240))",
        },
        fpsLimit: 30,
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
              quantity: 4,
            },
            repulse: {
              distance: 150,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: theme == "dark" ? ["#01ffff", "#01ff80"] : ["#184747", "#103522"],
          },
          links: {
            color: theme == "dark" ? "#65fffa" : "#013e3c",
            distance: 100,
            enable: true,
            opacity: 0.4,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 3,
            straight: false,
          },
          number: {
            value: 150,
            density: {
              enable: true,
              area: 900,
            },
          },
          opacity: {
            value: { min: 0.1, max: 0.8 },
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