import React from 'react'
import EduImage from './EduImage'

const css = require('./EduBody.module.css')

const EduBody = () => {
    return (
        <div style={{ display: 'flex', padding: '2rem 3rem 0 1rem'}}>
            <div>
                <EduImage />
            </div>
            <div className={ css.bodyText }>
                <h1> Education </h1>
                <h3>
                    Basic Qualifications and Certifications 
                </h3>
                <p> I activiely participate in tech-related activities and partake in courses to further my understanding and knowledge. </p>
            </div>
        </div>
    )
}

export default EduBody