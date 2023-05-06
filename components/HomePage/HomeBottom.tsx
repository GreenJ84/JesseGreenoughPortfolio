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

const myImg = "/assets/avatar.svg";
const css = require("./HomeBottom.module.css");

const HomeBottom = () => {
  const [wide, setWide] = useState(true);

  // Watch screen size for GitHub display rendering
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
    <>
      <Row
        id="developerIntro"
        md={8}
        className={css.developerIntro}
      >
            <h2>
              LET ME <span className="detail"> INTRODUCE </span> MYSELF
            </h2>
            <Tilt className={css.myAvtar}>
              <Image
                src={myImg}
                className={css.myAvatarImage}
                alt="avatar"
                width={ 400 }
                height={ 400 }
              />
            </Tilt>
            <p>
              I fell in love with programming years ago and have
              constantly pushed learning more and more at every opportunity! In 2022, one such opportunity that I recieved was the ability to attend the
              <i>
                <b className="detail"> Coding Dojo </b>
              </i>
              Web Development bootcamp and change my hobby into a full-time career pursuit.
              <br />
              <br />
              I am fluent in
              <span className="detail"> TypeScript </span> 
              and 
              <span className="detail"> JavaScript </span>
              with significant knowledge of
              <span className="detail"> Python </span>
              (with
              Typings),
              <span className="detail"> Rust </span>
              , and 
              <span className="detail">Java</span>
              <br />
              <br />
              I am passionate about coding because it enables me to leverage technology to create innovative web technologies and products that have a positive
              <span className="detail"> impact on society. </span>
              <br />
              <br />
              Whenever possible, I apply my passion for developing with
              <span className="detail"> TypeScript </span>
              and
              <span className="detail"> Node.js </span>
              combined with modern JavaScript libraries and frameworks like
              <span className="detail"> React.js </span>
              and
              <span className="detail"> Next.js</span>
            </p>
        </Row>
        <Languages/>
        <Framework />
        <Databases />
        <DeveloperTools />
        {wide ? <GithubCard /> : ""}
        <Row
          id="developerSocial"
          md={12}
          className={css.developerSocial}
        >
            <p>
              Feel free to <span className="detail">connect </span>with me on
            </p>
            <ul className={css.developerSocialLinks}>
              <li>
                <a
                  href="https://github.com/GreenJ84"
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/GoodGreens84"
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/jessegreenough/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/jesse.greenough/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
        </Row>
    </>
  );
};

export default HomeBottom;
