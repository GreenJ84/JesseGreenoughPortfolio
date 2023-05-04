/** @format */

import React from "react";
import Image from "next/image";

import TechnicalSkill from "./TechnicalSkill";

import { SiVisualstudiocode, SiPostman, SiVercel, SiGitkraken, SiApollographql, SiFigma, SiNotion, SiSocketdotio, SiJinja, SiPm2, SiKubernetes, SiApachetomcat,SiNodemon, SiYarn, SiGitpod, SiSpring, SiJsonwebtokens, SiFirebase, } from "react-icons/si";
import { VscSmiley } from "react-icons/vsc";
import { FaAws, FaHardHat, FaShieldAlt, FaTrello } from "react-icons/fa";
import { GrDocker } from "react-icons/gr";
import { DiChrome, DiGit, DiJava, DiNginx, DiNodejs, DiNpm, DiVim } from "react-icons/di";
import { AiFillGithub } from "react-icons/ai";
import { BsPip } from "react-icons/bs";
import { GiUnicorn } from "react-icons/gi";

const truffle = "/assets/truffle-logo-dark.svg";
const ganache = "/assets/ganache-logo-dark.svg";
const css = require("./TechnicalSkills.module.css");

const DeveloperTools = () => {
  return (
    <div id="developer-tools">
      <h1 className={css.projectHeading}>
        Development <strong className="detail">Tools</strong>
      </h1>

      <h5> Governance/Planning </h5>
      <div className={css.body}>
        <TechnicalSkill name="Trello" rating={5} icon={<FaTrello />} />
        <TechnicalSkill name="Balsamiq" rating={4} icon={<VscSmiley />} />
        <TechnicalSkill name="Figma" rating={4} icon={<SiFigma />} />
        <TechnicalSkill name="Notion" rating={2} icon={<SiNotion />} />
      </div>

      <h5> Development </h5>
      <div className={css.body}>
        <TechnicalSkill name="VS Code" rating={5} icon={<SiVisualstudiocode />} />
        <TechnicalSkill name="Git" rating={4} icon={<DiGit/>} />
        <TechnicalSkill name="ChromeDev Tools" rating={4} icon={<DiChrome />} />
        <TechnicalSkill name="GitKraken" rating={4} icon={<SiGitkraken />} />
        <TechnicalSkill name="Apollo" rating={3} icon={<SiApollographql />} />
        <TechnicalSkill name="HardHat" rating={3} icon={<FaHardHat />} />
        <TechnicalSkill name="Truffle" rating={3}
          icon={
            <Image
              alt={"Truffle Logo"}
              src={truffle}
              width={10}
              height={10}
              className={css.icon}
            />
          }
        />
        <TechnicalSkill name="Ganache" rating={3}
          icon={ 
            <Image
              alt={"Ganache Logo"}
              src={ganache}
              width={10}
              height={10}
              className={css.icon}
            />
          }
        />
        <TechnicalSkill name="Postman" rating={3} icon={<SiPostman />} />
        <TechnicalSkill name="VIM" rating={3} icon={<DiVim />} />

        <TechnicalSkill name="Spring Tools Suite" rating={2} icon={<SiSpring />} />
        <TechnicalSkill name="GitPod" rating={1} icon={<SiGitpod />} />
      </div>

      <h5> Runtime </h5>
      <div className={css.body}>
        <TechnicalSkill name="NodeJS" rating={5} icon={<DiNodejs />} />
        <TechnicalSkill name="NPM" rating={4} icon={<DiNpm />} />
        <TechnicalSkill name="Yarn" rating={3} icon={<SiYarn />} />
        <TechnicalSkill name="PIP" rating={3} icon={<BsPip />} />
        <TechnicalSkill name="Nodemon" rating={3} icon={<SiNodemon />} />
      </div>

      <h5> DevOps/Serving </h5>
      <div className={css.body}>
        <TechnicalSkill name="Vercel" rating={5} icon={<SiVercel />} />
        <TechnicalSkill name="Github Pages" rating={4} icon={<AiFillGithub />} />
        <TechnicalSkill name="Docker" rating={3} icon={<GrDocker />} />
        <TechnicalSkill name="AWS EC2" rating={3} icon={<FaAws />} />
        <TechnicalSkill name="Gunicorn" rating={2} icon={<GiUnicorn />} />
        <TechnicalSkill name="Nginx" rating={2} icon={<DiNginx />} />
        <TechnicalSkill name="Apache Tomcat" rating={2} icon={<SiApachetomcat />} />
        <TechnicalSkill name="Kubernetes" rating={2} icon={<SiKubernetes />} />
        <TechnicalSkill name="PM2" rating={1} icon={<SiPm2 />} />
      </div>

      <h5> Extras </h5>
      <div className={css.body}>
        <TechnicalSkill name="Jinja" rating={5} icon={<SiJinja />} />
        <TechnicalSkill name="Java Server Pages" rating={5} icon={<DiJava />} />
        <TechnicalSkill name="Firebase" rating={3} icon={<SiFirebase />} />
        <TechnicalSkill name="NextAuth.js" rating={3} icon={<FaShieldAlt />} />
        <TechnicalSkill name="JSON Web Tokens" rating={3} icon={<SiJsonwebtokens />} />
        <TechnicalSkill name="Socket.io" rating={2} icon={<SiSocketdotio />} />
      </div>
    </div>
  );
};

export default DeveloperTools;
