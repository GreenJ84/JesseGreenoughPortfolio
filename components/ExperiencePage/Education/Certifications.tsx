import React from 'react'

import CertificationCard from './CertificationCard'

import { certificationType } from '../../../Utils/data/CertificationData'
const css = require('./Certifications.module.css')

interface Certification{
  certificationData: certificationType[]
}

const Certifications = (props: Certification ) => {

  return (
    <>
      <h1 className={css.certTitle}> Certifications Achieved </h1>
      <p> I have completed <strong className='detail'>~{props.certificationData.length}</strong> courses and exams to date</p>
      <div className={ css.certCardHolder }>
        { props.certificationData.map((item) =>  <CertificationCard certificate={item} key={ item.id } />
        )}
      </div>
    </>
  )
}

export default Certifications