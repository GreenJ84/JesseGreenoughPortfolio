import React, { useState } from 'react'
// import { GetStaticProps } from 'next'
// import { MongoClient } from 'mongodb'

import CertificationCard from './CertificationCard'

import { certifications } from '../../../Utils/data/EducationData'
const css = require('./Certifications.module.css')

const Certifications = () => {
  const [certData, setCertData] = useState(certifications)

  return (
    <>
      <h1 className={ css.certTitle }> Certifications Achieved </h1>
      <div className={ css.certCardHolder }>
        { certData.map((item) =>  <CertificationCard certificate={item} key={ item.title } />
        )}
      </div>
    </>
  )
}


// export const getStaticProps: GetStaticProps = async () => {

//   const client = new MongoClient(process.env.DB_CONN_STRING!)
//   const db = client.db()

//   const certificationData = db.collection(process.env.CERT_COLL!)

//   const results = await certificationData.find().toArray()

//   return {
//       props: {
//           certificationData: results.map(result => ({

//           }))
//       },
//   }
// }

export default Certifications