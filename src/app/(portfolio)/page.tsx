/** @format */

import dynamic from "next/dynamic";
import { Suspense } from "react";

import HomeTop from "./_components/HomeTop";
import AboutPreview from "./_components/AboutPreview";
const ProjectsPreview = dynamic(() => import("./projects/_components/ProjectsPreview"));
import ProfessionalSnapshot from './_components/ProfessionalSnapshot';
import Footer from './_layout/Footer/Footer';

import { getTopProjects } from "@/app/_actions/projectService";

const css = require("./_components/Home.module.css")

async function HomeProjects() {
  const projectData = await getTopProjects();
  return <ProjectsPreview projects={projectData} />;
}

const HomePage = () => {
  return (
    <main className={css.homeMain}>
      <HomeTop />
      <AboutPreview />
      <Suspense fallback={<section style={{ minHeight: 400 }} aria-label="Featured projects loading" />}><HomeProjects /></Suspense>
      <ProfessionalSnapshot />
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



