/** @format */

import React, { useEffect } from "react";

import NavItem from "./NavItem";

const css = require("./ProjectNavbar.module.css");
export interface ProjectNavProps {
  filterHandler: Function;
  active: string;
}

const ProjectNavbar = (props: ProjectNavProps) => {
  useEffect(() => {}, [props.active]);

  return (
    <div className={css.projectNavbar}>
      <NavItem
        value="all"
        {...props}
      />
      {/* <NavItem value="react" {...props} /> */}
      <NavItem
        value="js"
        {...props}
      />
      <NavItem
        value="python"
        {...props}
      />
      <NavItem
        value="java"
        {...props}
      />
      <NavItem
        value="static"
        {...props}
      />
    </div>
  );
};

export default ProjectNavbar;
