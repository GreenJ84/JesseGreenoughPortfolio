import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';


const AiFillGithub = dynamic(() =>
  import("react-icons/ai").then((m) => m.AiFillGithub)
);
const AiFillProject = dynamic(() =>
  import("react-icons/ai").then((m) => m.AiFillProject)
);
const MdClose = dynamic(() => import("react-icons/md").then((m) => m.MdClose));

import { ProjectType } from '@/app/_lib/_types';

import css from './Project.module.css';

interface DetailProps {
  project: ProjectType;
  setShowDetail?: (show: boolean) => void;
}
const ProjectDetailCard = ({project, setShowDetail}: DetailProps) => {
  const detailModal = setShowDetail !== undefined;
  const getClass = (dClass: string, pClass: string, base?: string): string => {
    if (base) {
      return `${base} ${detailModal ? dClass : pClass}`;
    }
    return detailModal ? dClass : pClass;
  }

  return (
        <dialog
          className={getClass(css.projectDetail, css.projectPreview, css.projectModal)}
          key={project.id!}
        >
          <div
            className={getClass(css.detailLeft, css.previewLeft, css.modalLeft)}
          >
            <Image
              src={project.image_path}
              alt={project.name}
              className={getClass(css.detailImage, css.previewImage, css.modalImage)}
              height="150"
              width="300"
            />
            <div>
              <a href={project.github_url}>
                <AiFillGithub className={css.detailIcons} />
                <span>Github</span>
              </a>
              {project.deployed_url && (
                <a href={project.deployed_url}>
                  <AiFillProject className={css.detailIcons} />
                  <span>Project</span>
                </a>
              )}
            </div>
          </div>

          <div
            className={getClass(css.detailRight, css.previewRight, css.modalRight)}
          >
            <h2>{project.name}</h2>
            <p>{project.description}</p>
          </div>
          <div
            className={getClass(css.detailTechs, css.previewTechs, css.modalTechs)}
          >
            <h3>Key Techs:</h3>
            <ul className={css.techs}>
              {project.key_techs.map((tech) => (
                <li
                key={tech}
                className={css.detailTech}
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {setShowDetail && <button
            id="modalClose"
            onClick={() => setShowDetail(false)}
            className={css.detailClose}
          >
            <MdClose />
          </button>}
        </dialog>
  )
}

export default ProjectDetailCard;