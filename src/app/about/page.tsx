/** @format */

import React from "react";
import dynamic from "next/dynamic";

import { ImPointRight } from "react-icons/im";
import { DeveloperPortrait } from "../_layout/LayoutExtras";

const AboutDetails = dynamic(
  () => import("./_components/AboutDetails")
);

const css = require("./_components/About.module.css");

const AboutPage = () => {
  return (
    <>
      {/* <MetaHead
        title="All About the Jesse Greenough...Developer, Father, and Husband"
        description="Learn a little about the life of the Jesse Greenough, Full-Stack Engineer, and the experience he has partaken in."
        keywords="Jesse Greenough, About, Biography, Developer, Engineer"
      /> */}
        <section
          id="aboutIntro"
          className={css.aboutOpener}
        >
          <h1>
            Break the <span className="detail">Ice</span>
          </h1>
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
    </>
  );
};

export default AboutPage;
