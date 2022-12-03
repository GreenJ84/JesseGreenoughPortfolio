import React from "react"
import Image from 'next/image'
import { workItem } from "../../../Utils/data/WorkData"
import { ImPointRight } from "react-icons/im"

const css = require('./WorkCard.module.css')

interface workCard{
    work: workItem
}

const WorkCard = ( props: workCard ) => {
    return (
        <div className={ css.workCard }>
            <div className={ css.workImageHolder }>
                <Image src={props.work.logo} width={20} height={20} className={css.workImage} alt={ props.work.company } />
            </div>
            <div className={ css.workCardBody }>
                <div>
                    <p>
                        {props.work.position + ' '}
                    </p>
                    <p>
                        {props.work.date}
                    </p>
                </div>
                <div>
                    <p>
                        {props.work.company}
                    </p>
                    <p>
                        {props.work.location}
                    </p>
                </div>
                { props.work.details.map(( item, idx ) => <p key={idx}className={ css.details }> <ImPointRight /> {item} </p>)}
            </div>
        </div>
    )
}

export default WorkCard