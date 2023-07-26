/** @format */

import React from "react";
import dynamic from "next/dynamic";

// Icon Dynamic Imports
const DiReact = dynamic(() => import("react-icons/di").then((m) => m.DiReact));
const SiChai = dynamic(() => import("react-icons/si").then((m) => m.SiChai));
const SiDjango = dynamic(() =>
  import("react-icons/si").then((m) => m.SiDjango)
);
const SiExpress = dynamic(() =>
  import("react-icons/si").then((m) => m.SiExpress)
);
const SiFlask = dynamic(() => import("react-icons/si").then((m) => m.SiFlask));
const SiJest = dynamic(() => import("react-icons/si").then((m) => m.SiJest));
const SiMocha = dynamic(() => import("react-icons/si").then((m) => m.SiMocha));
const SiNextdotjs = dynamic(() =>
  import("react-icons/si").then((m) => m.SiNextdotjs)
);
const SiSpringboot = dynamic(() =>
  import("react-icons/si").then((m) => m.SiSpringboot)
);
const SiTailwindcss = dynamic(() =>
  import("react-icons/si").then((m) => m.SiTailwindcss)
);

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
          name="Flask"
          rating={3}
          icon={<SiFlask className={css.icon} />}
        />
        <TechnicalSkill
          name="Spring Boot"
          rating={3}
          icon={<SiSpringboot className={css.icon} />}
        />
        <TechnicalSkill
          name="MochaJS"
          rating={2}
          icon={<SiMocha className={css.icon} />}
        />
        <TechnicalSkill
          name="Django"
          rating={1}
          icon={<SiDjango className={css.icon} />}
        />
      </ul>
    </section>
  );
};

export default Framework;
