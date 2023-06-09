/** @format */

import React from "react";

import Head from "next/head";
import FlipCard from "../../components/Layout/FlipCard";
import Link from "next/link";
import { useRouter } from "next/router";

const css = require("../../components/ExperiencePage/Experience.module.css");

const ExperiencePage = () => {
  const router = useRouter();

  const handleRedirect = (e: React.MouseEvent<HTMLElement>, url: string) => {
    e.preventDefault();
    router.push(url);
  };

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
          style={{"margin": "10vh auto", "width": "clamp(200px, 42vw, 750px)","height": "clamp(150px, 32vw, 500px)" }}
          frontDisplay={
            <h1 className={css.cardTitle}>
              Want to see my <span>Education</span>?
            </h1>
          }
          backDisplay={
            <div className={css.cardBody}>
              <p>
                Learn more about my Personal Educational achievements and
                persuits. This encompasses both credentials issued from
                regulated institutions as well as course certifications from
                various Third-parties.
              </p>
              <Link
                href="/experience/education"
                className={css.experienceLink}
              >
                Check it Out!
              </Link>
            </div>
          }
        />
        <FlipCard
          style={{"margin": "10vh auto", "width": "clamp(200px, 42vw, 750px)","height": "clamp(150px, 32vw, 500px)" }}
          frontDisplay={
            <h1 className={css.cardTitle} >
              Want to see my <span>Work</span>?
            </h1>
          }
          backDisplay={
            <div className={css.cardBody}>
              <p>
                Learn more about the Work and Volunter experience I have
                partaken in to date. This includes all work experiences across
                multiple industries.
              </p>
              <Link
                className={css.experienceLink}
                href="/experience/work"
              >
                Check it Out!
              </Link>
            </div>
          }
        />
      </main>
    </>
  );
};

export default ExperiencePage;
