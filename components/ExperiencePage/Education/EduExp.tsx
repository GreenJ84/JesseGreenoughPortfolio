import React from 'react'
import Certifications from './Certifications'
import Degree from './Degree'
import EduBody from './EduBody'

const EduExp = () => {
    return (
        <div style={ bodyStyle }>
            <EduBody />
            <Degree />
            <Certifications />
        </div>
    )
}

export default EduExp;

const bodyStyle = {
    backgroundColor: '#001A04'
}