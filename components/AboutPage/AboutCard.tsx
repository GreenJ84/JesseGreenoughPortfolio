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
            Hi Everyone, I am <span className="detail">Jesse Greenough </span>{" "}
            currently residing in{" "}
            <span className="detail"> Shoreline, Washington USA.</span>
            <br />
            <br />
            I am a Full-stack Developer with 5+ years of operations, management,
            and customer success experience.
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
              <ImPointRight /> Spending time with my amazing family
            </li>
            <li className={css.aboutActivity}>
              <ImPointRight /> Enjoying the outdoors!
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
              <ImPointRight /> Playing video games and watching anime 
            </li>
            <li className={css.aboutActivity}>
              <ImPointRight /> Doing sudoku and word puzzles
            </li>
          </ul>
          <p className={css.quote}>&quot;Build to make a difference!&quot;</p>
          <footer className={css.blockquoteFooter}>
            - <span className="detail">Jesse</span>
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
};

export default AboutCard;
