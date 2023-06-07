/** @format */

import React from "react";

import Head from "next/head";
import FlipCard from "../../components/Layout/FlipCard";
import Link from "next/link";

const css = require("../../components/ExperiencePage/Experience.module.css");

const ExperiencePage = () => {
  return (
    <>
      <Head>
        <title>Dive into the Experience of Jesse Greenough</title>
        <meta
          property="og:title"
          content="Dive into the Experience of Jesse Greenough"
        />
        <meta
          name="description"
          content="A landing page to direct viewers to the Education and Work experiences of Jesse Greenough"
          key="desc"
        />
        <meta
          property="og:description"
          content="A landing page to direct viewers to the Education and Work experiences of Jesse Greenough"
        />
      </Head>
      <main
        id="experienceContainer"
        className={css.experienceContainer}
      >
        <FlipCard
          frontDisplay={<h1>Education</h1>}
          backDisplay={
            <>
              <p>
                Learn more about my Personal Educational achievements and
                persuits
              </p>
              <Link href="">Visit</Link>
            </>
          }
        />
        <FlipCard
          frontDisplay={<h1>Work</h1>}
          backDisplay={
            <>
              <p>
                Learn more about the Work and Volunter experience I have attianed to date
              </p>
              <Link href="">Visit</Link>
            </>
          }
        />
      </main>
    </>
  );
};

export default ExperiencePage;
