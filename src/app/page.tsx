/** @format */

import React from "react";
import dynamic from "next/dynamic";

import HomeTop from "./_components/HomeTop";
import AboutPreview from "./_components/AboutPreview";
import GithubCard from "./_components/GithubCard";
const Footer = dynamic(() => import('./_layout/Footer/Footer'));

const css = require("./_components/Home.module.css")

const HomePage = () => {

  // TODO: Implement page previews for routing tree
  return (
    <main className={css.homeMain}>
      <HomeTop />
      <AboutPreview />
      {/* Skills preview */}
      {/* Project preview */}
      {/* Education preview */}
      <GithubCard />
      {/* Fixed contact widget */}
      <Footer />
    </main>
  );
};

export default HomePage;



import { Metadata } from 'next/types';
import { APP_URL, OPEN_GRAPH, TWITTER_SHARE } from './sharedMetadata';

const RESUME_URL = APP_URL + '/resumes';
const TITLE = "Jesse Greenough's Development Portfolio";
const DESCRIPTION =
  'View the Technical Development Skills possessed by Full Stack Engineer Jesse Greenough';
const KEYWORDS = [
  'Jesse Greenough',
  'Software',
  'Developer',
  'Engineer',
  'Full-Stack',
  'Portfolio',
  'Next.js',
  'React',
  'TypeScript',
];

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
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



