/** @format */

import React from "react";

import { ImPointRight } from "react-icons/im";

const css = require("./AboutIntroduction.module.css");

const AboutIntroduction = () => {
  return (
    <div
      id="aboutIntro"
      className={css.aboutOpener}
    >
      <h1>
        <span className="detail">Break </span>
        the Ice
      </h1>
      <p style={{ textAlign: "left" }}>
        Hi everyone, I am<span className="detail"> Jesse Greenough </span>
        currently residing in
        <span className="detail"> Shoreline, Washington USA.</span>
        <br />
        <br />
        I am a Full-Stack Developer with 5+ years of previous experience in team
        operations, business management, and customer success.
        <br />
        <br />
        Can you tell my favorite colors are
        <span className="detail_plus"> Green</span> and{" "}
        <span className="detail_plus">Blue</span>??? ( All Shades 😎 )
        <br />
        <br />
        Apart from learning and coding, some other activities that I love to do
        are:
      </p>
      <ul>
        <li>
          <ImPointRight /> &emsp;Spend time with my amazing family
        </li>
        <li>
          <ImPointRight /> &emsp;Enjoy the outdoors!
        </li>
        <li>
          <ImPointRight /> &emsp;NFT Art collecting (Currently have Eth, HBAR,
          and XRP NFTs)
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
    </div>
  );
};

export default AboutIntroduction;
