/** @format */

import React from "react";

const css = require("./CertificationsFilters.module.css");

interface filterProps {
  issuerHandler: Function;
  techHandler: Function;
  options: [Set<string>, Set<string>];
}

const CertificationsFilter = (props: filterProps) => {
  const [issuers, techs] = props.options;

  const changeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
    type: string
  ) => {
    e.preventDefault();
    if (type == "issuer") {
      props.issuerHandler(e.currentTarget.value);
    } else if (type == "tech") {
      props.techHandler(e.currentTarget.value);
    }
  };

  return (
    <nav
      id="certificationFilters"
      className={css.certificationsFilter}
    >
      <div>
        <h4 id="issuerSelectLabel">
          Filter by <span className="detail">Issuer</span>
        </h4>
        <select
          id="issuerSelect"
          name="IssuerSelect"
          defaultValue="top"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            changeHandler(e, "issuer")
          }
        >
          <option value="disabled" disabled></option>
          <option value="top">Top 10</option>
          <option value="all">All</option>
          {[...issuers].map((cat) => (
            <option
              key={cat}
              value={cat}
            >
              {cat.toLocaleUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h4 id="techSelectLabel">
          Filter by <span className="detail">Technology</span>
        </h4>
        <select
          id="techSelect"
          name="TechSelect"
          defaultValue="top"
          aria-labelledby="techSelectLabel"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            changeHandler(e, "tech")
          }
        >
          <option value="disabled" disabled></option>
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

export default CertificationsFilter;
