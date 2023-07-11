/** @format */

import React from "react";

const css = require("./Project.module.css");
export interface ProjectNavProps {
  catHandler: Function;
  techHandler: Function;
  options: [string[], string[]];
}

const ProjectNavbar = ({
  catHandler,
  techHandler,
  options,
}: ProjectNavProps) => {
  const [categories, techs] = options;
  const changeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
    type: string
  ) => {
    e.preventDefault();
    if (type == "category") {
      catHandler(e.currentTarget.value);
    } else if (type == "tech") {
      techHandler(e.currentTarget.value);
    }
  };

  return (
    <nav
      id="projectsFilter"
      className={css.projectNavbar}
    >
      <div>
        <h2>
          Filter by <span className="detail">Category</span>
        </h2>
        <select
          id="categorySelect"
          name="categorySelect"
          defaultValue="top"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            changeHandler(e, "category")
          }
        >
          <option disabled>...</option>
          <option value="top">Top 10</option>
          <option value="all">All</option>
          {[...categories].map((cat) => (
            <option
              key={cat}
              value={cat}
            >
              {cat.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h2>
          Filter by <span className="detail">Key Tech</span>
        </h2>
        <select
          id="techSelect"
          name="techSelect"
          defaultValue="top"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            changeHandler(e, "tech")
          }
        >
          <option disabled>...</option>
          <option value="top">Top 10</option>
          <option value="all">All</option>
          {[...techs].map((tech) => (
            <option
              key={tech}
              value={tech}
            >
              {tech}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
};

export default ProjectNavbar;
