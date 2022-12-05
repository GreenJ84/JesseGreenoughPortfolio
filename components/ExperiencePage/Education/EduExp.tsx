import React from 'react'
import { Experience } from '../../../pages/experience'
import { certificationType } from '../../../Utils/data/CertificationData'
import { educationType } from '../../../Utils/data/EducationData'

import Certifications from './Certifications'
import Degree from './Degree'
import EduBody from './EduBody'

const bodyStyle = {
    backgroundColor: '#001A04',
    padding: '0 2.5vw 6rem'
}

interface Education{
    educationData: educationType[]
    certificationData: certificationType[]
}

const EduExp = (props: Education) => {
    return (
        <div style={ bodyStyle }>
            <EduBody />
            <Degree educationData={ props.educationData } />
            <Certifications certificationData={ props.certificationData } />
        </div>
    )
}

export default EduExp;
