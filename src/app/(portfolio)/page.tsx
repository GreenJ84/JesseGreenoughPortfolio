/** @format */

import dynamic from "next/dynamic";
import { Suspense } from "react";

import HomeTop from "./_components/HomeTop";
import AboutPreview from "./_components/AboutPreview";
const ProjectsPreview = dynamic(() => import("./projects/_components/ProjectsPreview"));
import ProfessionalSnapshot from './_components/ProfessionalSnapshot';
import HomeSkills from './_components/HomeSkills';
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
      <Suspense fallback={<section className={css.skillsFallback} aria-label="Skills loading" />}><HomeSkills /></Suspense>
      <ProfessionalSnapshot />
      <Suspense fallback={<section className={css.projectsFallback} aria-label="Featured projects loading" />}><HomeProjects /></Suspense>
      <AboutPreview />
      <Footer />
    </main>
  );
};

export default HomePage;



import { portfolioMetadata } from './sharedMetadata';
const TITLE = "Jesse Greenough | Rust Backend & Security Engineer";
const DESCRIPTION =
  'Rust-first backend engineering with a security focus and full-stack TypeScript, Node.js, Python, and web development experience.';
export const metadata = portfolioMetadata('/', TITLE, DESCRIPTION);



