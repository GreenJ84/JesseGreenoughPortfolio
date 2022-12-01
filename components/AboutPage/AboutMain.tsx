import Image from 'next/image'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import AboutCard from './AboutCard'
import DeveloperTools from './DeveloperTools'
import GithubCard from './GithubCard'
import TechnicalSkills from './TechnicalSkills'
import laptopImage from '../../public/assets/about.png'

const css = require('./AboutMain.module.css')

const AboutMain = () => {
    return (
        <Container className={ css.body }>
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
                Know Who <strong className="purple">I Am</strong>
            </h1>
            <AboutCard />
            <Image src={ laptopImage } alt="about" className={ css.image } />
            <h1 className={ css.projectHeading }>
                Technical <strong className="purple">Skillset </strong>
            </h1>
            <TechnicalSkills />

            <h1 className={ css.projectHeading }>
                <strong className="purple">Tools</strong> I use
            </h1>
            <DeveloperTools />

            <GithubCard />
        </Container>
    )
}

export default AboutMain