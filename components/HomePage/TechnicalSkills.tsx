import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { CgCPlusPlus } from "react-icons/cg";
import { DiJavascript1, DiReact, DiNodejs, DiMongodb, DiPython, DiGit, DiMysql } from "react-icons/di";
import { SiPytorch, SiFirebase, SiNextdotjs, SiTypescript, SiJava, SiRedux, SiPostgresql, SiJest, SiTailwindcss, SiSolidity } from "react-icons/si";

const css = require('./TechnicalSkills.module.css')

const TechnicalSkills = () => {
    return (
        <>
            <h1 className={ css.projectHeading }>
                Technical <strong className="purple">Skillset </strong>
            </h1>
            <div className={ css.body }>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiTypescript />
                    <span> TypeScript </span>
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <DiJavascript1 />
                    <span> JaveScript </span>
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <DiNodejs />
                    <span> NodeJS </span>
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <DiReact />
                    <span> ReactJS </span>
                </Col>
                <Col xs={4} md={2} className={css.techIcons}>
                    <SiRedux />
                    <span> ReduxJS </span>
                </Col>
                <Col xs={4} md={2} className={css.techIcons}>
                    <SiNextdotjs />
                    <span> NextJS </span>
                </Col>
                <Col xs={4} md={2} className={css.techIcons}>
                    <SiJest />
                    <span> Jest </span>
                </Col>
                <Col xs={4} md={2} className={css.techIcons}>
                    <SiTailwindcss />
                    <span> Tailwind </span>
                </Col>
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
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiSolidity />
                    <span> Solidity </span>
                </Col>
                <Col xs={4} md={2} className={css.techIcons}>
                    <DiPython />
                    <span> Python </span>
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiJava />
                    <span> Java </span>
                </Col>
            </div>
        </>
    )
}

export default TechnicalSkills