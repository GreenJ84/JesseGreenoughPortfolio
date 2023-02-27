/** @format */

import React from "react";

const css = require("./ProjectNavbar.module.css");
export interface ProjectNavProps {
  langHandler: Function;
  techHandler: Function;
  options: [Set<string>, Set<string>]
}

const ProjectNavbar = (props: ProjectNavProps) => {
  const [categories, techs] = props.options;
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
          <option selected>Top 10</option>
          <option value="all">All</option>
          {[...categories].map((cat) =>
            <option key={cat} value={cat}>{cat.toUpperCase()}</option>
          )}
        </select>
      </div>

      <div>
        <h4>Filter by Key&nbsp;Tech</h4>
        <select
          name="TechSelect"
          id="techSelect"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => changeHandler(e, "tech")}
        >
          <option selected>Top 10</option>
          <option value="all">All</option>
          {[...techs].map((tech) =>
            <option key={tech} value={tech}>{tech}</option>
          )}
        </select>
      </div>
    </div>
  );
};

export default ProjectNavbar;
