/** @format */

import React from "react";

import { TSkill } from "./skillData";

const css = require("./Skill.module.css");

const TechnicalSkill = ({name, rating, icon}: TSkill) => {
  const Icon = icon;

  return (
    <li className={css.skillContainer}>
      <Icon/>
      <span> {name} </span>
      <meter
        min={0}
        low={2}
        high={4}
        max={5}
        optimum={5}
        value={rating}
      />
    </li>
  );
};

export default TechnicalSkill;
