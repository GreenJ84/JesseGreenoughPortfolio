/** @format */

import React from 'react';

import * as ResumeService from '../_utils/services/resumeService';
import Resume from '../_components/ResumePage/Resume';

const css = require('../_components/ResumePage/Resume.module.css');

const [total, jobCategories] = await Promise.all([
  ResumeService.getTotal(),
  new Map<string, number>(JSON.parse(await ResumeService.getResumeCategories()))
]);

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const resumeFilter = {};
  if (searchParams.category !== undefined) {
    const category = typeof searchParams.category === 'string' ? searchParams.category : searchParams.category[0];
    // Only apply if valid category
    category in jobCategories && (resumeFilter['category'] = category);
  }

  const resumes = await ResumeService.getPage(0, 5, resumeFilter);

  return (
    <main
      id='resumePage'
      className={css.resumeContainer}
    >
      <Resume
        resumeData={resumes}
        categories={jobCategories}
        totalResumes={total}
        category={resumeFilter['category'] ?? 'all'}
      />
    </main>
  );
};

export default page;
