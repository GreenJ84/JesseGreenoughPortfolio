import React, { useState } from 'react'
import Image from 'next/image'

import { IProject } from '../../Utils/data/ProjectData'
import { AiFillGithub, AiFillProject } from 'react-icons/ai'
import { MdClose } from 'react-icons/md'

const css = require('./ProjectCard.module.css')

interface projectProps{
    project: IProject
}

const ProjectCard = (props: projectProps) => {
    const [showDetail, setShowDetail] = useState(false);
    console.log( props.project )

    return (
        <>
            <div className={ css.display } onClick={() => setShowDetail(true)}>
                <Image
                    src={ props.project.image_path }
                    alt={props.project.name}
                    className={ css.displayImage }
                    layout="responsive"
                    height="150"
                    width="300"
                />
                <p className={ css.displayTitle }>{props.project.name}</p>
            </div>
            {showDetail && (
            <div className={ css.detail }>
                <div className={ css.detailLeft }>
                    <Image
                    src={ props.project.image_path }
                    alt={props.project.name}
                    className={ css.detailImage }
                    layout="responsive"
                    height="150"
                    width="300"
                    />
                    <br />
                    <div>
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
    
                <div className={ css.detailRight }>
                    <h2 >{ props.project.name }</h2>
                    <h3 >{props.project.description }</h3>
        
                    <div className={ css.techs }>
                        { props.project.key_techs.map((tech) => (
                            <span
                                key={tech}
                                className={ css.detailTech}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
    
                <button
                onClick={() => setShowDetail(false)}
                className={ css.detailClose}
                >
                    <MdClose />
                </button>
            </div>
            )}
        </>
    )
}

export default ProjectCard