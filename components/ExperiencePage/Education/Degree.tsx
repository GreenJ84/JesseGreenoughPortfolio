import React, { useState } from 'react'
import DegreeCard from './DegreeCard'
import { education } from '../../../Utils/data/EducationData'
import Image from 'next/image'

const css = require('./Degree.module.css')

const Degree = () => {
    const [educationExp, setEducationExp] = useState( education );
    


    return (
        <>
            <h1 className={ css.title }> Degrees Recieved </h1>
            { educationExp.map((exp) => <div key={ exp.college } className={ css.icons }>
                <Image src={exp.icon} width={ 200 } height={ 200 } alt={`${exp.college} icon`} className={ css.image } /> 
                <DegreeCard education={ exp } />
            </div>)}
        </>
    )
}

export default Degree