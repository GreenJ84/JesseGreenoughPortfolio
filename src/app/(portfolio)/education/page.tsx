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


import { Metadata } from 'next/types';
import { APP_URL, OPEN_GRAPH, TWITTER_SHARE } from '../sharedMetadata';

const EDU_URL = APP_URL + '/education';
const TITLE="Education & Security Credentials | Jesse Greenough"
const DESCRIPTION ="M.S. Cybersecurity and Information Assurance, CompTIA SecurityX, and software engineering education."
const KEYWORDS ="Cybersecurity,SecurityX,CASP+,WGU,Software Engineering,Education,Rust"

export const metadata: Metadata = {
  metadataBase: new URL(EDU_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: KEYWORDS,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: EDU_URL,
    siteName: TITLE,
    ...OPEN_GRAPH
  },
  twitter: {
    site: EDU_URL,
    title: TITLE,
    description: DESCRIPTION,
    ...TWITTER_SHARE
  },
};
