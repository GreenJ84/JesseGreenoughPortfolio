/** @format */

import React from "react";
import Image from "next/image";

import TypeWrite from "./TypeWrite";
import Tilt from "react-parallax-tilt";

const homeDeveloperLogo = "/assets/home-main.svg";
const myImg = "/assets/avatar.svg";

const css = require("./HomeTop.module.css");

const HomeTop = () => {
  return (
    <>
      <section
        className={css.homeIntro}
        id="homeIntro"
      >
        <h1 className={css.homeHeader}>
          Hi There!{" "}
          <span
            className={css.wave}
            role="img"
            aria-labelledby="wave"
          >
            👋🏻
          </span>
          <br />
          I&apos;M
          <span className="detail"> JESSE GREENOUGH</span>
        </h1>

        <div className={css.typeText}>
          <TypeWrite
            typePrompts={[
              "TypeScript React Focus",
              "Python, Rust, and Java",
              "Open Source Contributor",
            ]}
          />
          <br />
          <TypeWrite
            typePrompts={[
              "Web/Web3 Development",
              "SQL and NoSQL Databases",
              "Always Actively Learning",
            ]}
          />
        </div>

        <Image
          id="homeDeveloperLogo"
          src={homeDeveloperLogo}
          alt="A animated image of a developer at work"
          className={css.homeDeveloperLogo}
          width={400}
          height={400}
        />
      </section>

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
          Web Development bootcamp and change my side work into a full-time
          career pursuit.
          <br />
          <br />I am passionate about coding because it enables me to leverage
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
    </>
  );
};

export default HomeTop;
