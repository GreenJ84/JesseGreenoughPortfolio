/** @format */

import React from "react";
import dynamic from "next/dynamic";

import { DiSqllite, DiRedis } from "react-icons/di";
import { GrMysql } from "react-icons/gr";
import { SiAmazondynamodb, SiMongodb, SiPostgresql } from "react-icons/si";

const TechnicalSkill = dynamic(() => import("./TechnicalSkill"));

const css = require("./Home.module.css");

const Databases = () => {
  return (
    <section id="development-databases">
      <h3 className={css.skillSectionTitle}>
        <span className="detail">Databases</span>
      </h3>
      <ul
        id="databases"
        className={css.skillsListContainer}
      >
        <TechnicalSkill
          name="MongoDB"
          rating={5}
          icon={<SiMongodb className={css.icon} />}
        />
        <TechnicalSkill
          name="MySQL"
          rating={4}
          icon={<GrMysql className={css.icon} />}
        />
        <TechnicalSkill
          name="SQLite"
          rating={3}
          icon={<DiSqllite className={css.icon} />}
        />
        <TechnicalSkill
          name="Redis"
          rating={3}
          icon={<DiRedis className={css.icon} />}
        />
        <TechnicalSkill
          name="PostgresQL"
          rating={2}
          icon={<SiPostgresql className={css.icon} />}
        />
        <TechnicalSkill
          name="DynamoDB"
          rating={1}
          icon={<SiAmazondynamodb className={css.icon} />}
        />
      </ul>
    </section>
  );
};

export default Databases;
