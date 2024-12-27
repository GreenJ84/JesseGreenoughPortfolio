/** @format */
"use client";
import React from "react";

import { DeveloperPortrait, TypeWrite } from "../_layout/LayoutExtras";

const css = require("./Home.module.css");

const HomeTop = () => {
  return (
    <section
      id="homeIntro"
      className={css.homeIntro}
    >
      <h1 className={css.homeHeader}>
        Hi There!{" "}
        <span
          className={css.wave}
          role="img"
          aria-label="Wave emoji (Hello!)"
        >
          👋🏻
        </span>
        <br />
        I&apos;M
        <span className="detail"> JESSE GREENOUGH</span>
      </h1>
      <DeveloperPortrait />
      <div className={css.typeText}>
        <TypeWrite
          typePrompts={[
            "TypeScript React Focus",
            "Java, Rust, and Python",
            "Open Source Contributor",
          ]}
        />
        <br />
        <TypeWrite
          typePrompts={[
            "Software Development",
            "SQL and NoSQL Databases",
            "Always Actively Learning",
          ]}
        />
      </div>
    </section>
  );
};

export default HomeTop;
