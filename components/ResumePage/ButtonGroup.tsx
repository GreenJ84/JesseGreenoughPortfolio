/** @format */

import React from "react";

import { Button } from "react-bootstrap";
import { AiOutlineDownload, AiOutlineEye } from "react-icons/ai";

const css = require("../../styles/Resume.module.css");

interface resumeButtons {
  section: string;
  download: string;
  view: string;
}

const ButtonGroup = (props: resumeButtons) => {
  return (
    <section
      id={`${props.section}-buttons`}
      className={css.resumeButtonHolder}
    >
      <Button
        variant="primary"
        href={props.download}
        target="_blank"
        className={css.resumeButton}
      >
        <AiOutlineDownload />
        &nbsp;Save
      </Button>
      <Button
        variant="primary"
        href={props.view}
        target="_blank"
        className={css.resumeButton}
      >
        <AiOutlineEye />
        &nbsp;View
      </Button>
    </section>
  );
};

export default ButtonGroup;
