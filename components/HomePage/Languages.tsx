/** @format */

import React from "react";

import { DiCss3, DiJavascript1, DiPython } from "react-icons/di";
import { FaSwift, FaRust } from "react-icons/fa";
import {
  SiScratch,
  SiGoland,
  SiTypescript,
  SiJava,
  SiSolidity,
  SiGraphql,
} from "react-icons/si";
import { BsFillMarkdownFill } from "react-icons/bs";
import { AiFillHtml5, AiOutlineConsoleSql } from "react-icons/ai";

import TechnicalSkill from "./TechnicalSkill";

const css = require("./TechnicalSkills.module.css");

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
          icon={<DiJavascript1 className={css.icon}/>}
        />
        <TechnicalSkill
          name="TypeScript"
          rating={5}
          icon={<SiTypescript className={css.icon}/>}
        />
        <TechnicalSkill
          name="Python"
          rating={4}
          icon={<DiPython className={css.icon}/>}
        />
        <TechnicalSkill
          name="GraphQL"
          rating={4}
          icon={<SiGraphql className={css.icon}/>}
        />
        <TechnicalSkill
          name="SQL"
          rating={4}
          icon={<AiOutlineConsoleSql className={css.icon}/>}
        />
        <TechnicalSkill
          name="Scratch"
          rating={4}
          icon={<SiScratch className={css.icon}/>}
        />
        <TechnicalSkill
          name="Markdown"
          rating={3}
          icon={<BsFillMarkdownFill className={css.icon}/>}
        />
        <TechnicalSkill
          name="Rust"
          rating={3}
          icon={<FaRust className={css.icon}/>}
        />
        <TechnicalSkill
          name="Java"
          rating={3}
          icon={<SiJava className={css.icon}/>}
        />
        <TechnicalSkill
          name="Solidity"
          rating={2}
          icon={<SiSolidity className={css.icon}/>}
        />
        <TechnicalSkill
          name="GO"
          rating={1}
          icon={<SiGoland className={css.icon}/>}
        />
        <TechnicalSkill
          name="Swift"
          rating={1}
          icon={<FaSwift className={css.icon}/>}
        />
      </ul>
    </section>
  );
};

export default Languages;
