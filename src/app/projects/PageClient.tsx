"use client";
import axios from 'axios';
import dynamic from 'next/dynamic';
import React, { useEffect, useMemo, useState } from 'react'

import { DataFilter } from "../../components/Layout/LayoutExtras";
import ProjectCard from "./ProjectCard";
const AddItemButton = dynamic(() =>
  import("../../components/Layout/LayoutExtras").then((mod) => mod.AddItemButton)
);

import { projectType } from '../../utils/services/projectsService';
type currentDisplayType = "all" | "top" | "category" | "tech";

const css = require("./Project.module.css");

const PageClient = ({JSONData, total, filters}: {
  JSONData: string[],
  total: number,
  filters: [[string, number][], [string, number][]]
}) => {
  const projectData: projectType[] = useMemo(() => JSONData.map(project => JSON.parse(project) as projectType), [JSONData]);

  const [projects, setProjects] = useState<projectType[]>(projectData);
  const [currentType, setCurrentType] = useState<currentDisplayType>("top");
  const [category, setCategory] = useState("top");
  const [tech, setTech] = useState("top");

  function updateFilterOption(filter: HTMLSelectElement, idx: number) {
    filter.getElementsByTagName("option")[idx]!.selected = true;
  }

  useEffect(() => {
    const techFilter = document.getElementById(
      "secondSelector"
    )! as HTMLSelectElement;

    async function filter() {
      if (category === "top") {
        setProjects(projectData);
        setCurrentType("top");
        updateFilterOption(techFilter, 1);
      } else if (category === "all") {
        const projRes = await axios.get(`/api/projects?type=all&offset=0`);
        setProjects(projRes.data);
        setCurrentType("all");
        updateFilterOption(techFilter, 2);
      } else {
        const projRes = await axios.get(
          `/api/projects?type=category&filter=${category}&offset=0`
        );
        setProjects(projRes.data);
        setCurrentType("category");
        updateFilterOption(techFilter, 0);
      }
    }
    filter();
  }, [category, projectData]);

  // Filter projects on tech change
  useEffect(() => {
    const catFilter = document.getElementById(
      "firstSelector"
    )! as HTMLSelectElement;
    async function filter() {
      if (tech === "top") {
        setProjects(projectData);
        setCurrentType("top");
        updateFilterOption(catFilter, 1);
      } else if (tech === "all") {
        const projRes = await axios.get(`/api/projects?type=all&offset=0`);
        setProjects(projRes.data);
        setCurrentType("all");
        updateFilterOption(catFilter, 2);
      } else {
        const projRes = await axios.get(
          `/api/projects?type=tech&filter=${tech}&offset=0`
        );
        setProjects(projRes.data);
        setCurrentType("tech");
        updateFilterOption(catFilter, 0);
      }
    }
    filter();
  }, [tech, projectData]);

  const [categories, techs] = filters;
  const categoryMap: Map<string, number> = new Map(categories);
  const techMap: Map<string, number> = new Map(techs);
  function checkMoreProjects(): boolean {
    switch (currentType) {
      case "all":
        return projects.length < total;
      case "category":
        return categoryMap.get(category)! > projects.length;
      case "tech":
        return techMap.get(tech)! > projects.length;
      default:
        return false;
    }
  }

  // Add extra data to projects list on user expand
  async function handleAddingProjects(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const offset = projects.length;
    let projRes: any;

    switch (currentType) {
      case "all":
        projRes = await axios.get(`/api/projects?type=all&offset=${offset}`);
        break;
      case "category":
        projRes = await axios.get(
          `/api/projects?type=category&filter=${category}&offset=${offset}`
        );
        break;
      case "tech":
        projRes = await axios.get(
          `/api/projects?type=tech&filter=${tech}&offset=${offset}`
        );
        break;
      default:
        return;
    }

    if (projRes) {
      setProjects((projects) => [...projects, ...projRes.data]);
    }
  }

  return (
    <>
      <DataFilter
        titles={["Category", "Technology"]}
        options={[Array.from(categoryMap.keys()), Array.from(techMap.keys())]}
        firstHandler={(cat: string) => setCategory(cat)}
        secondHandler={(tech: string) => setTech(tech)}
      />
      {currentType == "top" ? (
        <h1 id="projectsTitle">
          My current <span className="detail">Top 10</span> projects
        </h1>
      ) : (
        <h1 id="projectsTitle">
          I have created over
          <span className="detail">
            {` ${
              currentType === "all"
                ? total
                : currentType === "category"
                ? categoryMap.get(category)!
                : techMap.get(tech)!
            } `}
          </span>
          projects to date
        </h1>
      )}
      <ul
        id="projectsList"
        className={css.projectsListHolder}
      >
        {projects.map((project) => (
          <ProjectCard
            project={project}
            key={project.id}
          />
        ))}
      </ul>
      {currentType !== "top" &&
        projects.length % 10 === 0 &&
        checkMoreProjects() && (
          <AddItemButton
            clickHandler={handleAddingProjects}
            itemType="Projects"
          />
        )
      }
    </>
  )
}

export default PageClient