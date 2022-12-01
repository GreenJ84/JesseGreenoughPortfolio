import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Image from 'next/image'
import Particle from '../layout/Particle'
import TypeWrite from './TypeWrite'
import homeLogo from '../../public/assets/home-main.svg'

const css = require('./HomeTop.module.css')

const HomeTop = () => {
    return (
        <Container fluid className={ css.homeSection } id="home">
            <Particle />
            <Container className={ css.homeContent }>
                <Row>
                    <Col md={7} className={ css.homeHeader }>
                        <h1 className={ css.heading }>
                            Hi There!{" "}
                            <span className={ css.wave } role="img" aria-labelledby="wave">
                            👋🏻
                            </span>
                        </h1>

                        <h1 className={ css.headingName }>
                            I&apos;M
                            <strong className={ css.mainName }> JESSE GREENOUGH </strong>
                        </h1>

                        <div className={ css.typeText }>
                            <TypeWrite typePrompts={props1} />
                            <br/>
                            <TypeWrite typePrompts={ props2 }/>
                        </div>
                    </Col>

                    <Col md={5} style={{ paddingBottom: 20 }}>
                        <Image src={homeLogo} alt="home pic" className="img-fluid" style={{ maxHeight: "450px" }} />
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default HomeTop

const props1 = [
    "Full-stack Developer",
    "TypeScript React focused Software Engineer",
    "Open Source Contributor",
]

const props2 = [
    "Front/Back-end Capable",
    "SQL/NoSQL Database, Python, & Java skills",
    "Always actively learning",
]