"use client";

import ListStatus from '../_shared/ListStatus';
import { usePaginatedList } from '../_shared/usePaginatedList';
import { Work } from "@/app/_lib/_types";
import WorkCard from './_components/WorkCard';
import AddItemsButton from '../_shared/AddItemsButton';

const css = require("./_components/WorkExp.module.css");

export interface WorkExp {
  workData: Work[];
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
      <section id="workIntro" className={css.workIntro}>
        <h1 className={css.workBodyTitle}>Professional Experience</h1>
        <div className={css.workBody}>
          <p>
            Software development informed by more than eight years of customer success and team leadership. Explore the roles, teams, and projects that shaped how I work.
          </p>
        </div>
      </section>
      <nav
        id="workToggle"
        className={css.workFilter}
      >
        <button
          type="button"
          aria-pressed={!showSecWork}
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
          type="button"
          aria-pressed={showSecWork}
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
