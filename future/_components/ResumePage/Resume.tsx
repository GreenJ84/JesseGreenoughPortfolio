/** @format */
'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { DataFilter } from '../Shared/DataFilter';
import ResumeInteractButtons from './ResumeInteractButtons';

import * as ResumeService from '../../_utils/services/resumeService';
import { LeftArrow, RightArrow, MoreItems } from '../../_components/Icons/collections';

const css = require('./Resume.module.css');

interface ResumeProps {
  resumeData: ResumeService.resumeType[];
  // Wont change without a route change
  category: string;
  // Wont change until cache revalidates
  categories: Map<string, number>;
  totalResumes: number;
}

const Resume = ({
  resumeData,
  totalResumes,
  categories,
  category,
}: ResumeProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const [resumes, setResumes] = useState(resumeData);
  const [resNum, setResNum] = useState(0);

  const checkMoreResumes = useMemo(
    () =>
      category === 'all'
        ? resumes.length < totalResumes
        : resumes.length < categories.get(category)!,
    [categories, category, resumes.length, totalResumes]
  );
  const pageEnd = useMemo(() => resNum === resumes.length - 1, [resNum, resumes.length]);

  const changeResNum = async (e: React.MouseEvent, dir: string) => {
    e.preventDefault();
    if (dir == 'left') {
      if (resNum > 0) setResNum((num) => num - 1);
    } else if (dir == 'right') {
      if (resNum === resumes.length - 1 && checkMoreResumes) {
        const response = await ResumeService.getPage(
          Math.floor(resNum / 5),
          5,
          category === 'all'
            ? {}
            : {
                categories: category,
              }
        );
        setResumes((resumes) => [...resumes, ...response]);
        setResNum((num) => num + 1);
      } else if (resNum < resumes.length - 1) {
        setResNum((num) => num + 1);
      }
    }
  };

  return (
    <>
      <DataFilter
        title={'Job Titles'}
        options={Array.from(categories.keys())}
        handler={(category: string) => {
          const params = new URLSearchParams();
          params.set('category', category);
          router.push(`${pathname}?${params.toString()}`);
        }}
      />
      <ResumeInteractButtons
        section='top'
        download={resumes[resNum].download}
        view={resumes[resNum].view}
      />
      <section
        id='resume'
        className={css.resume}
      >
        {/* <div
          id='mobileModal'
          className={css.mobileModal}
        >
          <p>
            If you are viewing on mobile it is best to use the view button to
            get a better PDF viewing experience.
          </p>
        </div> */}
        <div>
          <label
            id='previousResume'
            title={resNum === 0 ? 'Disabled' : 'Previous'}
            aria-label='View Previous Resume'
            className={css.resumeControls}
          >
            <button
              aria-labelledby='previousResume'
              aria-disabled={resNum === 0}
              className={`${css.leftArrow} ${resNum === 0 && css.disabled}`}
              onClick={(e) => changeResNum(e, 'left')}
            >
              <LeftArrow />
            </button>
          </label>

          <label
            id='nextResume'
            title={pageEnd && !checkMoreResumes ? 'Disabled' : 'Next'}
            aria-label='View Next Resume'
            className={css.resumeControls}
          >
            <button
              aria-labelledby='nextResume'
              aria-disabled={
                pageEnd && !checkMoreResumes
              }
              className={`${css.rightArrow} ${
                pageEnd && !checkMoreResumes &&
                css.disabled
              }`}
              onClick={(e) => changeResNum(e, 'right')}
            >
              {checkMoreResumes ? (
                <MoreItems />
              ) : (
                <RightArrow />
              )}
            </button>
          </label>
        </div>
        <Image
          id='resumeImage'
          src={resumes[resNum].image_url}
          alt='My Resume pdf view'
          width={800}
          height={1400}
          priority
          blurDataURL='iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8fwYAAtABzbrmHzgAAAAASUVORK5CYII='
          placeholder='blur'
          onClick={() => {
            let image = document.getElementById('resumeImage')!;
            if (window.innerWidth < 1400) {
              return;
            }
            if (image.style.transform === 'scale(1)') {
              image.style.transform = 'scale(1.2)';
              image.style.zIndex = '30';
            } else {
              image.style.transform = 'scale(1)';
              image.style.zIndex = '10';
            }
          }}
        />
      </section>

      <ResumeInteractButtons
        section='bottom'
        download={resumes[resNum].download}
        view={resumes[resNum].view}
      />
    </>
  );
};

export default Resume;
