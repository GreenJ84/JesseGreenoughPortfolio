import React from 'react'
import { educationType } from '../../../Utils/data/EducationData'
import { HiOutlineExternalLink } from 'react-icons/hi'

const css = require('./DegreeCard.module.css')

interface degreeCard {
    education: educationType
}

const DegreeCard = (props: degreeCard ) => {
    return (
        <div className={css.cardBody}>
            <div className={ css.cardHead }>
                <h1>
                    {props.education.college}
                </h1>
                <p>
                    { props.education.date}
                </p>
                <p>
                    { props.education.degree }
                </p>
            </div>
            <div className={ css.cardText }>
                {props.education.description.map((item, idx) => <li key={idx}> ☞ {item} </li>)}
                <a target='blank' href={ props.education.website } className={ css.button }> Visit Site <HiOutlineExternalLink /> </ a>
            </div>
        </div>
    )
}

export default DegreeCard