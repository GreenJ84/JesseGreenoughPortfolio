/** @format */

import React from "react";

import { DiReact } from "react-icons/di";
import {
  SiBootstrap,
  SiChai,
  SiDjango,
  SiExpress,
  SiFlask,
  SiJest,
  SiMaterialui,
  SiMocha,
  SiNextdotjs,
  SiRedux,
  SiSpring,
  SiSpringboot,
  SiTailwindcss,
  SiWeb3Dotjs,
} from "react-icons/si";
import { TiWeatherWindyCloudy } from "react-icons/ti";

import TechnicalSkill from "./TechnicalSkill";

const css = require("./TechnicalSkills.module.css");

const Framework = () => {
  return (
    <div id="development-frameworks">
      <h3 className={css.skillSectionTitle}>
        Programming <b className="detail">Frameworks </b>
      </h3>
      <ul id="frameworks" className={css.skillsListContainer}>
        <TechnicalSkill name="NextJS" rating={5} icon={<SiNextdotjs />} />
        <TechnicalSkill name="ReactJS" rating={5} icon={<DiReact />} />
        <TechnicalSkill name="ReduxJS" rating={4} icon={<SiRedux />} />
        <TechnicalSkill name="Tailwind" rating={3} icon={<SiTailwindcss />} />
        <TechnicalSkill name="ExpressJS" rating={3} icon={<SiExpress />} />
        <TechnicalSkill name="Flask" rating={3} icon={<SiFlask />} />
        <TechnicalSkill name="Jest" rating={3} icon={<SiJest />} />
        <TechnicalSkill name="BootStrap" rating={3} icon={ <SiBootstrap />} />
        <TechnicalSkill name="Spring" rating={3} icon={<SiSpring />} />
        <TechnicalSkill name="Spring Boot" rating={3} icon={<SiSpringboot />} />
        <TechnicalSkill name="Materials-UI" rating={2} icon={<SiMaterialui />} />
        <TechnicalSkill name="Cypress" rating={2} icon={<SiChai />} />
        <TechnicalSkill name="MochaJS" rating={2} icon={<SiMocha />} />
        <TechnicalSkill name="ChaiJS" rating={2} icon={<SiChai />} />
        <TechnicalSkill name="EthersJS" rating={2} icon={<TiWeatherWindyCloudy />} />
        <TechnicalSkill name="Django" rating={1} icon={<SiDjango />} />
        <TechnicalSkill name="Web3JS" rating={1} icon={<SiWeb3Dotjs />} />
      </ul>
    </div>
  );
};

export default Framework;
