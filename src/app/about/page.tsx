/** @format */

import React from "react";
import dynamic from "next/dynamic";

import { ImPointRight } from "react-icons/im";

import DeveloperPortrait from "../_shared/DeveloperPortrait";
import AboutNavigationLinks from "./_components/AboutNavigationLinks";
import AboutDetails from "./_components/AboutDetails";
const Footer = dynamic(import("../_layout/Footer/Footer"));

const css = require("./_components/About.module.css");

const Page = () => {
  return (
    <main className="scrollSnapContainer">
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
          I am a Full-Stack Developer with 8+ years of previous experience in
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
          <li><ImPointRight /> &emsp;Spend time with my amazing family</li>
          <li><ImPointRight /> &emsp;Enjoy the outdoors!</li>
          <li><ImPointRight /> &emsp;Play Sports (Basketball!)</li>
          <li><ImPointRight /> &emsp;Play video games/Watch anime</li>
          <li><ImPointRight /> &emsp;Do Sudoku or word puzzles</li>
          <li><ImPointRight /> &emsp;NFT Art collecting (Currently have Eth, HBAR, and XRP NFTs)</li>
          <li><ImPointRight /> &emsp;Web3 community participation</li>
        </ul>
      </section>
      <section
        className={css.aboutDetail}
      >
        <p style={{"textAlign": "center"}}>
          Through my journey, I have experienced personal and professional growth,
          and I am eager to leverage my skills and passion for coding to
          contribute to the dynamic world of software development. I am driven by a relentless desire to learn and evolve, ensuring that I stay at the forefront of the ever-changing landscape of technology. Whether it&apos;s mastering the latest programming techniques or tackling cutting-edge security issues, I am passionate about pushing boundaries and making a meaningful impact in the tech community.
        </p>
        <p style={{"textAlign": "center", "fontSize" : "var(--header2)", "marginTop": "10dvh"}}>
          With a firm belief in the power of technology to drive positive change, I am excited to be part of innovative projects that shape the future and make a meaningful impact in the lives of others.
        </p>
        < AboutNavigationLinks />
      </section>
      <AboutDetails />
      <Footer />
    </main>
  );
};

export default Page;


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