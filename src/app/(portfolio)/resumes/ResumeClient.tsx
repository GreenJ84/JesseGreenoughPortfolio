"use client";
import { BsArrowLeft, BsArrowRight, BsPlusCircleFill } from "react-icons/bs";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import DataFilter from '../_shared/DataFilter';
import ButtonGroup from './_components/ButtonGroup';
import ListStatus from '../_shared/ListStatus';
import { usePaginatedList } from '../_shared/usePaginatedList';
import { queryKey } from '@/app/_lib/paginatedList';






import type { Resume } from '@/app/_lib/_types';

const css = require("./_components/Resume.module.css");

interface resumeProps {
  resumeData: Resume[];
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
  const visibleTotal = list.query.type === 'all' ? total : list.query.type === 'top' ? Math.min(total, 10) : categoryMap.get(list.query.filter ?? '') ?? 0;
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
      <DataFilter heading="Resumes" titles={["Category"]} options={[Array.from(categoryMap.keys())]} values={[list.query.type === 'category' ? list.query.filter : undefined]} onSelect={(_, value) => selectCategory(value || 'all')} mode={list.query.type === 'top' ? 'top' : list.query.type === 'all' ? 'all' : 'filtered'} onMode={mode => { setResNum(0); if (mode === 'top') void list.select({ type: 'top' }, Math.min(total, 10), resumeData); else selectCategory('all'); }} topLabel="Selected (top 10)" />
      <ListStatus pending={list.pending} error={list.error} retry={() => { void list.loadMore(); }} />
      {!list.pending && !list.error && !current && <p>No resumes match this filter.</p>}
      {current && <>
      <section
        id="resume"
        className={css.resume}
      >
        <div className={css.resumeNavigation}>
          <div className={css.resumeControls}>
            <button
              type="button"
              aria-label="Previous resume"
              disabled={list.pending || resNum === 0}
              onClick={(e) => changeResNum(e, "left")}
            >
              <BsArrowLeft />
            </button>
          </div>
          <p aria-live="polite">Resume {resNum + 1} of {visibleTotal}</p>
          <div className={css.resumeControls}>
            <button
              type="button"
              aria-label="Next resume"
              disabled={list.pending || (resNum >= resumes.length - 1 && !hasMoreResumes)}
              onClick={(e) => changeResNum(e, "right")}
            >
              {resNum === resumes.length - 1 && hasMoreResumes ? (
                <BsPlusCircleFill />
              ) : (
                <BsArrowRight />
              )}
            </button>
          </div>
        </div>
        <Image
          id="resumeImage"
          src={current.image_url}
          alt={`Preview of resume ${resNum + 1}`}
          width={800}
          height={1400}
          priority={resNum === 0}
        />
      </section>

      <ButtonGroup
        section="bottom"
        download={current.download}
        view={current.brief}
      />
      </>}
    </>
  )
}

export default ResumeClient;
