import React from 'react'
import { Container } from 'react-bootstrap';
import AboutMain from '../../components/AboutPage/AboutMain';

const AboutPage = () => {
    return (
        <Container fluid className="about-section">
            <AboutMain />
        </Container>
    )
}

export default AboutPage;