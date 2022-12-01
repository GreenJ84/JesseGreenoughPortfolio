import React, { useState } from 'react'
import Image from 'next/image'

import { IProject } from '../../pages/projects'
import { AiFillGithub, AiFillProject } from 'react-icons/ai'
import { MdClose } from 'react-icons/md'

interface projectProps{
    project: IProject
}

const ProjectCard = (props: projectProps) => {
    const [showDetail, setShowDetail] = useState(false);

    return (
        <>
            <Image
                src={ props.project.image_path }
                alt={ props.project.name}
                onClick={() => setShowDetail(true)}
                layout="responsive"
                height="150"
                width="300"
            />
            <p >{props.project.name}</p>

            {showDetail && (
            <div >
                <div>
                    <Image
                        src={ props.project.image_path }
                        alt={ props.project.name }
                        layout="responsive"
                        height="150"
                        width="300"
                    />
                    <div >
                        <a
                        href={ props.project.github_url }
                        >
                        <AiFillGithub /> <span>Github</span>
                        </a>
                        { props.project.deployed_url && <a
                        href={ props.project.deployed_url }
                        >
                        <AiFillProject /> <span>Project</span>
                        </a>}
                    </div>
                </div>
    
                <div>
                    <h2 >{ props.project.name }</h2>
                    <h3 >{props.project.description }</h3>
        
                    <div >
                        { props.project.key_techs.map((tech) => (
                            <span
                                key={tech}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
    
                <button
                onClick={() => setShowDetail(false)}
                className="absolute p-1 bg-gray-200 rounded-full top-3 right-3 focus:outline-none dark:bg-dark-200"
                >
                <MdClose size={30} />
                </button>
            </div>
            )}
        </>
    )
}

export default ProjectCard