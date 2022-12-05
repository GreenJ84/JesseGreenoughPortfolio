import {MongoClient} from 'mongodb';
import { GetStaticProps } from 'next';
import React, { useState } from 'react'
import { Container } from 'react-bootstrap';

import EduExp from '../../components/ExperiencePage/Education/EduExp';
import ExpNavbar from '../../components/ExperiencePage/ExpNavbar';
import WorkExp from '../../components/ExperiencePage/Work/WorkExp';

import { certificationType } from '../../Utils/data/CertificationData';
import { educationType } from '../../Utils/data/EducationData';
export interface Experience {
    educationData: educationType[]
    certificationData: certificationType[]
}

const ExperiencePage = (props: Experience ) => {
    const [showWork, setShowWork] = useState(false);

    const changeActive = () => {
        if (showWork) {
            setShowWork(false)
        } else {
            setShowWork(true)
        }
    }

    return (
        <Container style={{ padding: '12rem 3vw 1rem' }}>
            <ExpNavbar changeActive={ changeActive } workActive={ showWork } />
            <div>
                { showWork ? 
                    <WorkExp /> :
                    <EduExp educationData={ props.educationData} certificationData={ props.certificationData } />
                }
            </div>
        </Container>
    )
}

export const getStaticProps: GetStaticProps<Experience> = async () => {

    const client = new MongoClient(process.env.DB_CONN_STRING!)
    const db = client.db(process.env.DB_NAME)

    const educationData = db.collection(process.env.DEG_COLL!)
    const cetificationData = db.collection(process.env.CERT_COLL!)

    const results1 = await educationData.find().toArray()
    const results2 = await cetificationData.find().toArray()

    return {
        props: {
            educationData: results1.map((result) => ({
                college: result.college,
                degree: result.degree,
                date:  result.date,
                description: result.description,
                icon: result.icon,
                website: result.website,
                id: result._id.toString()
            })),
            certificationData: results2.map((result) => ({
                title: result.title,
                issuer: result.issuer,
                date: result.date,
                url:  result.url,
                description: result.description,
                image: result.image,
                id: result._id.toString()
            })),
        },
        revalidate: 10,
    }
}

export default ExperiencePage;