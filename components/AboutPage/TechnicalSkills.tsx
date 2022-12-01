import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { CgCPlusPlus } from "react-icons/cg";
import { DiJavascript1, DiReact, DiNodejs, DiMongodb, DiPython, DiGit, DiMysql } from "react-icons/di";
import { SiPytorch, SiFirebase, SiNextdotjs, SiTypescript, SiJava, SiRedux, SiPostgresql, SiJest, SiTailwindcss, SiSolidity } from "react-icons/si";

const css = require('./TechnicalSkills.module.css')

const TechnicalSkills = () => {
    return (
        <>
            <div className={ css.body }>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiTypescript />
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
                <Col xs={4} md={2} className={css.techIcons}>
                    <SiRedux />
                </Col>
                <Col xs={4} md={2} className={css.techIcons}>
                    <SiNextdotjs />
                </Col>
                <Col xs={4} md={2} className={css.techIcons}>
                    <SiJest />
                </Col>
                <Col xs={4} md={2} className={css.techIcons}>
                    <SiTailwindcss />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <DiMongodb />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <DiMysql />
                </Col>
                <Col xs={4} md={2} className={css.techIcons}>
                    <SiPostgresql />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <DiGit />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiFirebase />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiSolidity />
                </Col>
                <Col xs={4} md={2} className={css.techIcons}>
                    <DiPython />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiJava />
                </Col>
            </div>
        </>
    )
}

export default TechnicalSkills