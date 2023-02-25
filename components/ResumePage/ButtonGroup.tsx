import React from 'react'
import { Button, Row } from 'react-bootstrap'
import { AiOutlineDownload } from 'react-icons/ai'

const css = require("../../styles/Resume.module.css");

interface resumeButtons{
    download: string
    view: string
}

const ButtonGroup = (props: resumeButtons) => {
  return (
    <Row className={css.download}>
        <Button
        variant="primary"
        href={
            props.download
        }
        target="_blank"
        className={css.downloadButton}
        >
        <AiOutlineDownload />
        &nbsp;Download
        </Button>
        <Button
        variant="primary"
        href={
            props.view
        }
        target="_blank"
        className={css.downloadButton}
        >
        <AiOutlineDownload />
        &nbsp;View
        </Button>
    </Row>
  )
}

export default ButtonGroup