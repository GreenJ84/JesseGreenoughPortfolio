/** @format */

import PageClient from "./PageClient";
import Degree from './_components/degree/Degree';
import Certifications from './_components/certifications/Certifications';
import Footer from "../_layout/Footer/Footer";

import * as educationService from "@/app/_actions/educationService";
import * as certificationService from "@/app/_actions/certificationService";

const css = require("./_components/EduBody.module.css");

const Page = async () => {
  const [eduItems, eduTotal, certItems, certTotal, [issuerData, techData]] =
  await Promise.all([
    educationService.getEducation(),
    educationService.getEducationCount(),
    certificationService.getTopCertifications(),
    certificationService.getCertificationCount(),
    certificationService.getCertificationFilterOptions(),
  ]);

  return (
    <>
      <main
        id="educationContainer"
        className={css.eduBody}
      >
        <h1 id="educationTitle">
          Education &amp; credentials
        </h1>
        <p>
          Software engineering foundations and advanced cybersecurity study inform how I build secure systems.
        </p>
        <section className={css.credentialHighlights} aria-label="Recent education and credentials">
          <article><span>October 2025 · Western Governors University</span><h2>M.S. Cybersecurity and Information Assurance</h2><p>Graduate study focused on protecting systems and managing cyber risk.</p></article>
          <article><span>2026 · CompTIA</span><h2>SecurityX (CASP+)</h2><p>Advanced practitioner credential in cybersecurity.</p></article>
        </section>
        <PageClient
          degreeComp={
            <Degree
              educationData={{
                eduItems,
                total: eduTotal!,
              }}
            />
          }
          certComp={
            <Certifications
              certificationData={{
                certItems,
                total: certTotal,
                issuerData,
                techData,
              }}
            />
          }
        />
      </main>
      <Footer />
    </>
  );
};

export default Page;


import { portfolioMetadata } from '../sharedMetadata';

export const metadata = portfolioMetadata(
  '/education',
  'Cybersecurity Education & Credentials | Jesse Greenough',
  'M.S. Cybersecurity and Information Assurance from WGU, CompTIA SecurityX (CASP+), and software engineering education.'
);
