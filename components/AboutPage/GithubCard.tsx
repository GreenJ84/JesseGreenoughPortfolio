import React from 'react'
import { Row } from 'react-bootstrap'
import GitHubCalendar from 'react-github-calendar'

const githubCard = () => {
    return (
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            <h1 className="project-heading" style={{ paddingBottom: "20px" }}>
                Days I <strong className="purple">Code</strong>
            </h1>
            <GitHubCalendar
                username="GreenJ84"
                blockSize={15}
                blockMargin={5}
                color="#0be216"
                fontSize={16}
            />
        </Row>
    )
}

export default githubCard