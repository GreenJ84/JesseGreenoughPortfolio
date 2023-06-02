/** @format */

import React from "react";

import { Container } from "react-bootstrap";

import AboutDetails from "../components/AboutPage/AboutDetails";
import AboutMain from "../components/AboutPage/AboutMain";

const AboutPage = () => {
  return (
    <Container
      fluid
      style={{ padding: "10vw 4vw 0" }}
    >
      <AboutMain />
      <AboutDetails />
    </Container>
  );
};

export default AboutPage;
