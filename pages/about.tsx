/** @format */

import React from "react";
import dynamic from "next/dynamic";

import { ImPointRight } from "react-icons/im";

import {DeveloperPortrait, MetaHead} from "../components/Layout/LayoutExtras";

const developerPortrait = require("../public/assets/developerPortrait.jpeg");
const AboutDetails = dynamic(
  () => import("../components/AboutPage/AboutDetails")
);

const css = require("../components/AboutPage/About.module.css");

const AboutPage = () => {
  return (
    <>
      <MetaHead
        title="All About the Jesse Greenough...Developer, Father, and Husband"
        description="Learn a little about the life of the Jesse Greenough, Full-Stack Engineer, and the experience he has partaken in."
        keywords="Jesse Greenough, About, Biography, Developer, Engineer"
      />

      <main
        id="aboutMain"
        style={{ position: "relative", padding: "10vw 4vw 0" }}
      >
        <section
          id="aboutIntro"
          className={css.aboutOpener}
        >
          <DeveloperPortrait />
          <p style={{ textAlign: "left" }}>
            Hi everyone, I am<span className="detail"> Jesse Greenough </span>
            currently residing in
            <span className="detail"> Shoreline, Washington USA.</span>
            <br />
            <br />
            I am a Full-Stack Developer with 5+ years of previous experience in
            team operations, business management, and customer success.
            <br />
            <br />
            Can you tell my favorite colors are
            <span className="detail_plus"> Green </span>and
            <span className="detail_plus"> Blue </span>??? ( All Shades 😎 )
            <br />
            <br />
            Apart from learning and coding, some other activities that I love to
            do are:
          </p>
          <ul>
            <li>
              <ImPointRight /> &emsp;Spend time with my amazing family
            </li>
            <li>
              <ImPointRight /> &emsp;Enjoy the outdoors!
            </li>
            <li>
              <ImPointRight /> &emsp;NFT Art collecting (Currently have Eth,
              HBAR, and XRP NFTs)
            </li>
            <li>
              <ImPointRight /> &emsp;Web3 community participation
            </li>
            <li>
              <ImPointRight /> &emsp;Play Sports (Basketball!)
            </li>
            <li>
              <ImPointRight /> &emsp;Play video games/Watch anime
            </li>
            <li>
              <ImPointRight /> &emsp;Do Sudoku or word puzzles
            </li>
          </ul>
        </section>
        <AboutDetails />
      </main>
    </>
  );
};

export default AboutPage;
