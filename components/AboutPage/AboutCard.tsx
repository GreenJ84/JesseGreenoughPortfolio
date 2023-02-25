/** @format */

import React from "react";
import { Card } from "react-bootstrap";

import { ImPointRight } from "react-icons/im";

const css = require("./AboutCard.module.css");

const AboutCard = () => {
  return (
    <Card className={css.quoteCardView}>
      <Card.Body>
        <blockquote className={css.blockquote}>
          <p style={{ textAlign: "left" }}>
            Hi everyone, I am <span className="detail">Jesse Greenough </span>{" "}
            currently residing in{" "}
            <span className="detail"> Shoreline, Washington USA.</span>
            <br />
            <br />
            I am a Full-Stack Developer with 5+ years of previous experience in team operations, business management,
            and customer success.
            <br />
            <br />
            Can you tell my favorite color is{" "}
            <span className="detail">Green</span>??? ( All Shades 😎 )
            <br />
            <br />
            Apart from learning and coding, some other activities that I love to
            do are:
          </p>
          <ul>
            <li className={css.aboutActivity}>
              <ImPointRight /> Spend time with my amazing family
            </li>
            <li className={css.aboutActivity}>
              <ImPointRight /> Enjoy the outdoors!
            </li>
            <li className={css.aboutActivity}>
              <ImPointRight /> NFT Art collecting (Currently have Eth, HBAR, and XRP NFTs)
            </li>
            <li className={css.aboutActivity}>
              <ImPointRight /> Web3 community participation
            </li>
            <li className={css.aboutActivity}>
              <ImPointRight /> Play Sports (Basketball!)
            </li>
            <li className={css.aboutActivity}>
              <ImPointRight /> Play video games/Watch anime 
            </li>
            <li className={css.aboutActivity}>
              <ImPointRight /> Do Sudoku or word puzzles
            </li>
          </ul>
        </blockquote>
      </Card.Body>
    </Card>
  );
};

export default AboutCard;
