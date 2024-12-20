/** @format */
// TODO: Migrate to app directory
import React from "react";

import * as workService from "./workService";

import WorkClient from "./pageClient";



const WorkPage = async () => {

  const [workData, documentTotals] = await Promise.all([
    workService.getPrimaryWork(),
    workService.getWorkTotals(),
  ]);
  {/* <MetaHead
    title="Lifetime Work Experience for Jesse Greenough"
    description="View the Work experience attained by Jesse Greenough of his life"
    keywords="Work,Experience,Management,Software,Development,Engineering,Retail"
  /> */}
  return (
    <main
      id="workContainer"
      style={{ padding: "min(12vw, 12vh) 3vw 1rem", margin: "0 2vw" }}
    >
      <WorkClient workData={workData} documentTotals={documentTotals} />
    </main>
  );
};

export default WorkPage;
