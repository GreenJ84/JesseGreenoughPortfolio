/** @format */

import React from "react";
import { Button, Row } from "react-bootstrap";
import { AiOutlineDownload } from "react-icons/ai";

const css = require("../../styles/Resume.module.css");

interface resumeButtons {
  section: string;
  download: string;
  view: string;
}

const ButtonGroup = (props: resumeButtons) => {
  return (
    <Row className={css.resumeButtonHolder}>
      <Button
        id={`${props.section}-download`}
        variant="primary"
        href={props.download}
        target="_blank"
        className={css.resumeButton}
      >
        <AiOutlineDownload />
        &nbsp;Download
      </Button>
      <Button
        id={`${props.section}-view`}
        variant="primary"
        href={props.view}
        target="_blank"
        className={css.resumeButton}
      >
        <AiOutlineDownload />
        &nbsp;View
      </Button>
    </Row>
  );
};

export default ButtonGroup;
