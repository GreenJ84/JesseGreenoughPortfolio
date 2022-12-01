import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { SiVisualstudiocode, SiPostman, SiVercel, SiGitkraken, SiApollographql, SiFigma } from "react-icons/si";
import { GrGraphQl } from 'react-icons/gr';

const css = require('./TechnicalSkills.module.css')

const DeveloperTools = () => {
    return (
        <>
            <h1 className={ css.projectHeading }>
                <strong className="purple">Tools</strong> I use
            </h1>
            <div className={css.body}>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiFigma />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiApollographql />
                </Col>
                <Col xs={4} md={2} className={css.techIcons}>
                    <GrGraphQl />
                </Col>
                <Col xs={4} md={2} className={css.techIcons}>
                    <SiGitkraken />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiVisualstudiocode />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiPostman />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiVercel />
                </Col>
            </div>
        </>
    )
}

export default DeveloperTools