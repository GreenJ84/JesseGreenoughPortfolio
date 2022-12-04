import React, { useState } from 'react'
// import {MongoClient} from 'mongodb'
// import { GetStaticProps } from 'next'
import Image from 'next/image'

import DegreeCard from './DegreeCard'

import { education } from '../../../Utils/data/EducationData'
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

// export const getStaticProps: GetStaticProps = async () => {

//     const client = new MongoClient(process.env.DB_CONN_STRING!)
//     const db = client.db()

//     const educationData = db.collection(process.env.EDU_COLL!)

//     const results = await educationData.find().toArray()

//     return {
//         props: {
//             educationData: results.map(result => ({

//             }))
//         },
//     }
// }

export default Degree