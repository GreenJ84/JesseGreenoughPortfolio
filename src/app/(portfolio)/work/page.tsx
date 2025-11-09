/** @format */
import React from "react";
import dynamic from "next/dynamic";

import { getWorkByCategory, getWorkTotals } from "@/app/_actions/workService";

import WorkClient from "./PageClient";
const Footer = dynamic(() => import("../_layout/Footer/Footer"));



const WorkPage = async () => {

  const [workData, documentTotals] = await Promise.all([
    getWorkByCategory("primary"),
    getWorkTotals(),
  ]);
  return (
    <>
      <main
        id="workContainer"
      >
        <WorkClient workData={workData} documentTotals={documentTotals} />
      </main>
      <Footer/>
    </>
  );
};

export default WorkPage;


import { Metadata } from 'next/types';
import { APP_URL, OPEN_GRAPH, TWITTER_SHARE } from '../sharedMetadata';

const WORK_URL = APP_URL + '/work';
const TITLE="Lifetime Work Experience for Jesse Greenough"
const DESCRIPTION ="View the Work experience attained by Jesse Greenough over his lifetime"
const KEYWORDS ="Work,Experience,Management,Software,Development,Engineering,Retail"

export const metadata: Metadata = {
  metadataBase: new URL(WORK_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: KEYWORDS,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: WORK_URL,
    siteName: TITLE,
    ...OPEN_GRAPH
  },
  twitter: {
    site: WORK_URL,
    title: TITLE,
    description: DESCRIPTION,
    ...TWITTER_SHARE
  },
};