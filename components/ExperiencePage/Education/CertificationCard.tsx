import React, { useState } from 'react'
import Image from 'next/image'

import { certificationType } from '../../../Utils/data/EducationData'

const css = require('./CertificationCard.module.css')

interface certificateCardProps{
    certificate: certificationType
}

const CertificationCard = (props: certificateCardProps) => {
    const [showDetail, setShowDetail] = useState(false)
    
    const enterCard = () => {
        setShowDetail(true)
    }
    const exitCard = () => {
        setShowDetail(false)
    }

    return (
        <div onMouseEnter={ () => enterCard } onMouseLeave={ () => exitCard } className={ css.certCard }>
            {showDetail ?
            <div className={ css.certDetails }>
                <p> 
                    { props.certificate.description }
                </p>
            </div>: 
            <div className={ css.display }>
                <Image src={props.certificate.image} alt={props.certificate.title} className={ css.certImage } />
                <h3>
                    { props.certificate.title }
                </h3>
                <p>
                    { props.certificate.issuer }
                </p>
            </div>
            }
        </div>
    )
}

export default CertificationCard