import React, { useState } from 'react'
import { Container } from 'react-bootstrap';
import EduExp from '../../components/ExperiencePage/eduExp';
import ExpNavbar from '../../components/ExperiencePage/ExpNavbar';
import WorkExp from '../../components/ExperiencePage/workExp';

const ExperiencePage = () => {
    const [showWork, setShowWork] = useState(false);

    const changeActive = () => {
        if (showWork) {
            setShowWork(false)
        } else {
            setShowWork(true)
        }
    }

    return (
        <Container style={{ padding: '12rem 1rem 1rem'}}>
            <ExpNavbar changeActive={ changeActive }  workActive={ showWork } />
            <div>
                { showWork ? 
                    <WorkExp /> :
                    <EduExp />
                }
            </div>
        </Container>
    )
}

export default ExperiencePage;