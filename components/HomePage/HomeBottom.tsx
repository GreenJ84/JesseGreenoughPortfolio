/** @format */

import React, { useEffect, useState } from "react";
import Image from "next/image";

import Tilt from "react-parallax-tilt";
import { Row } from "react-bootstrap";
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
              LET ME <span className="detail">INTRODUCE</span> MYSELF
            </h2>
            <Tilt className={css.myAvtar}>
              <Image
                src={myImg}
                className={css.myAvatarImage}
                alt="Human Avatar Icon"
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
              <b className="detail"> TypeScript </b> 
              and 
              <b className="detail"> JavaScript </b>
              with significant knowledge of
              <b className="detail"> Python </b>
              (with
              Typings),
              <b className="detail"> Rust </b>
              , and 
              <b className="detail">Java</b>
              <br />
              <br />
              I am passionate about coding because it enables me to leverage technology to create innovative web technologies and products that have a positive
              <b className="detail"> impact on society. </b>
              <br />
              <br />
              Whenever possible, I apply my passion for developing with
              <b className="detail"> TypeScript </b>
              and
              <b className="detail"> Node.js </b>
              combined with modern JavaScript libraries and frameworks like
              <b className="detail"> React.js </b>
              and
              <b className="detail"> Next.js</b>
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
              Feel free to <span className="detail">connect </span>with me!
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
