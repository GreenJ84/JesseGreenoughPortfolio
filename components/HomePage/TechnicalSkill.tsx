/** @format */

import React from "react";

import { IconBaseProps } from "react-icons";

const css = require("./TechnicalSkills.module.css");

interface skillProps {
  name: string;
  rating: number;
  icon: IconBaseProps | JSX.Element;
}

const TechnicalSkill = (props: skillProps) => {
  return (
    <li className={css.skillContainer}>
      <>
        {props.icon}
        <span> {props.name} </span>
        <meter
          min={0}
          max={5}
          high={4}
          low={2}
          optimum={5}
          value={props.rating}
        />
      </>
    </li>
  );
};

export default TechnicalSkill;
