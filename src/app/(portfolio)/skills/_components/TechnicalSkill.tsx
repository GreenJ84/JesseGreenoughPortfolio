/** @format */


import { TSkill } from "./skillData";

const css = require("./Skill.module.css");

const TechnicalSkill = ({name, rating, icon}: TSkill) => {
  const Icon = icon;

  return (
    <li className={css.skillContainer}>
      <Icon aria-hidden="true"/>
      <span> {name} </span>
      <meter min={0} max={5} value={rating} aria-label={`${name} proficiency: ${rating} out of 5`} />
    </li>
  );
};

export default TechnicalSkill;
