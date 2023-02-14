/** @format */

import React, { useEffect } from "react";

import NavItem from "./NavItem";

const css = require("./ProjectNavbar.module.css");
export interface ProjectNavProps {
  langHandler: Function;
  techHandler: Function;
}

const ProjectNavbar = (props: ProjectNavProps) => {
  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>, type: string) => {
    e.preventDefault()
    if (type == "lang") {
      props.langHandler(e.currentTarget.value)
    }
    else if (type == "tech") {
      props.techHandler(e.currentTarget.value)
    }
  }

  return (
    <div className={css.projectNavbar}>
      <div>
        <h4>Filter by Language</h4>
        <select
          name="LanguageSelect"
          id="langSelect"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => changeHandler(e, "lang")}
        >
          <option value="all">All</option>
          <option value="js">JavaScript</option>
          <option value="ts">TypeScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="sql">SQL</option>
          <option value="nosql">NoSQL</option>
          <option value="static">Static App</option>
        </select>
      </div>

      <div>
        <h4>Filter by Tech</h4>
        <select
          name="TechSelect"
          id="techSelect"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => changeHandler(e, "tech")}
        >
          <option value="all">All</option>
          <option value="NodeJS">NodeJS</option>
          <option value="ReactJS">ReactJS</option>
          <option value="NextJS">NextJS</option>
          <option value="CSS">Vanilla CSS</option>
          <option value="CSSFrame">CSS Frameworks</option>
          <option value="Redux">Redux</option>
          <option value="Apollo Services">Apollo GraphQL</option>
          <option value="ExpressJS">ExpressJS</option>
          <option value="Flask">Flask</option>
          <option value="Spring Boot">Spring Boot</option>
          <option value="Jest">Jest</option>
          <option value="AWS EC2">AWS EC2</option>
          <option value="Vercel">Vercel</option>
        </select>
      </div>
    </div>
  );
};

export default ProjectNavbar;
