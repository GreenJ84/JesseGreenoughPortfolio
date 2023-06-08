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
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  handleRedirect(e, "/experience/education");
                }}
              >
                Check it Out!
              </Link>
            </div>
          }
        />
        <FlipCard
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
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  handleRedirect(e, "/experience/work");
                }}
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
