/** @format */

import React from "react";
import { Col } from "react-bootstrap";

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
import { BsFillMarkdownFill, BsKeyboard } from "react-icons/bs";
import { AiFillHtml5, AiOutlineConsoleSql } from "react-icons/ai";
import TechnicalSkill from "./TechnicalSkill";

const css = require("./TechnicalSkills.module.css");

const Languages = () => {
  return (
    <div id="development-languages">
      <h1 className={css.projectHeading}>
        Programming <strong className="detail">Languages </strong>
      </h1>
      <div id="languages" className={css.body}>
        {/* Languages */}
        <TechnicalSkill name="HTML5" rating={5} icon={<AiFillHtml5 />} />
        <TechnicalSkill name="CSS3" rating={5} icon={<DiCss3 />} />
        <TechnicalSkill name="JavaScript" rating={5} icon={<DiJavascript1 />} />
        <TechnicalSkill name="TypeScript" rating={5} icon={<SiTypescript />} />
        <TechnicalSkill name="Python" rating={4} icon={<DiPython />} />
        <TechnicalSkill name="GraphQL" rating={4} icon={<SiGraphql />} />
        <TechnicalSkill name="SQL" rating={4} icon={<AiOutlineConsoleSql />} />
        <TechnicalSkill name="Scratch" rating={4} icon={<SiScratch />} />
        <TechnicalSkill name="Markdown" rating={3} icon={<BsFillMarkdownFill />} />
        <TechnicalSkill name="Rust" rating={3} icon={<FaRust />} />
        <TechnicalSkill name="Java" rating={3} icon={<SiJava />} />
        <TechnicalSkill name="Solidity" rating={2} icon={<SiSolidity />} />
        <TechnicalSkill name="GO" rating={1} icon={<SiGoland />} />
        <TechnicalSkill name="Swift" rating={1} icon={<FaSwift />} />
      </div>
    </div>
  );
};

export default Languages;
