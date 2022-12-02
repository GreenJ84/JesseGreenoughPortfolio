import React from 'react'
import { educationType } from '../../../Utils/data/EducationData'

const css = require('./DegreeCard.module.css')

interface degreeCard {
    education: educationType
}

const DegreeCard = (props: degreeCard ) => {
    return (
        <div className={css.cardBody}>
            <div>
                <h1>
                    {props.education.college}
                </h1>
                <p>
                    { props.education.date}
                </p>
                <p>
                    { props.education.degree }
                </p>
                <hr/>
            </div>
            { props.education.description.map((item) => <p key={item}> {item} </p>)}
        </div>
    )
}

export default DegreeCard