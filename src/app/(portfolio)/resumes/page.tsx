/** @format */

import * as resumeService from "./resumeService";

import ResumeClient from "./ResumeClient";
import Footer from '../_layout/Footer/Footer';

const css = require("./_components/Resume.module.css");

const ResumePage = async () => {
  const [resumeData, total, categoryData] = await Promise.all([
    resumeService.getResumes(),
    resumeService.getResumeCount(),
    resumeService.getResumeFilterOptions(),
  ]);
  return (
    <>
      <main
        id="resumePage"
        className={css.resumeContainer}
      >
        <header className={css.pageHeader}><p>Explore the experience behind my work. Open or download the version that fits what you’re looking for.</p></header>
        <ResumeClient
          resumeData={resumeData}
          total={total}
          categoryData={categoryData}
        />
      </main>
      <Footer />
    </>
  );
};

export default ResumePage;


import { portfolioMetadata } from '../sharedMetadata';

export const metadata = portfolioMetadata(
  '/resumes',
  'Rust Backend & Security Resumes | Jesse Greenough',
  'View and download Jesse Greenough’s Rust backend, security, and full-stack engineering resumes.'
);
