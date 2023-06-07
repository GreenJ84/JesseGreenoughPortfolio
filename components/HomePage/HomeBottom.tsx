/** @format */

import React, { useEffect, useState } from "react";
import Image from "next/image";

import Tilt from "react-parallax-tilt";

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
        setWide(true);
      } else {
        setWide(false);
      }
    };
    checkWindow();
    window.addEventListener("resize", checkWindow);
    return () => {
      window.removeEventListener("resize", checkWindow);
    };
  });

  return (
    <>
      <section
        id="developerIntro"
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
            width={400}
            height={400}
          />
        </Tilt>
        <p>
          I am Jesse, a Texas born Eagle Scout living in the naturally
          beautiful, Washington State. I fell in love with programming years ago
          and have constantly pushed learning more and more at every
          opportunity! In 2022, one such significant opportunity that I recieved
          was the ability to attend the
          <span className="detail_plus"> Coding Dojo </span>
          Web Development bootcamp and change my side work into a full-time career
          pursuit.
          <br />
          <br />
          I am passionate about coding because it enables me to leverage
          technology to create innovative web technologies and products that
          have a positive
          <span className="detail_plus"> impact on society. </span>
          As for tech languages, I am fluent in
          <span className="detail_plus"> TypeScript </span>
          and
          <span className="detail_plus"> JavaScript </span>
          with
          <span className="detail_plus"> Node.js </span>
          and I have a significant knowledge of
          <span className="detail_plus"> Python </span>
          (with Typings),
          <span className="detail_plus"> Rust </span>, and
          <span className="detail_plus"> Java.</span>
        </p>
      </section>
      <Languages />
      <Framework />
      <Databases />
      <DeveloperTools />
      {wide ? <GithubCard /> : ""}
    </>
  );
};

export default HomeBottom;
