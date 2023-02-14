/** @format */

import React from "react";
import { Col } from "react-bootstrap";
import { DiSqllite } from "react-icons/di";
import { GrMysql } from "react-icons/gr";
import { SiAmazondynamodb, SiMongodb, SiPostgresql } from "react-icons/si";
import TechnicalSkill from "./TechnicalSkill";

const css = require("./TechnicalSkills.module.css");

const Databases = () => {
  return (
    <>
      <h1 className={css.projectHeading}>
        <strong className="detail">Databases </strong>
      </h1>
      <div className={css.body}>
        <TechnicalSkill name="MongoDB" rating={5} icon={<SiMongodb />} />
        <TechnicalSkill name="MySQL" rating={4} icon={<GrMysql />} />
        <TechnicalSkill name="PostgresQL" rating={3} icon={<SiPostgresql />} />
        <TechnicalSkill name="DynamoDB" rating={1} icon={<SiAmazondynamodb />} />
        <TechnicalSkill name="SQLite" rating={1} icon={<DiSqllite />} />
      </div>
    </>
  );
};

export default Databases;
