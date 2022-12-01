import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { CgCPlusPlus } from "react-icons/cg";
import { DiJavascript1, DiReact, DiNodejs, DiMongodb, DiPython, DiGit } from "react-icons/di";
import { SiPytorch, SiFirebase, SiNextdotjs } from "react-icons/si";

const css = require('./TechnicalSkills.module.css')

const TechnicalSkills = () => {
    return (
        <>
            <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <CgCPlusPlus />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <DiJavascript1 />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <DiNodejs />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <DiReact />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <DiMongodb />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiNextdotjs />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <DiGit />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiFirebase />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <DiPython />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiPytorch />
                </Col>
            </Row>
        </>
    )
}

export default TechnicalSkills