import React, { useState } from 'react'
import { workHistory } from "../../../Utils/data/WorkData"
import WorkBody from './WorkBody';
import WorkCard from './WorkCard';

const css = require('./WorkExp.module.css')

const WorkExp = () => {
    const [workData, setWorkData] = useState( workHistory );
    const [extraData, setExtraData] = useState( workHistory )
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
                    workData.map((item) => <WorkCard key={item.position} work={item} />) :

                    extraData.map((item) => <WorkCard key={item.position} work={item} />)}
            </div>
        </>
    )
}

export default WorkExp