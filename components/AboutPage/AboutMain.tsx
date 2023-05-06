/** @format */

import Image from "next/image";
import React from "react";
import { Container } from "react-bootstrap";

import AboutIntroduction from "./AboutIntroduction";

const aboutDevLogo = "/assets/about.png";
const css = require("./AboutMain.module.css");

const AboutMain = () => {
  return (
    <Container className={css.aboutMain}>
      <AboutIntroduction />
      <Image
        src={aboutDevLogo}
        alt="about"
        className={css.aboutDevLogo}
        width={ 800 }
        height={ 800 }
      />
    </Container>
  );
};

export default AboutMain;
