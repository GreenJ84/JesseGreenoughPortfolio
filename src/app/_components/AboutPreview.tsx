/** @format */
"use client";
import React from "react";
import Image from "next/image";
import Tilt from "react-parallax-tilt";

const myImg = require("@/public/assets/pages/home/user_avatar.svg");

const css = require("./Home.module.css");

const AboutPreview = () => {
  return (
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
        Hi, I&apos;m Jesse — a Texas-born Eagle Scout thriving in the natural beauty of Washington State.
        My passion for programming began years ago, driven by a relentless curiosity to learn and create.
        In 2022, I turned this passion into a career path by attending the <span className="detail_plus"> Coding Dojo </span> Web Development Bootcamp, transforming my side work into a full-time pursuit.
        <br />
        <br />
        I am passionate about coding because it enables me to leverage
        technology to create innovative web technologies and products that
        have a positive
        <span className="detail_plus"> impact on society. </span>
        My mission is to harness the power of technology to drive meaningful impact and create value for users and businesses alike.
        <br />
        <br />
        With fluency in
        <span className="detail_plus"> TypeScript </span> and
        <span className="detail_plus"> JavaScript </span>
        (including <span className="detail_plus"> Node.js </span>) and significant experience in <span className="detail_plus"> Java </span>,
        <span className="detail_plus"> Python </span>
        (with Typings), and
        <span className="detail_plus"> Rust </span>
        , I specialize in building innovative software technologies and products that solve real-world problems.
      </p>
    </section>
  );
};

export default AboutPreview;
