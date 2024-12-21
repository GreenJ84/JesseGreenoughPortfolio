/** @format */
// TODO: Update styling logic gor route
import React from "react";

import * as resumeService from "./resumeService";

import ResumeClient from "./ResumeClient";

const css = require("./_components/Resume.module.css");

const ResumePage = async () => {
  const [resumeData, total, categoryData] = await Promise.all([
    resumeService.getResumes(),
    resumeService.getResumeCount(),
    resumeService.getResumeFilterOptions(),
  ]);
  return (
      <main
        id="resumePage"
        className={css.resumeContainer}
      >
        <ResumeClient
          resumeData={resumeData}
          total={total}
          categoryData={categoryData}
        />
      </main>
  );
};

export default ResumePage;


import { Metadata } from 'next/types';
import { APP_URL, OPEN_GRAPH, TWITTER_SHARE } from '../sharedMetadata';

const RESUME_URL = APP_URL + '/resumes';
const TITLE="Jesse Greenough's Software Engineering Resumes"
const DESCRIPTION ="View and Download Jesse Greenough's Software Engineering Resumes"
const KEYWORDS ="Resume,Full-Stack,Software,Developer,Engineer,TypeScript,React,NextJS,Java,Rust,Python"

export const metadata: Metadata = {
  metadataBase: new URL(RESUME_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: KEYWORDS,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: RESUME_URL,
    siteName: TITLE,
    ...OPEN_GRAPH
  },
  twitter: {
    site: RESUME_URL,
    title: TITLE,
    description: DESCRIPTION,
    ...TWITTER_SHARE
  },
};