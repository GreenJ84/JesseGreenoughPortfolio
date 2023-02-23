/** @format */

import Image from "next/image";
import React from "react";
import { Container } from "react-bootstrap";

import AboutCard from "./AboutCard";

import laptopImage from "../../public/assets/about.png";
const css = require("./AboutMain.module.css");

const AboutMain = () => {
  return (
    <Container className={css.body}>
      <AboutCard />
      <Image
        src={laptopImage}
        alt="about"
        className={css.image}
      />
    </Container>
  );
};

export default AboutMain;
