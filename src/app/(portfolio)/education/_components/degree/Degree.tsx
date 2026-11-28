/** @format */
"use client";

import ListStatus from '../../../_shared/ListStatus';
import { usePaginatedList } from '../../../_shared/usePaginatedList';
import dynamic from "next/dynamic";

import DegreeCard from "./DegreeCard";
const AddItemsButton = dynamic(() =>
import("../../../_shared/AddItemsButton")
);

import { EducationDTO } from "@/app/_lib/_types";

const css = require("./Degree.module.css");

interface Education {
  educationData: {
    eduItems: EducationDTO[];
    total: number;
  };
}

const Degree = ({ educationData }: Education) => {
  const { eduItems, total } = educationData;

  const list = usePaginatedList('/api/education', eduItems, total, 5);
  const education = list.items;

  return (
    <section id="degreeContainer" role="tabpanel" aria-labelledby="degree-tab">
      <ListStatus pending={list.pending} error={list.error} retry={() => { void list.loadMore(); }} />
      <ul
        id="degreeList"
        className={css.degreeList}
      >
        {education.map((exp) => (
          <li key={exp.id} className={css.degrees}><DegreeCard education={exp} /></li>
        ))}
      </ul>
      {!list.pending && !list.error && !education.length && <p className={css.empty}>No education records available yet.</p>}
      {list.hasMore && !list.error && (
        <AddItemsButton
          clickHandler={() => { void list.loadMore(); }}
          pending={list.pending}
          itemType="Education"
        />
      )}
    </section>
  );
};

export default Degree;
