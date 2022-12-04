import React, { useState } from 'react'
import Image from 'next/image'

import {RiExternalLinkFill} from 'react-icons/ri'

import { certificationType } from '../../../Utils/data/CertificationData'
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
        <div onMouseEnter={ () => enterCard() } className={ css.certCard }>
            {showDetail ?
            <div onMouseLeave={ () => exitCard() } className={ css.certDetailCard }>
                <div className={ css.certDetails }>
                    <p> 
                        { props.certificate.description }
                    </p>
                    <button>
                            View <RiExternalLinkFill />
                    </button>
                    </div>
            </div>: 
            <div className={ css.certDisplay }>
                <Image src={props.certificate.image} alt={props.certificate.title} className={ css.certImage } width={100} height={100}/>
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