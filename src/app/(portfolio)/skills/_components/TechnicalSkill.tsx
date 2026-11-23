/** @format */


import { TSkill } from "./skillData";

const css = require("./Skill.module.css");

const TechnicalSkill = ({name, icon}: TSkill) => {
  const Icon = icon;

  return (
    <li className={css.skillContainer}>
      <Icon aria-hidden="true"/>
      <span> {name} </span>
    </li>
  );
};

export default TechnicalSkill;
