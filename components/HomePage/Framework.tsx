/** @format */

import dynamic from "next/dynamic";
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

const TechnicalSkill = dynamic(() => import("./TechnicalSkill"));

const css = require("./Home.module.css");

const Framework = () => {
  return (
    <section id="development-frameworks">
      <h3 className={css.skillSectionTitle}>
        Programming <span className="detail">Frameworks</span>
      </h3>
      <ul
        id="frameworks"
        className={css.skillsListContainer}
      >
        <TechnicalSkill
          name="NextJS"
          rating={5}
          icon={<SiNextdotjs className={css.icon} />}
        />
        <TechnicalSkill
          name="ReactJS"
          rating={5}
          icon={<DiReact className={css.icon} />}
        />
        <TechnicalSkill
          name="ReduxJS"
          rating={4}
          icon={<SiRedux className={css.icon} />}
        />
        <TechnicalSkill
          name="ExpressJS"
          rating={4}
          icon={<SiExpress className={css.icon} />}
        />
        <TechnicalSkill
          name="Tailwind"
          rating={3}
          icon={<SiTailwindcss className={css.icon} />}
        />
        <TechnicalSkill
          name="Jest"
          rating={3}
          icon={<SiJest className={css.icon} />}
        />
        <TechnicalSkill
          name="Cypress"
          rating={3}
          icon={<SiChai className={css.icon} />}
        />
        <TechnicalSkill
          name="BootStrap"
          rating={3}
          icon={<SiBootstrap className={css.icon} />}
        />
        <TechnicalSkill
          name="Flask"
          rating={3}
          icon={<SiFlask className={css.icon} />}
        />
        <TechnicalSkill
          name="Spring"
          rating={3}
          icon={<SiSpring className={css.icon} />}
        />
        <TechnicalSkill
          name="Spring Boot"
          rating={3}
          icon={<SiSpringboot className={css.icon} />}
        />
        <TechnicalSkill
          name="Materials-UI"
          rating={2}
          icon={<SiMaterialui className={css.icon} />}
        />
        <TechnicalSkill
          name="MochaJS"
          rating={2}
          icon={<SiMocha className={css.icon} />}
        />
        <TechnicalSkill
          name="ChaiJS"
          rating={2}
          icon={<SiChai className={css.icon} />}
        />
        <TechnicalSkill
          name="EthersJS"
          rating={2}
          icon={<TiWeatherWindyCloudy className={css.icon} />}
        />
        <TechnicalSkill
          name="Django"
          rating={1}
          icon={<SiDjango className={css.icon} />}
        />
        <TechnicalSkill
          name="Web3JS"
          rating={1}
          icon={<SiWeb3Dotjs className={css.icon} />}
        />
      </ul>
    </section>
  );
};

export default Framework;
