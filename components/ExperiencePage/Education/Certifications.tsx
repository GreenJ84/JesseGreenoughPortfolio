import React, { useState } from 'react'
import { certifications } from '../../../Utils/data/EducationData'
import CertificationCard from './CertificationCard'

const Certifications = () => {
  const [ certData, setCertData ] = useState( certifications )
  return (
    <>
      <h1> Certifications Achieved </h1>
      {certData.map((item) => {
        <CertificationCard certificate={ item } />
      })}
    </>
  )
}

export default Certifications