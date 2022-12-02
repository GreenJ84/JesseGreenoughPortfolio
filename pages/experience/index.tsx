import React, { useState } from 'react'
import EduExp from '../../components/ExperiencePage/eduExp';
import ExpNavbar from '../../components/ExperiencePage/ExpNavbar';
import WorkExp from '../../components/ExperiencePage/workExp';

const ExperiencePage = () => {
    const [showWork, setShowWork] = useState(false);


    return (
        <>
            <ExpNavbar />
            <div>
                { showWork ? 
                    <WorkExp /> :
                    <EduExp />
                }
            </div>
        </>
    )
}

export default ExperiencePage;