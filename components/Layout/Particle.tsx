import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Container, Engine } from "tsparticles-engine";

const css = require('./Particle.module.css')

const Particle = () => {
    const particlesInit = useCallback(async (engine: Engine) => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        await console.log(container);
    }, []);

    return (
        <Particles
            id="tsparticles"
            className={css.tsparticles}
            url="http://foo.bar/particles.json"
            init={particlesInit}
            loaded={particlesLoaded}
            params={{
                particles: {
                number: {
                    value: 160,
                    density: {
                    enable: true,
                    value_area: 1500,
                    },
                },
                line_linked: {
                    enable: false,
                    opacity: 0.03,
                },
                move: {
                    direction: "right",
                    speed: 0.05,
                },
                size: {
                    value: 1,
                },
                opacity: {
                    anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.05,
                    },
                },
                },
                interactivity: {
                events: {
                    onclick: {
                    enable: true,
                    mode: "push",
                    },
                },
                modes: {
                    push: {
                    particles_nb: 1,
                    },
                },
                },
                retina_detect: true,
            }}
        />
    );
}

export default Particle;
