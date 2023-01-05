/** @format */

import React from "react";
import { Col } from "react-bootstrap";
import { DiNodejs, DiReact } from "react-icons/di";
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
  SiSvelte,
  SiTailwindcss,
  SiWeb3Dotjs,
} from "react-icons/si";
import { TiWeatherWindyCloudy } from "react-icons/ti";

const css = require("./TechnicalSkills.module.css");

const Framework = () => {
  return (
    <>
      <h1 className={css.projectHeading}>
        Programming <strong className="detail">Frameworks </strong>
      </h1>
      <div className={css.body}>
        <Col
          xs={4}
          md={2}
          className={css.techIcons}
        >
          <DiNodejs />
          <span> NodeJS </span>
          <meter
            min={0}
            max={5}
            high={4}
            low={2}
            optimum={0}
            value={5}
          />
        </Col>
        <Col
          xs={4}
          md={2}
          className={css.techIcons}
        >
          <SiNextdotjs />
          <span> NextJS </span>
          <meter
            min={0}
            max={5}
            high={4}
            low={2}
            optimum={0}
            value={5}
          />
        </Col>
        <Col
          xs={4}
          md={2}
          className={css.techIcons}
        >
          <DiReact />
          <span> ReactJS </span>
          <meter
            min={0}
            max={5}
            high={4}
            low={2}
            optimum={0}
            value={4}
          />
        </Col>
        <Col
          xs={4}
          md={2}
          className={css.techIcons}
        >
          <SiRedux />
          <span> ReduxJS </span>
          <meter
            min={0}
            max={5}
            high={4}
            low={2}
            optimum={0}
            value={4}
          />
        </Col>
        <Col
          xs={4}
          md={2}
          className={css.techIcons}
        >
          <SiBootstrap />
          <span> BootStrap </span>
          <meter
            min={0}
            max={5}
            high={4}
            low={2}
            optimum={0}
            value={4}
          />
        </Col>
        <Col
          xs={4}
          md={2}
          className={css.techIcons}
        >
          <SiExpress />
          <span> ExpressJS </span>
          <meter
            min={0}
            max={5}
            high={4}
            low={2}
            optimum={0}
            value={3}
          />
        </Col>
        <Col
          xs={4}
          md={2}
          className={css.techIcons}
        >
          <SiJest />
          <span> Jest </span>
          <meter
            min={0}
            max={5}
            high={4}
            low={2}
            optimum={0}
            value={3}
          />
        </Col>
        <Col
          xs={4}
          md={2}
          className={css.techIcons}
        >
          <SiFlask />
          <span> Flask </span>
          <meter
            min={0}
            max={5}
            high={4}
            low={2}
            optimum={0}
            value={3}
          />
        </Col>
        <Col
          xs={4}
          md={2}
          className={css.techIcons}
        >
          <SiSpring />
          <span> Spring </span>
          <meter
            min={0}
            max={5}
            high={4}
            low={2}
            optimum={0}
            value={3}
          />
        </Col>
        <Col
          xs={4}
          md={2}
          className={css.techIcons}
        >
          <SiSpringboot />
          <span> Spring Boot </span>
          <meter
            min={0}
            max={5}
            high={4}
            low={2}
            optimum={0}
            value={3}
          />
        </Col>
        <Col
          xs={4}
          md={2}
          className={css.techIcons}
        >
          <SiMaterialui />
          <span> Materials-UI </span>
          <meter
            min={0}
            max={5}
            high={4}
            low={2}
            optimum={0}
            value={2}
          />
        </Col>
        <Col
          xs={4}
          md={2}
          className={css.techIcons}
        >
          <SiMocha />
          <span> MochaJS </span>
          <meter
            min={0}
            max={5}
            high={4}
            low={2}
            optimum={0}
            value={2}
          />
        </Col>
        <Col
          xs={4}
          md={2}
          className={css.techIcons}
        >
          <SiChai />
          <span> ChaiJS </span>
          <meter
            min={0}
            max={5}
            high={4}
            low={2}
            optimum={0}
            value={2}
          />
        </Col>
        <Col
          xs={4}
          md={2}
          className={css.techIcons}
        >
          <TiWeatherWindyCloudy />
          <span> EthersJS </span>
          <meter
            min={0}
            max={5}
            high={4}
            low={2}
            optimum={0}
            value={2}
          />
        </Col>
        <Col
          xs={4}
          md={2}
          className={css.techIcons}
        >
          <SiDjango />
          <span> Django </span>
          <meter
            min={0}
            max={5}
            high={4}
            low={2}
            optimum={0}
            value={2}
          />
        </Col>
        <Col
          xs={4}
          md={2}
          className={css.techIcons}
        >
          <SiTailwindcss />
          <span> Tailwind </span>
          <meter
            min={0}
            max={5}
            high={4}
            low={2}
            optimum={0}
            value={2}
          />
        </Col>
        <Col
          xs={4}
          md={2}
          className={css.techIcons}
        >
          <SiSvelte />
          <span> SvelteJS </span>
          <meter
            min={0}
            max={5}
            high={4}
            low={2}
            optimum={0}
            value={1}
          />
        </Col>
        <Col
          xs={4}
          md={2}
          className={css.techIcons}
        >
          <SiWeb3Dotjs />
          <span> Web3JS </span>
          <meter
            min={0}
            max={5}
            high={4}
            low={2}
            optimum={0}
            value={1}
          />
        </Col>

        {/*
                <Col xs={4} md={2} className={ css.techIcons }>
                    <DiMongodb />
                    <span> MongoDB </span>
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <DiMysql />
                    <span> MySQL </span>
                </Col>
                <Col xs={4} md={2} className={css.techIcons}>
                    <SiPostgresql />
                    <span> PostgreSQL </span>
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <DiGit />
                    <span> Git </span>
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiFirebase />
                    <span> Firebase </span>
                </Col> */}
      </div>
    </>
  );
};

export default Framework;
