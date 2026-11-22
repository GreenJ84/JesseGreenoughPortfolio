/** @format */
"use client";

import ListStatus from '../../../_shared/ListStatus';
import { usePaginatedList } from '../../../_shared/usePaginatedList';
import dynamic from "next/dynamic";

import Image from "next/image";
import EducationImg from "./EduImage";
import DegreeCard from "./DegreeCard";
const AddItemsButton = dynamic(() =>
import("../../../_shared/AddItemsButton")
);

import { EducationType } from "@/app/_lib/_types";

const css = require("./Degree.module.css");

interface Education {
  educationData: {
    eduItems: EducationType[];
    total: number;
  };
}

const Degree = ({ educationData }: Education) => {
  const { eduItems, total } = educationData;

  const list = usePaginatedList('/api/education', eduItems, total, 5);
  const education = list.items;

  return (
    <section id="degreeContainer">
      <EducationImg />
      <ListStatus pending={list.pending} error={list.error} retry={() => { void list.loadMore(); }} />
      <ul
        id="degreeList"
        style={{ all: "unset" }}
      >
        {education.map((exp) => (
          <li
            key={exp.id}
            className={css.degrees}
          >
            <a href={exp.url}>
              <Image
                src={exp.image}
                width={200}
                height={200}
                alt={`${exp.college} icon`}
                className={css.image}
                loading="lazy"
              />
            </a>
            <DegreeCard education={exp} />
          </li>
        ))}
      </ul>
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
