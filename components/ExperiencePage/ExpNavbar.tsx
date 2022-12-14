/** @format */

import React from "react";
import { NavItem } from "react-bootstrap";

const css = require("./ExpNavbar.module.css");

interface expNavProps {
  workActive: boolean;
  changeActive: Function;
}

const ExpNavbar = (props: expNavProps) => {
  return (
    <div className={css.nav}>
      <NavItem
        className={props.workActive ? css.navItem : css.activeNav}
        onClick={() => {
          if (props.workActive) {
            props.changeActive();
          }
        }}
      >
        {" "}
        Education{" "}
      </NavItem>
      <NavItem
        className={props.workActive ? css.activeNav : css.navItem}
        onClick={() => {
          if (!props.workActive) {
            props.changeActive();
          }
        }}
      >
        {" "}
        Work{" "}
      </NavItem>
    </div>
  );
};

export default ExpNavbar;
