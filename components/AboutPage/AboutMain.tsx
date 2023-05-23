/** @format */

import Image from "next/image";
import React from "react";

import { Container } from "react-bootstrap";

import AboutIntroduction from "./AboutIntroduction";

const aboutDevLogo = "/assets/about.png";
const css = require("./AboutMain.module.css");

const AboutMain = () => {
  return (
    <Container
      id="aboutMain"
      className={css.aboutMain}
    >
      <AboutIntroduction />
      <Image
        src={aboutDevLogo}
        alt="An animated image of a developer, happily working away with code at a standing office desk of the future with holographic displays"
        className={css.aboutDevLogo}
        width={800}
        height={800}
      />
    </Container>
  );
};

export default AboutMain;
