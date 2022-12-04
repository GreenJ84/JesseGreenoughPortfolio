import React from 'react'

import Certifications from './Certifications'
import Degree from './Degree'
import EduBody from './EduBody'

const bodyStyle = {
    backgroundColor: '#001A04',
    padding: '0 0 6rem'
}

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
