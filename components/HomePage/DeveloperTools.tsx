import React from 'react'
import { Col } from 'react-bootstrap';

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
                    <span> Figma </span>
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiApollographql />
                    <span> Apollo </span>
                </Col>
                <Col xs={4} md={2} className={css.techIcons}>
                    <GrGraphQl />
                    <span> GraphQL </span>
                </Col>
                <Col xs={4} md={2} className={css.techIcons}>
                    <SiGitkraken /><span> GitKraken </span>
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiVisualstudiocode />
                    <span> VS Code </span>
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiPostman />
                    <span> Postman </span>
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiVercel />
                    <span> Vercel </span>
                </Col>
            </div>
        </>
    )
}

export default DeveloperTools