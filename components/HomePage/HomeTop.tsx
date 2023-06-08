/** @format */

import React from "react";
import Image from "next/image";

import TypeWrite from "./TypeWrite";

const homeDeveloperLogo = "/assets/home-main.svg";
const css = require("./HomeTop.module.css");

const HomeTop = () => {
  return (
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
        <b className="detail"> JESSE GREENOUGH</b>
      </h1>

      <div className={css.typeText}>
        <TypeWrite typePrompts={type_props1} />
        <br/>
        <TypeWrite typePrompts={type_props2} />
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
  );
};

export default HomeTop;

const type_props1 = [
  "TypeScript React Focus",
  "Python, Rust, and Java",
  "Open Source Contributor",
];

const type_props2 = [
  "Web/Web3 Development",
  "SQL and NoSQL Databases",
  "Always Actively Learning",
];
