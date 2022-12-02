import React, { useState } from 'react'
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

export default Certifications