/** @format */

import React, { useState } from "react";
import Image from "next/image";

import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { AiOutlineDownload } from "react-icons/ai";

import { GetServerSideProps } from "next";
import { MongoClient } from "mongodb";
import ButtonGroup from "../../components/ResumePage/ButtonGroup";

const css = require("../../styles/Resume.module.css");

interface resumeProps{
  resumeData: [
    {
      link: string
      download: string
      view: string
      categories: string[]
    }
  ]
}
const ReumePage = (props: resumeProps) => {
  const [width, setWidth] = useState(0);
  const [resNum, setResNum] = useState(0);

  React.useEffect(() => {
    const checkWindow = (width: number) => {
      if (width < 900) {
        setWidth(width / 0.62);
      } else {
        setWidth(width);
      }
    };
    checkWindow(window.innerWidth);
    window.addEventListener("resize", () => checkWindow(window.innerWidth));

    return () => {
      window.removeEventListener("resize", () =>
        checkWindow(window.innerWidth)
      );
    };
  }, []);

  const changeResNum = (dir: string) => {
    if (dir == "left") {
      if (resNum <= 0) {
        setResNum(props.resumeData.length-1)
      }
      else {
        setResNum(resNum-1)
      }
    }
    else if (dir == "right") {
      setResNum(resNum+1%(props.resumeData.length-1))
    }
  }

  return (
    <Container
      fluid
      className={css.resumeSection}
    >
      <ButtonGroup
        download={props.resumeData[resNum].download} view={props.resumeData[resNum].view}
      />

      <Row className={css.resume}>
        <Image
          src={props.resumeData[resNum].link}
          alt="MyResume"
          width={width * 0.6}
          height={width * 0.6 * 1.3}
        />
      </Row>

      <ButtonGroup
        download={props.resumeData[resNum].download} view={props.resumeData[resNum].view}
      />

    </Container>
  );
};

export default ReumePage;

export const getServerSideProps: GetServerSideProps = async () => {
  const client = new MongoClient(process.env.DB_CONN_STRING!);
  const db = client.db(process.env.DB_NAME);

  const resumeData = db.collection(process.env.RES_COLL!);

  const results = await resumeData
    .find()
    .sort({ _id: -1 })
    .toArray();

  return {
    props: {
      resumeData: results.map((result) => ({
        id: result._id.toString(),
        link: result.link,
        download: result.download,
        view: result.view,
        categories: result.categories,
      })),
    },
  };
};
