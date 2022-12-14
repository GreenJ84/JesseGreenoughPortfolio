import React from 'react'
import WorkImg from './WorkImg'

const css = require('./WorkBody.module.css')

const WorkBody = () => {
    return (
        <>
            <h1 className={ css.workBodyTitle } >
                Professional experience
            </h1>
            <div className={ css.workBody }>
                <WorkImg />
                <p>
                    I have over 5 year of customer success and operations management experience. Areas of team relations, inventories, operations and more in a variety of environents from a fast-paced college dining destination to a top department at my local groccery store. 
                </p>
            </div>
        </>
    )
}

export default WorkBody