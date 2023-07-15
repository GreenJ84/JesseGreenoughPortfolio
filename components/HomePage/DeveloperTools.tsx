/** @format */

import React from "react";
import Image from "next/image";

import {
  SiVisualstudiocode,
  SiPostman,
  SiVercel,
  SiGitkraken,
  SiApollographql,
  SiFigma,
  SiNotion,
  SiSocketdotio,
  SiJinja,
  SiPm2,
  SiKubernetes,
  SiApachetomcat,
  SiNodemon,
  SiYarn,
  SiGitpod,
  SiSpring,
  SiJsonwebtokens,
  SiFirebase,
} from "react-icons/si";
import { VscSmiley } from "react-icons/vsc";
import { FaAws, FaHardHat, FaShieldAlt, FaTrello } from "react-icons/fa";
import { GrDocker } from "react-icons/gr";
import {
  DiChrome,
  DiGit,
  DiJava,
  DiNginx,
  DiNodejs,
  DiNpm,
} from "react-icons/di";
import { AiFillGithub } from "react-icons/ai";
import { BsPip } from "react-icons/bs";
import { GiUnicorn } from "react-icons/gi";
import dynamic from "next/dynamic";

const TechnicalSkill = dynamic(() => import("./TechnicalSkill"));
const truffle = require("../../public/assets/pages/home/truffle-logo-dark.svg");
const ganache = require("../../public/assets/pages/home/ganache-logo-dark.svg");
const css = require("./Home.module.css");

const DeveloperTools = () => {
  return (
    <section id="developer-tools">
      <h3 className={css.skillSectionTitle}>
        Development <span className="detail">Tools</span>
      </h3>

      <h4> Governance/Planning </h4>
      <ul className={css.skillsListContainer}>
        <TechnicalSkill
          name="Trello"
          rating={4}
          icon={<FaTrello className={css.icon} />}
        />
        <TechnicalSkill
          name="Figma"
          rating={4}
          icon={<SiFigma className={css.icon} />}
        />
        <TechnicalSkill
          name="Balsamiq"
          rating={3}
          icon={<VscSmiley className={css.icon} />}
        />
        <TechnicalSkill
          name="Notion"
          rating={2}
          icon={<SiNotion className={css.icon} />}
        />
      </ul>

      <h4> Development </h4>
      <ul className={css.skillsListContainer}>
        <TechnicalSkill
          name="VS Code"
          rating={5}
          icon={<SiVisualstudiocode className={css.icon} />}
        />
        <TechnicalSkill
          name="Git"
          rating={4}
          icon={<DiGit className={css.icon} />}
        />
        <TechnicalSkill
          name="ChromeDev Tools"
          rating={4}
          icon={<DiChrome className={css.icon} />}
        />
        <TechnicalSkill
          name="GitKraken"
          rating={4}
          icon={<SiGitkraken className={css.icon} />}
        />
        <TechnicalSkill
          name="Apollo"
          rating={3}
          icon={<SiApollographql className={css.icon} />}
        />
        <TechnicalSkill
          name="HardHat"
          rating={3}
          icon={<FaHardHat className={css.icon} />}
        />
        <TechnicalSkill
          name="Truffle"
          rating={3}
          icon={
            <Image
              alt={"Truffle Logo"}
              src={truffle}
              className={css.manualIcon}
            />
          }
        />
        <TechnicalSkill
          name="Ganache"
          rating={3}
          icon={
            <Image
              alt={"Ganache Logo"}
              src={ganache}
              className={css.manualIcon}
            />
          }
        />
        <TechnicalSkill
          name="Postman"
          rating={3}
          icon={<SiPostman className={css.icon} />}
        />
        <TechnicalSkill
          name="Spring Tools"
          rating={2}
          icon={<SiSpring className={css.icon} />}
        />
        <TechnicalSkill
          name="GitPod"
          rating={1}
          icon={<SiGitpod className={css.icon} />}
        />
      </ul>

      <h4> Runtime </h4>
      <ul className={css.skillsListContainer}>
        <TechnicalSkill
          name="NodeJS"
          rating={5}
          icon={<DiNodejs className={css.icon} />}
        />
        <TechnicalSkill
          name="NPM"
          rating={4}
          icon={<DiNpm className={css.icon} />}
        />
        <TechnicalSkill
          name="Yarn"
          rating={3}
          icon={<SiYarn className={css.icon} />}
        />
        <TechnicalSkill
          name="PIP"
          rating={3}
          icon={<BsPip className={css.icon} />}
        />
        <TechnicalSkill
          name="Nodemon"
          rating={3}
          icon={<SiNodemon className={css.icon} />}
        />
      </ul>

      <h4> DevOps/Serving </h4>
      <ul className={css.skillsListContainer}>
        <TechnicalSkill
          name="Vercel"
          rating={5}
          icon={<SiVercel className={css.icon} />}
        />
        <TechnicalSkill
          name="Github Pages"
          rating={4}
          icon={<AiFillGithub className={css.icon} />}
        />
        <TechnicalSkill
          name="Docker"
          rating={3}
          icon={<GrDocker className={css.icon} />}
        />
        <TechnicalSkill
          name="AWS EC2"
          rating={3}
          icon={<FaAws className={css.icon} />}
        />
        <TechnicalSkill
          name="Gunicorn"
          rating={2}
          icon={<GiUnicorn className={css.icon} />}
        />
        <TechnicalSkill
          name="Nginx"
          rating={2}
          icon={<DiNginx className={css.icon} />}
        />
        <TechnicalSkill
          name="Apache Tomcat"
          rating={2}
          icon={<SiApachetomcat className={css.icon} />}
        />
        <TechnicalSkill
          name="Kubernetes"
          rating={2}
          icon={<SiKubernetes className={css.icon} />}
        />
        <TechnicalSkill
          name="PM2"
          rating={1}
          icon={<SiPm2 className={css.icon} />}
        />
      </ul>

      <h4> Extras </h4>
      <ul className={css.skillsListContainer}>
        <TechnicalSkill
          name="Jinja"
          rating={5}
          icon={<SiJinja className={css.icon} />}
        />
        <TechnicalSkill
          name="JSP"
          rating={5}
          icon={<DiJava className={css.icon} />}
        />
        <TechnicalSkill
          name="Firebase"
          rating={3}
          icon={<SiFirebase className={css.icon} />}
        />
        <TechnicalSkill
          name="NextAuth.js"
          rating={3}
          icon={<FaShieldAlt className={css.icon} />}
        />
        <TechnicalSkill
          name="JSON Web Tokens"
          rating={3}
          icon={<SiJsonwebtokens className={css.icon} />}
        />
        <TechnicalSkill
          name="Socket.io"
          rating={2}
          icon={<SiSocketdotio className={css.icon} />}
        />
      </ul>
    </section>
  );
};

export default DeveloperTools;
