/** @format */

// TODO: Update styling logic gor route
import React from "react";
import dynamic from "next/dynamic";

import { ImPointRight } from "react-icons/im";

const AboutDetails = dynamic(
  () => import("./_components/AboutDetails")
);
const Footer = dynamic(
  () => import("../_layout/Footer/Footer")
);

const css = require("./_components/About.module.css");

const AboutPage = () => {
  return (
    <main className={css.aboutMain}>
        <section
          id="aboutIntro"
          className={css.aboutOpener}
        >
          <h1>
            Break the <span className="detail">Ice</span>
          </h1>
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
        <Footer />
    </main>
  );
};

export default AboutPage;


import { Metadata } from "next/types";
import { APP_URL, OPEN_GRAPH, TWITTER_SHARE } from "../sharedMetadata";

const ABOUT_URL = APP_URL + '/about';
const TITLE="About: Jesse Greenough - Developer, Father, and Husband";
const DESCRIPTION="Gain insight on the life of the Jesse Greenough, Full-Stack Engineer, and the experience he holds.";
const KEYWORDS="Jesse Greenough, About, Biography, Developer, Engineer";

export const metadata: Metadata = {
  metadataBase: new URL(ABOUT_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: KEYWORDS,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: ABOUT_URL,
    siteName: TITLE,
    ...OPEN_GRAPH
  },
  twitter: {
    site: ABOUT_URL,
    title: TITLE,
    description: DESCRIPTION,
    ...TWITTER_SHARE
  },
};