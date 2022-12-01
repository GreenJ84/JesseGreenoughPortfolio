import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { SiLinux, SiVisualstudiocode, SiPostman, SiHeroku, SiVercel } from "react-icons/si";

const css = require('./TechnicalSkills.module.css')

const DeveloperTools = () => {
    return (
        <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
            <Col xs={4} md={2} className={ css.techIcons }>
                <SiLinux />
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
            <Col xs={4} md={2} className={ css.techIcons }>
                <SiHeroku />
            </Col>
        </Row>
    )
}

export default DeveloperTools