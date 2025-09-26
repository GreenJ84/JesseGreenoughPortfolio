"use client";

import React from "react";
import Image from "next/image";

import Tilt from "react-parallax-tilt";

const css = require("./Shared.module.css");

const developerPortrait = "https://res.cloudinary.com/portfolio-g84/image/upload/v1690310921/personal/personal_portrait.jpg";
const DeveloperPortrait = () => {
  return (
    <Tilt
      className={css.portraitTilt}
      perspective={700}
      glareEnable={true}
      glareMaxOpacity={0.85}
      glareBorderRadius="50%"
      scale={1.1}
    >
      <Image
        src={developerPortrait}
        alt="Developer Portrait"
        className={css.developerPortrait}
        width={400}
        height={400}
        priority
      />
    </Tilt>
  );
};

export default DeveloperPortrait;