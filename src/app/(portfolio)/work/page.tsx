/** @format */

import { getWorkByCategory, getWorkTotals } from "@/app/_actions/workService";

import WorkClient from "./PageClient";
import Footer from '../_layout/Footer/Footer';



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


import { portfolioMetadata } from '../sharedMetadata';

export const metadata = portfolioMetadata(
  '/work',
  'Engineering & Professional Experience | Jesse Greenough',
  'Explore Jesse Greenough’s software engineering, backend development, and professional experience, including leadership and service.'
);
