/** @format */

import React, { useContext, useEffect } from "react";
import Image from "next/image";

import Tilt from "react-parallax-tilt";

import DeveloperTools from "./DeveloperTools";
import GithubCard from "./GithubCard";
import Languages from "./Languages";
import Framework from "./Framework";
import Databases from "./Databases";
import { AppContext, WindowWidth } from "../../Utils/AppContext";
import { BsArrowDownCircle } from "react-icons/bs";

const myImg = "/assets/avatar.svg";
const css = require("./HomeBottom.module.css");

const HomeBottom = () => {
  const { windowWidth } = useContext(AppContext);

  useEffect(() => { 
    const animateScroll = () => {
      const slide = document.getElementById("slideTitle")!;
      const down = document.getElementById("titleDown")!;
      const rect = slide.getBoundingClientRect();


      if ( (rect.bottom <= window.innerHeight && rect.bottom >= 0) || (rect.top <= window.innerHeight && rect.top >= 0) ) {
        let mid = (rect.bottom + rect.top) / 2;
        slide.style.visibility = "visible";
        down.style.visibility = "visible";

        let scale = 2 - Math.abs(mid - (window.innerHeight / 2)) / 400;
        scale = Math.min(scale, 1.6);
        const translateY = (mid / window.innerHeight * 80) - 80;
        const opacity = Math.min(scale - 0.5, 1)

        slide.style.transform = `translateY(${translateY * 3}px) scale(${scale})`;
        slide.style.opacity = `${opacity}`;
        down.style.transform = `translateY(${translateY * .75}px) scale(${scale})`;
        down.style.opacity = `${opacity}`;
      } else {
        slide.style.visibility = "hidden";
        down.style.visibility = "hidden";
      }
    
    }

    window.addEventListener("scroll", animateScroll)
    return () => {
      window.removeEventListener("scroll", animateScroll)
    }
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
      <section className={css.developerSkills}>
        <h2 id="slideTitle">
          Check out my <span className="detail">Technical Skillset</span>
          <br/>
          <BsArrowDownCircle style={{"marginTop": "100px"}} id="titleDown"/>
        </h2>
        <Languages />
        <Framework />
        <Databases />
        <DeveloperTools />
        {windowWidth === WindowWidth.LARGE && <GithubCard />}
      </section>
    </>
  );
};

export default HomeBottom;
