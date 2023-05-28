/** @format */

import React from "react";

const css = require("./ExpNavbar.module.css");

interface expNavProps {
  workActive: boolean;
  changeActive: Function;
}

const ExpNavbar = (props: expNavProps) => {
  return (
    <nav className={css.nav}>
      <button
        type="button"
        role="radio"
        aria-checked={!props.workActive}
        aria-label="View My Educational experience"
        className={props.workActive ? css.navItem : css.activeNav}
        onClick={() => {
          if (props.workActive) {
            props.changeActive();
          }
        }}
      >
        Education
      </button>

      <button
        type="button"
        role="radio"
        aria-checked={props.workActive}
        aria-label="View My Work experience"
        className={props.workActive ? css.activeNav : css.navItem}
        onClick={() => {
          if (!props.workActive) {
            props.changeActive();
          }
        }}
      >
        Work
      </button>
    </nav>
  );
};

export default ExpNavbar;
