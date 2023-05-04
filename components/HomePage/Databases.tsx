/** @format */

import React from "react";
import { DiSqllite, DiRedis } from "react-icons/di";
import { GrMysql } from "react-icons/gr";
import { SiAmazondynamodb, SiMongodb, SiPostgresql } from "react-icons/si";
import TechnicalSkill from "./TechnicalSkill";

const css = require("./TechnicalSkills.module.css");

const Databases = () => {
  return (
    <div id="development-databases">
      <h3 className={css.skillSectionTitle}>
        <b className="detail">Databases </b>
      </h3>
      <ul id="databases" className={css.skillsListContainer}>
        <TechnicalSkill name="MongoDB" rating={5} icon={<SiMongodb />} />
        <TechnicalSkill name="MySQL" rating={4} icon={<GrMysql />} />
        <TechnicalSkill name="SQLite" rating={3} icon={<DiSqllite />} />
        <TechnicalSkill name="Redis" rating={2} icon={<DiRedis />} />
        <TechnicalSkill name="PostgresQL" rating={3} icon={<SiPostgresql />} />
        <TechnicalSkill name="DynamoDB" rating={1} icon={<SiAmazondynamodb />} />
      </ul>
    </div>
  );
};

export default Databases;
