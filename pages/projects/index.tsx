import React, { useState } from 'react'
import { MongoClient } from 'mongodb'
import { GetStaticProps } from 'next';
import { Container } from 'react-bootstrap'

import ProjectCard from '../../components/ProjectsPage/ProjectCard';
import ProjectNavbar from '../../components/ProjectsPage/ProjectNavbar';

// import data from '../../Utils/data/ProjectData'
import { Category, IProject } from '../../Utils/data/ProjectData';

interface Projects{
    projectData: IProject[]
}

const projectBody = {
    padding: '12rem 1rem 1rem',
}

const flexbox = {
    display: 'flex',
    FlexWrap: 'wrap',
    backgroundColor: '#002400',
    padding: '5rem 3vw',
    border: '2px solid '
}

const ProjectPage = (props: Projects) => {
    const [projectData, setProjectData] = useState(props.projectData);
    const [activeNav, setActiveNav] = useState('all');

    console.log(projectData)

    const filterHandler = (category: Category | "all") => {
        if (category === "all") {
            setProjectData(props.projectData);
            setActiveNav(category);
            return;
        }
        else {
            const newArray = props.projectData.filter((project) =>
            project.category.includes(category)
            );
            setProjectData(newArray);
            setActiveNav(category);
        }
    };

    return (
        <Container fluid style={projectBody}>
            <div style={{ padding: '0 3vw'}}>
                <ProjectNavbar filterHandler={filterHandler} active={activeNav} />
                <div style={ flexbox }>
                    { projectData.map((project) =>
                        <ProjectCard project={project} key={project.name} />
                    )}
                </div>
            </div>
        </Container>
    );
}

export const getStaticProps: GetStaticProps = async () => {

    const client = new MongoClient(process.env.DB_CONN_STRING!)
    const db = client.db(process.env.DB_NAME)

    const projectData = db.collection(process.env.PROJ_COLL!)

    const results = await projectData.find().toArray()

    return {
        props: {
            projectData: results.map(result => ({
                name: result.name,
                description: result.description,
                image_path: result.image_path,
                deployed_url: result.deployed_url,
                github_url: result.github_url,
                category: result.category,
                key_techs: result.key_techs,
                id: result._id.toString()
            }))
        },
    }
}

export default ProjectPage;
