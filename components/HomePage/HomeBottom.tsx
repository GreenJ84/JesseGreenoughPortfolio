/** @format */

import React, { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import Image from "next/image";

import { Container, Row, Col } from "react-bootstrap";

import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

import DeveloperTools from "./DeveloperTools";
import GithubCard from "./GithubCard";
import Languages from "./Languages";
import Framework from "./Framework";
import Databases from "./Databases";

const myImg = "../../public/assets/avatar.svg";
const css = require("./HomeBottom.module.css");

const HomeBottom = () => {
  const [wide, setWide] = useState(true);

  useEffect(() => {
    const checkWindow = () => {
      if (window.innerWidth > 1000) {
        setWide(true)
      }
      else {
        setWide(false)
      }
    }
    checkWindow();
    window.addEventListener("resize", checkWindow);
    return () => {
      window.removeEventListener("resize", checkWindow);
    }
  })
  return (
    <Container
      fluid
      id="about"
    >
      <Container>
        <Row className={css.topRow}>
          <Col
            md={8}
            className={css.homeAboutDescription}
          >
            <h1 className={css.homeAboutTitle}>
              LET ME <span className="detail"> INTRODUCE </span> MYSELF
            </h1>
            <p className={css.homeAboutBody}>
              I fell in love with programming over 4 years ago and have
              constantly pushed learning more and more at every opportunity I
              had! In 2022, I got the opportunity to attend the{" "}
              <i>
                <b className="detail"> Coding Dojo </b>
              </i>{" "}
              bootcamp and change my hobby into a full-time career pursuit.
              <br />
              <br />I am fluent in like
              <i>
                <span className="detail"> TypeScript and JavaScript </span>with significant knowledge of <span className="detail">Python</span> (with
                Typings) and <span className="detail">Java</span>
              </i>
              <br />
              <br />
              I am interested in coding because of the ability to utilize it to build new
              &nbsp;
              <i>
                <span className="detail">
                  Web technologies and Products that help society{" "}
                </span>
              </i>
              <br />
              <br />
              Whenever possible, I apply my passion for developing with
              <span className="detail"> TypeScript</span>,
              <span className="detail"> Node.js</span>,
              <i>
                <span className="detail">
                  {" "}
                  Modern Javascript Libraries and Frameworks
                </span>
              </i>
              &nbsp; like
              <i>
                <span className="detail"> React.js and Next.js</span>
              </i>
            </p>
          </Col>
          <Col
            md={4}
            className={css.myAvtar}
          >
            <Tilt>
              <Image
                src={myImg}
                className={css.myAvatarImage}
                alt="avatar"
              />
            </Tilt>
          </Col>
        </Row>
        <Languages/>
        <Framework />
        <Databases />
        <DeveloperTools />
        {wide ? <GithubCard /> : ""}
        <Row>
          <Col
            md={12}
            className={css.homeAboutSocial}
          >
            <p>
              Feel free to <span className="detail">connect </span>with me on
            </p>
            <ul className={css.homeAboutSocialLinks}>
              <li className={css.socialIcons}>
                <a
                  href="https://github.com/GreenJ84"
                  target="_blank"
                  rel="noreferrer"
                  className={css.homeSocialIcons}
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className={css.socialIcons}>
                <a
                  href="https://twitter.com/GoodGreens84"
                  target="_blank"
                  rel="noreferrer"
                  className={css.homeSocialIcons}
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li className={css.socialIcons}>
                <a
                  href="https://www.linkedin.com/in/jessegreenough/"
                  target="_blank"
                  rel="noreferrer"
                  className={css.homeSocialIcons}
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className={css.socialIcons}>
                <a
                  href="https://www.instagram.com/jesse.greenough/"
                  target="_blank"
                  rel="noreferrer"
                  className={css.homeSocialIcons}
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default HomeBottom;
