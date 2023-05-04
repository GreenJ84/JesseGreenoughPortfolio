import React from "react";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";

// import Particle from "../Layout/Particle";
import TypeWrite from "./TypeWrite";

const homeLogo = "/assets/home-main.svg";
const css = require("./HomeTop.module.css");

const HomeTop = () => {
  return (
    <Container fluid className={css.homeSection} id="home">
      {/* <Particle /> */}
      <Container className={css.homeContent}>
        <Row>
          <Col md={7} className={css.homeHeader}>
            <h1 className={css.heading}>
              Hi There!{" "}
              <span className={css.wave} role="img" aria-labelledby="wave">
                👋🏻
              </span>
            </h1>

            <h1 id="developerName" className={css.headingName}>
              I&apos;M
              <strong className={css.mainName}> JESSE GREENOUGH </strong>
            </h1>

            <div className={css.typeText}>
              <TypeWrite typePrompts={props1} />
              <br />
              <TypeWrite typePrompts={props2} />
            </div>
          </Col>

          <Col md={5} className={ css.imageHolder }>
            <Image
              id="homeDeveloperLogo"
              src={homeLogo}
              alt="A animated image of a developer at work"
              className={css.topImage}
              width={ 400 }
              height={ 400 }
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default HomeTop;

const props1 = [
  "Full-stack Developer",
  "TypeScript React focused Software Engineer",
  "Open Source Contributor",
];

const props2 = [
  "Web/Web3 Development",
  "SQL/NoSQL Database, Python, & Java skills",
  "Always actively learning",
];
