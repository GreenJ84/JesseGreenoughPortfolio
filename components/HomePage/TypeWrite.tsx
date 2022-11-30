import React from 'react';
import Typewriter from "typewriter-effect";

require('./TypeWrite.module.css')


const TypeWrite = () => {
    return (
        <Typewriter options={{
            strings: [
                "Full-stack Developer",
                "React focused Software Engineer",
                "Front-end/Back-end Capable",
                "Open Source Contributor",
            ],
            autoStart: true,
            loop: true,
            deleteSpeed: 50 }}
        />
    )
}

export default TypeWrite