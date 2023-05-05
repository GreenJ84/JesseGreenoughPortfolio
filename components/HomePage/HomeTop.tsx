/** @format */

import React from "react";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";

import TypeWrite from "./TypeWrite";

const homeDeveloperLogo = "/assets/home-main.svg";
const css = require("./HomeTop.module.css");

const HomeTop = () => {
  return (
    <Container
      fluid
      className={css.homeIntro}
      id="homeIntro"
    >
        <Row>
          <Col
            md={7}
            className={css.homeHeader}
          >
            <h1>
              Hi There!{" "}
              <span
                className={css.wave}
                role="img"
                aria-labelledby="wave"
              >
                👋🏻
              </span>
            </h1>

            <h1
              id="developerName"
              className={css.developerName}
            >
              I&apos;M
              <b className={css.nameDetail}> JESSE GREENOUGH </b>
            </h1>

            <div className={css.typeText}>
              <TypeWrite typePrompts={type_props1} />
              <br />
              <TypeWrite typePrompts={type_props2} />
            </div>
          </Col>

          <Col
            md={5}
            className={css.homeIntroImage}
          >
            <Image
              id="homeDeveloperLogo"
              src={homeDeveloperLogo}
              alt="A animated image of a developer at work"
              className={css.homeDeveloperLogo}
              width={400}
              height={400}
            />
          </Col>
        </Row>
    </Container>
  );
};

export default HomeTop;

const type_props1 = [
  "Full-stack Developer",
  "TypeScript React focused Software Engineer",
  "Open Source Contributor",
];

const type_props2 = [
  "Web/Web3 Development",
  "SQL/NoSQL Database, Python, & Java skills",
  "Always actively learning",
];
