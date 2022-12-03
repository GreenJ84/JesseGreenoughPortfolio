import React, { useState } from 'react'
import { MongoClient } from 'mongodb'

import WorkBody from './WorkBody';
import WorkCard from './WorkCard';

import { workHistory } from "../../../Utils/data/WorkData"
import { GetStaticProps } from 'next';

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

export const getStaticProps: GetStaticProps = async () => {

    const client = new MongoClient(process.env.DB_CONN_STRING!)
    const db = client.db()

    const workData = db.collection(process.env.WORK_COLL!)

    const results = await workData.find().toArray()

    return {
        props: {
            workData: results.map(result => ({

            }))
        },
    }
}

export default WorkExp