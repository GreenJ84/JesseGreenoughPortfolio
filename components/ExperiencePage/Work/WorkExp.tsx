import React, { useState } from 'react'

import WorkBody from './WorkBody';
import WorkCard from './WorkCard';

import { workItem } from "../../../Utils/data/WorkData"
// import workHistory from "../../../Utils/data/WorkData"
// import secondaryWorkData from '../../../Utils/data/SecondaryWorkData';

const css = require('./WorkExp.module.css')

interface Work {
    workData: workItem[]
    secondaryWorkData: workItem[]
}

const WorkExp = (props: Work) => {
    const [showWork, setShowWork] = useState(true);

    const filterHandler = () => {
        if (showWork) {
            setShowWork(false)
        } else {
            setShowWork(true)
        }
    }


    return (
        <>
            <WorkBody />
            <div className={ css.workFilter }>
                <p className={showWork ? css.activeFilter : ''} onClick={() => { if (!showWork){ filterHandler() }}}>
                    Work
                </p>
                <p className={showWork ? '' : css.activeFilter} onClick={() => { if (showWork){ filterHandler() }}}>
                    Internship/ Volunteer
                </p>
            </div>
            <div className={ css.workCardHolder }>
                {showWork ?
                    props.workData.map((item) => <WorkCard key={item.position} work={item} />) :

                    props.secondaryWorkData.map((item) => <WorkCard key={item.position} work={item} />)}
            </div>
        </>
    )
}

export default WorkExp