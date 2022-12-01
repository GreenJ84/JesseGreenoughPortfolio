import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import ProjectNavbar from '../../components/ProjectsPage/ProjectNavbar';
import data from '../../Utils/data/ProjectData'

export type Category = "react" | "python" | "java";
export interface IProject {
    name: string;
    description: string;
    image_path: string;
    deployed_url: string | null;
    github_url: string;
    category: Category[];
    key_techs: string[];
}

const ProjectPage = () => {
    const [projectData, setProjectData] = useState( data )

    return (
        <Container fluid>
            <>
            <ProjectNavbar />
            {data.map((project: IProject) => {
                <
            })}
            </>
        </Container>
    );
}

export default ProjectPage;