/** @format */

import React from "react";
import dynamic from "next/dynamic";

// Icon Dynamic Imports
const DiCss3 = dynamic(() => import("react-icons/di").then((m) => m.DiCss3));
const DiJavascript1 = dynamic(() =>
  import("react-icons/di").then((m) => m.DiJavascript1)
);
const DiPython = dynamic(() =>
  import("react-icons/di").then((m) => m.DiPython)
);
const FaRust = dynamic(() => import("react-icons/fa").then((m) => m.FaRust));
const SiScratch = dynamic(() =>
  import("react-icons/si").then((m) => m.SiScratch)
);
const SiTypescript = dynamic(() =>
  import("react-icons/si").then((m) => m.SiTypescript)
);
const SiJava = dynamic(() => import("react-icons/si").then((m) => m.SiJava));
const SiSolidity = dynamic(() =>
  import("react-icons/si").then((m) => m.SiSolidity)
);
const SiGraphql = dynamic(() =>
  import("react-icons/si").then((m) => m.SiGraphql)
);
const BsFillMarkdownFill = dynamic(() =>
  import("react-icons/bs").then((m) => m.BsFillMarkdownFill)
);
const AiFillHtml5 = dynamic(() =>
  import("react-icons/ai").then((m) => m.AiFillHtml5)
);
const AiOutlineConsoleSql = dynamic(() =>
  import("react-icons/ai").then((m) => m.AiOutlineConsoleSql)
);

// Container Dynamic Import
const TechnicalSkill = dynamic(() => import("./TechnicalSkill"));

const css = require("./Home.module.css");

const Languages = () => {
  return (
    <section id="development-languages">
      <h3 className={css.skillSectionTitle}>
        Programming <span className="detail_plus">Languages</span>
      </h3>
      <ul
        id="languages"
        className={css.skillsListContainer}
      >
        {/* Languages */}
        <TechnicalSkill
          name="HTML5"
          rating={5}
          icon={<AiFillHtml5 className={css.icon} />}
        />
        <TechnicalSkill
          name="CSS3"
          rating={5}
          icon={<DiCss3 className={css.icon} />}
        />
        <TechnicalSkill
          name="JavaScript"
          rating={5}
          icon={<DiJavascript1 className={css.icon} />}
        />
        <TechnicalSkill
          name="TypeScript"
          rating={5}
          icon={<SiTypescript className={css.icon} />}
        />
        <TechnicalSkill
          name="Python"
          rating={4}
          icon={<DiPython className={css.icon} />}
        />
        <TechnicalSkill
          name="GraphQL"
          rating={4}
          icon={<SiGraphql className={css.icon} />}
        />
        <TechnicalSkill
          name="SQL"
          rating={4}
          icon={<AiOutlineConsoleSql className={css.icon} />}
        />
        <TechnicalSkill
          name="Scratch"
          rating={4}
          icon={<SiScratch className={css.icon} />}
        />
        <TechnicalSkill
          name="Markdown"
          rating={3}
          icon={<BsFillMarkdownFill className={css.icon} />}
        />
        <TechnicalSkill
          name="Rust"
          rating={3}
          icon={<FaRust className={css.icon} />}
        />
        <TechnicalSkill
          name="Java"
          rating={3}
          icon={<SiJava className={css.icon} />}
        />
        <TechnicalSkill
          name="Solidity"
          rating={2}
          icon={<SiSolidity className={css.icon} />}
        />
      </ul>
    </section>
  );
};

export default Languages;
