"use client";
import { BsArrowLeft, BsArrowRight, BsPlusCircleFill } from "react-icons/bs";

import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import ListStatus from '../_shared/ListStatus';
import { usePaginatedList } from '../_shared/usePaginatedList';
import { queryKey } from '@/app/_lib/paginatedList';






const ButtonGroup = dynamic(() => import("./_components/ButtonGroup"), {
  ssr: false,
});
const DataFilter = dynamic(() => import("../_shared/DataFilter"), {
  ssr: false,
});

import type { resumeType } from "./resumeService";

const css = require("./_components/Resume.module.css");

interface resumeProps {
  resumeData: resumeType[];
  total: number;
  categoryData: string;
}
const ResumeClient = ({ resumeData, total, categoryData }: resumeProps) => {
  const [resNum, setResNum] = useState(0);
  const list = usePaginatedList('/api/resumes', resumeData, total, 5);
  const resumes = list.items;
  const current = resumes[resNum];
  const categoryMap = useMemo(() => new Map<string, number>(JSON.parse(categoryData)), [categoryData]);
  const hasMoreResumes = list.hasMore;
  function selectCategory(value: string) {
    setResNum(0);
    if (value === 'all') void list.select({ type: 'all' }, total, resumeData);
    else void list.select({ type: 'category', filter: value }, categoryMap.get(value) ?? 0);
  }
  async function changeResNum(event: React.MouseEvent, direction: string) {
    event.preventDefault();
    if (list.pending) return;
    if (direction === 'left') setResNum(index => Math.max(0, index - 1));
    else if (resNum < resumes.length - 1) setResNum(index => Math.min(index + 1, resumes.length - 1));
    else if (hasMoreResumes) {
      const key = queryKey(list.query);
      const next = resumes.length;
      const added = await list.loadMore();
      if (added && queryKey(list.getSnapshot().query) === key) setResNum(next);
    }
  }

  return (
    <>
      <DataFilter
        titles={["Category"]}
        options={[Array.from(categoryMap.keys())]}
        values={[list.query.type === 'all' ? 'all' : list.query.filter!]}
        firstHandler={selectCategory}
      />
      <ListStatus pending={list.pending} error={list.error} retry={() => { void list.loadMore(); }} />
      {!list.pending && !list.error && !current && <p>No resumes match this filter.</p>}
      {current && <>
      <section
        id="resume"
        className={css.resume}
      >
        <div>
          <label
            id="previousResume"
            aria-label="View Previous Resume"
            className={css.resumeControls}
          >
            Prev
            <button
              aria-labelledby="previousResume"
              disabled={list.pending || resNum === 0}
              className={`${css.leftArrow} ${resNum === 0 && css.disabled}`}
              onClick={(e) => changeResNum(e, "left")}
            >
              <BsArrowLeft />
            </button>
          </label>

          <label
            id="nextResume"
            aria-label="View Next Resume"
            className={css.resumeControls}
          >
            Next
            <button
              aria-labelledby="nextResume"
              disabled={list.pending || (resNum >= resumes.length - 1 && !hasMoreResumes)}
              className={`${css.rightArrow} ${
                resNum === resumes.length - 1 &&
                !hasMoreResumes &&
                css.disabled
              }`}
              onClick={(e) => changeResNum(e, "right")}
            >
              {resNum === resumes.length - 1 && hasMoreResumes ? (
                <BsPlusCircleFill />
              ) : (
                <BsArrowRight />
              )}
            </button>
          </label>
        </div>
        <Image
          id="resumeImage"
          src={current.image_url}
          alt="My Resume pdf view"
          width={800}
          height={1400}
          priority={resNum === 0}
          blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8fwYAAtABzbrmHzgAAAAASUVORK5CYII="
          placeholder="blur"
          onClick={() => {
            let image = document.getElementById("resumeImage")!;
            if (window.innerWidth < 1400) {
              return;
            }
            if (image.style.transform === "scale(1)") {
              image.style.transform = "scale(1.2)";
              image.style.zIndex = "30";
            } else {
              image.style.transform = "scale(1)";
              image.style.zIndex = "10";
            }
          }}
        />
      </section>

      <ButtonGroup
        section="bottom"
        download={current.download}
        view={current.view}
      />
      </>}
    </>
  )
}

export default ResumeClient;
