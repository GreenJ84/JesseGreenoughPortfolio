import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
// import { MongoClient } from 'mongodb'
// import { GetStaticProps } from 'next';

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

const projectBody = {
    padding: '12rem 1rem 1rem',
}

const flexbox = {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: '#002400',
    padding: '5rem 3vw',
    border: '2px solid '
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

// export const getStaticProps: GetStaticProps = async () => {

//     const client = new MongoClient(process.env.DB_CONN_STRING!)
//     const db = client.db()

//     const projectData = db.collection(process.env.PROJECT_COLL!)

//     const results = await projectData.find().toArray()

//     return {
//         props: {
//             projectData: results.map(result => ({

//             }))
//         },
//     }
// }

export default ProjectPage;
