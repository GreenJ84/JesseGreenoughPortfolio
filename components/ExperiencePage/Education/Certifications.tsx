import React, { useState } from 'react'
// import { GetStaticProps } from 'next'
// import { MongoClient } from 'mongodb'

import CertificationCard from './CertificationCard'

import { certifications, certificationType } from '../../../Utils/data/CertificationData'
const css = require('./Certifications.module.css')

interface Certification{
  certificationData: certificationType[]
}

const Certifications = (props: Certification ) => {

  return (
    <>
      <h1 className={ css.certTitle }> Certifications Achieved </h1>
      <div className={ css.certCardHolder }>
        { props.certificationData.map((item) =>  <CertificationCard certificate={item} key={ item.title } />
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