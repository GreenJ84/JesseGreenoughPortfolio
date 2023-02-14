import React from 'react'
import { Col } from 'react-bootstrap'
import { IconBaseProps } from 'react-icons'

const css = require("./TechnicalSkills.module.css");


interface skillProps{
    name: string
    rating: number
    icon: IconBaseProps
}

const TechnicalSkill = (props: skillProps ) => {
    return (
        <Col
            xs={4}
            md={2}
            className={css.techIcons}
        >
        <>
            { props.icon }
            <span> {props.name} </span>
            <meter
                min={0}
                max={5}
                high={4}
                low={2}
                optimum={5}
                value={props.rating}
            />
        </>
        </Col>)
}

export default TechnicalSkill