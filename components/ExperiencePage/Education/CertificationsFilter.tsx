import React from "react";

const css = require("./CertificationsFilters.module.css")

interface filterProps {
  issuerHandler: Function;
  techHandler: Function;
  options: [Set<string>, Set<string>]
}

const CertificationsFilter = (props: filterProps) => {
  const [issuers, techs] = props.options;
  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>, type: string) => {
    e.preventDefault()
    if (type == "issuer") {
      props.issuerHandler(e.currentTarget.value)
    }
    else if (type == "tech") {
      props.techHandler(e.currentTarget.value)
    }
  }

  return (
    <div className={css.certificationsFilter}>
      <div>
        <h4>Filter by Issuer</h4>
        <select
          name="IssuerSelect"
          id="issuerSelect"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => changeHandler(e, "issuer")}
        >
          <option value="all">All</option>
          {[...issuers].map((cat) =>
            <option key={cat} value={cat}>{cat.toUpperCase()}</option>
          )}
        </select>
      </div>

      {/* <div>
        <h4>Filter by Techs&nbsp;Involved</h4>
        <select
          name="TechSelect"
          id="techSelect"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => changeHandler(e, "tech")}
        >
          <option value="all">All</option>
          {[...techs].map((tech) =>
            <option key={tech} value={tech}>{tech}</option>
          )}
        </select>
      </div> */}
    </div>
  );
};

export default CertificationsFilter;
