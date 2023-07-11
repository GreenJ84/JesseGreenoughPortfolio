/** @format */

import React from "react";
import Link from "next/link";

import {MetaHead} from "../../components/Layout/LayoutExtras";
import {FlipCard} from "../../components/Layout/LayoutExtras";

const css = require("../../components/ExperiencePage/Experience.module.css");

const ExperiencePage = () => {
  return (
    <>
      <MetaHead
        title="Dive into the Experience of Jesse Greenough"
        description="This experience landing page will help direct you to the Education or Work experiences of Jesse Greenough"
        keywords="Experience, Education, Work, Software Development, Management"
      />

      <main
        id="experienceContainer"
        className={css.experienceContainer}
      >
        {/* Education */}
        <FlipCard
          style={{
            margin: "10vh auto",
            width: "clamp(220px, 42vw, 750px)",
            height: "clamp(180px, 32vw, 500px)",
          }}
          frontDisplay={
            <div
              id="eduFront"
              className={css.cardTitle}
            >
              <h1>
                Want to see my <br />
                <span>Education?</span>
              </h1>
            </div>
          }
          backDisplay={
            <div
              id="eduBack"
              className={css.cardBody}
            >
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

        {/* Work */}
        <FlipCard
          style={{
            margin: "10vh auto",
            width: "clamp(220px, 42vw, 750px)",
            height: "clamp(180px, 32vw, 500px)",
          }}
          frontDisplay={
            <div
              id="workFront"
              className={css.cardTitle}
            >
              <h1>
                Want to see my <br />
                <span>Work?</span>
              </h1>
            </div>
          }
          backDisplay={
            <div
              id="workBack"
              className={css.cardBody}
            >
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
