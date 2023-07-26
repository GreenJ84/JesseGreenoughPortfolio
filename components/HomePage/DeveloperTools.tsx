/** @format */

import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

// Icon Dynamic Imports
const TiWeatherWindyCloudy = dynamic(() =>
  import("react-icons/ti").then((m) => m.TiWeatherWindyCloudy)
);
const SiVisualstudiocode = dynamic(() =>
  import("react-icons/si").then((m) => m.SiVisualstudiocode)
);
const SiPostman = dynamic(() =>
  import("react-icons/si").then((m) => m.SiPostman)
);
const SiVercel = dynamic(() =>
  import("react-icons/si").then((m) => m.SiVercel)
);
const SiRedux = dynamic(() => import("react-icons/si").then((m) => m.SiRedux));
const SiGitkraken = dynamic(() =>
  import("react-icons/si").then((m) => m.SiGitkraken)
);
const SiApollographql = dynamic(() =>
  import("react-icons/si").then((m) => m.SiApollographql)
);
const SiFigma = dynamic(() => import("react-icons/si").then((m) => m.SiFigma));
const SiNotion = dynamic(() =>
  import("react-icons/si").then((m) => m.SiNotion)
);
const SiSocketdotio = dynamic(() =>
  import("react-icons/si").then((m) => m.SiSocketdotio)
);
const SiJinja = dynamic(() => import("react-icons/si").then((m) => m.SiJinja));
const SiPm2 = dynamic(() => import("react-icons/si").then((m) => m.SiPm2));
const SiKubernetes = dynamic(() =>
  import("react-icons/si").then((m) => m.SiKubernetes)
);
const SiApachetomcat = dynamic(() =>
  import("react-icons/si").then((m) => m.SiApachetomcat)
);
const SiSpring = dynamic(() =>
  import("react-icons/si").then((m) => m.SiSpring)
);
const SiNodemon = dynamic(() =>
  import("react-icons/si").then((m) => m.SiNodemon)
);
const SiYarn = dynamic(() => import("react-icons/si").then((m) => m.SiYarn));
const SiGitpod = dynamic(() =>
  import("react-icons/si").then((m) => m.SiGitpod)
);
const SiJsonwebtokens = dynamic(() =>
  import("react-icons/si").then((m) => m.SiJsonwebtokens)
);
const SiFirebase = dynamic(() =>
  import("react-icons/si").then((m) => m.SiFirebase)
);
const VscSmiley = dynamic(() =>
  import("react-icons/vsc").then((m) => m.VscSmiley)
);
const FaAws = dynamic(() => import("react-icons/fa").then((m) => m.FaAws));
const FaHardHat = dynamic(() =>
  import("react-icons/fa").then((m) => m.FaHardHat)
);
const FaShieldAlt = dynamic(() =>
  import("react-icons/fa").then((m) => m.FaShieldAlt)
);
const FaTrello = dynamic(() =>
  import("react-icons/fa").then((m) => m.FaTrello)
);
const GrDocker = dynamic(() =>
  import("react-icons/gr").then((m) => m.GrDocker)
);
const AiFillGithub = dynamic(() =>
  import("react-icons/ai").then((m) => m.AiFillGithub)
);
const BsPip = dynamic(() => import("react-icons/bs").then((m) => m.BsPip));
const GiUnicorn = dynamic(() =>
  import("react-icons/gi").then((m) => m.GiUnicorn)
);
const DiChrome = dynamic(() =>
  import("react-icons/di").then((m) => m.DiChrome)
);
const DiGit = dynamic(() => import("react-icons/di").then((m) => m.DiGit));
const DiJava = dynamic(() => import("react-icons/di").then((m) => m.DiJava));
const DiNginx = dynamic(() => import("react-icons/di").then((m) => m.DiNginx));
const DiNodejs = dynamic(() =>
  import("react-icons/di").then((m) => m.DiNodejs)
);
const DiNpm = dynamic(() => import("react-icons/di").then((m) => m.DiNpm));

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
          name="ReduxJS"
          rating={4}
          icon={<SiRedux className={css.icon} />}
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
          name="Ethers.js"
          rating={3}
          icon={<TiWeatherWindyCloudy className={css.icon} />}
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
