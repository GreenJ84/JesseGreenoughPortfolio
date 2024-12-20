/** @format */
import * as resumeService from "./resumeService";

import ResumeClient from "./ResumeClient";

const css = require("./_components/Resume.module.css");

const ResumePage = async () => {
  const [resumeData, total, categoryData] = await Promise.all([
    resumeService.getResumes(),
    resumeService.getResumeCount(),
    resumeService.getResumeFilterOptions(),
  ]);

  {/* <MetaHead
    title="Jesse Greenough's Software Engineering Resumes"
    description="View and Download Jesse Greenough's Software Engineering Resumes"
    keywords="Resume,Full-Stack,Software,Developer,Engineer,TypeScript,React,NextJS,Python,Java,Rust"
  /> */}
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
