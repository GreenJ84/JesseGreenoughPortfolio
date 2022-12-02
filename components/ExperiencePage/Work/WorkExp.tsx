import React, { useState } from 'react'
import { workHistory } from "../../../Utils/data/WorkData"
import WorkBody from './WorkBody';
import WorkCard from './WorkCard';

const WorkExp = () => {
    const [workData, setWorkData] = useState(workHistory);

    return (
        <>
            <WorkBody />
            <div>
                {workData.map((item) => <WorkCard key={item.position} work={item} />)}
            </div>
        </>
    )
}

export default WorkExp