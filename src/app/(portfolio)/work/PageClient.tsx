"use client";

import dynamic from "next/dynamic";
import ListStatus from '../_shared/ListStatus';
import { usePaginatedList } from '../_shared/usePaginatedList';
import { WorkType } from "@/app/_lib/_types";

const WorkImg = dynamic(() => import("./_components/WorkImg"));
const WorkCard = dynamic(() => import("./_components/WorkCard"));
const AddItemsButton = dynamic(() => import("../_shared/AddItemsButton"));

const css = require("./_components/WorkExp.module.css");

export interface WorkExp {
  workData: WorkType[];
  documentTotals: [number, number];
}
const WorkClient = ({ workData, documentTotals }: WorkExp) => {
  const list = usePaginatedList('/api/work', workData, documentTotals[0], 5, 'primary');
  const showSecWork = list.query.type === 'secondary';
  const work = list.items;
  function select(secondary: boolean) {
    if (secondary) void list.select({ type: 'secondary' }, documentTotals[1]);
    else void list.select({ type: 'primary' }, documentTotals[0], workData);
  }

  return (
    <>
      <section id="workIntro">
        <h1 className={css.workBodyTitle}>Professional Experience</h1>
        <div className={css.workBody}>
          <WorkImg />
          <p>
            I have over 8 years of customer success
            and leadership experience with proven results in a variety of
            fast-paced environments coupled with over 3 years of development
            experience across numerous technologies.
          </p>
        </div>
      </section>
      <nav
        id="workToggle"
        className={css.workFilter}
      >
        <button
          className={!showSecWork ? css.activeFilter : css.inactiveFilter}
          onClick={() => {
            if (showSecWork) {
              select(!showSecWork);
            }
          }}
        >
          Work
        </button>
        <button
          className={showSecWork ? css.activeFilter : css.inactiveFilter}
          onClick={() => {
            if (!showSecWork) {
              select(!showSecWork);
            }
          }}
        >
          Internship / Volunteer
        </button>
      </nav>
      <ListStatus pending={list.pending} error={list.error} retry={() => { void list.loadMore(); }} />
      <ul
        id="workList"
        className={css.workCardHolder}
      >
        {work.map((item) => (
          <WorkCard
            key={item.id}
            work={item}
          />
        ))}

      </ul>
      {!list.pending && !list.error && !work.length && <p>No work experience found.</p>}
      {list.hasMore && !list.error && <AddItemsButton itemType="Work" pending={list.pending} clickHandler={() => { void list.loadMore(); }} />}
    </>
  )
}

export default WorkClient;