/** @format */

import React from "react";

import { ImPointRight } from "react-icons/im";

const css = require("./AboutIntroduction.module.css");

const AboutCard = () => {
  return (
    <div className={css.aboutOpener}>
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
        Can you tell my favorite color is
        <span className="detail"> Green</span>??? ( All Shades 😎 )
        <br />
        <br />
        Apart from learning and coding, some other activities that I love to do
        are:
      </p>
      <ul>
        <li>
          <ImPointRight className={css.pointer} /> &emsp;Spend time with my
          amazing family
        </li>
        <li>
          <ImPointRight className={css.pointer} /> &emsp;Enjoy the outdoors!
        </li>
        <li>
          <ImPointRight className={css.pointer} /> &emsp;NFT Art collecting
          (Currently have Eth, HBAR, and XRP NFTs)
        </li>
        <li>
          <ImPointRight className={css.pointer} /> &emsp;Web3 community
          participation
        </li>
        <li>
          <ImPointRight className={css.pointer} /> &emsp;Play Sports
          (Basketball!)
        </li>
        <li>
          <ImPointRight className={css.pointer} /> &emsp;Play video games/Watch
          anime
        </li>
        <li>
          <ImPointRight className={css.pointer} /> &emsp;Do Sudoku or word
          puzzles
        </li>
      </ul>
    </div>
  );
};

export default AboutCard;
