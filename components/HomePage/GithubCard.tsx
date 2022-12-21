import React from 'react'
import GitHubCalendar from 'react-github-calendar'

const css = require('./TechnicalSkills.module.css')

const calenderStyle = {
    margin: '1rem auto 4rem',
    color: 'var(--text-ternary)',
    height: '150px',
}

const githubCard = () => {

    return (
        <>
            <h1 className={ css.projectHeading } >
                Days I <strong className="detail">Code</strong>
            </h1>
            <GitHubCalendar
            username="GreenJ84"
            color="#0be116"
            style={calenderStyle}
            blockSize={14}
            blockMargin={6}
            />
        </>
    )
}

export default githubCard