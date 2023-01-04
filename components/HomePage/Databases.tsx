import React from 'react'
import { Col } from 'react-bootstrap'
import { DiSqllite } from 'react-icons/di'
import { GrMysql } from 'react-icons/gr'
import { SiAmazondynamodb, SiMongodb, SiPostgresql } from 'react-icons/si'


const css = require('./TechnicalSkills.module.css')


const Databases = () => {
    return (
        <>
            <h1 className={ css.projectHeading }>
                <strong className="detail">Databases </strong>
            </h1>
            <div className={css.body}>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiMongodb />
                    <span> MongoDB </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={1}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <GrMysql />
                    <span> MySQL </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={2}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <SiPostgresql />
                    <span> PostgresQL </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={4}
                    />
                </Col>
                <Col xs={4} md={4} className={ css.techIcons }>
                    <SiAmazondynamodb />
                    <span> DynamoDB </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={5}
                    />
                </Col>
                <Col xs={4} md={2} className={ css.techIcons }>
                    <DiSqllite />
                    <span> SQLite </span>
                    <meter min={0} max={5}
                        high={4} low={2}
                        optimum={0} value={5}
                    />
                </Col>
            </div>
        </>
    )
}

export default Databases