import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import ProjectCard from '../../components/ProjectsPage/ProjectCard';
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

    const [projectData, setProjectData] = useState(data);
    const [activeNav, setActiveNav] = useState('all');
    const filterHandler = (category: Category | "all") => {
        if (category === "all") {
            setProjectData(data);
            setActiveNav(category);
            return;
        }
        
        else {
            const newArray = data.filter((project) =>
            project.category.includes(category)
            );
            setProjectData(newArray);
            setActiveNav(category);}
    };

    return (
        <Container fluid style={projectBody}>
            <>
                <ProjectNavbar filterHandler={filterHandler} active={activeNav} />
                <div style={ flexbox }>
                    { projectData.map((project) =>
                        <ProjectCard project={project} key={project.name} />
                    )}
                </div>
            </>
        </Container>
    );
}

export default ProjectPage;

const projectBody = {
    padding: '12rem 1rem 1rem',
}

const flexbox = {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: '#002400',
    padding: '5rem 0',
    border: '2px solid '
}