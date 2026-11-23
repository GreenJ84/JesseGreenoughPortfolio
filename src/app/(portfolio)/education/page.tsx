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
          Formal study, hands-on learning, and credentials that support my work in software engineering.
        </p>
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
const TITLE="Lifetime Educational Experience for Jesse Greenough"
const DESCRIPTION ="View the scholarly efforts undergone by Jesse Greenough over his lifetime"
const KEYWORDS ="Education,Experience,Coursework,Software,Development,Engineering"

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
