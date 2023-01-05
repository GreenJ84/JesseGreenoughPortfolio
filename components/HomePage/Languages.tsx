/** @format */

import React from "react";
import { Col } from "react-bootstrap";

import { DiCss3, DiJavascript1, DiPython } from "react-icons/di";
import { FaSwift } from "react-icons/fa";
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

const css = require("./TechnicalSkills.module.css");

const Languages = () => {
  return (
    <>
      <h1 className={css.projectHeading}>
        Programming <strong className="detail">Languages </strong>
      </h1>
      <div className={css.body}>
        {/* Languages */}
        <Col
          xs={4}
          md={2}
          className={css.techIcons}
        >
          <AiFillHtml5 />
          <span> HTML5 </span>
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
          <DiCss3 />
          <span> CSS3 </span>
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
          <DiJavascript1 />
          <span> JavaScript </span>
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
          <SiTypescript />
          <span> TypeScript </span>
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
          <BsFillMarkdownFill />
          <span> Markdown </span>
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
          <DiPython />
          <span> Python </span>
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
          <AiOutlineConsoleSql />
          <span> SQL </span>
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
          <SiGraphql />
          <span> GraphQL </span>
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
          <SiScratch />
          <span> Scratch </span>
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
          <SiJava />
          <span> Java </span>
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
          <SiSolidity />
          <span> Solidity </span>
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
          <SiGoland />
          <span> GO </span>
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
          <FaSwift />
          <span> Swift </span>
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
          <BsKeyboard />
          <span> C/C++ </span>
          <meter
            min={0}
            max={5}
            high={4}
            low={2}
            optimum={0}
            value={1}
          />
        </Col>
      </div>
    </>
  );
};

export default Languages;
