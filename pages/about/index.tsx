import React from 'react'
import { Container } from 'react-bootstrap';
import AboutInfo from '../../components/AboutPage/AboutInfo';
import AboutMain from '../../components/AboutPage/AboutMain';

const AboutPage = () => {
    return (
        <Container fluid>
            <AboutMain />
            <AboutInfo />
        </Container>
    )
}

export default AboutPage;