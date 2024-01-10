/** @format */
/* eslint-disable react/jsx-key */

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

const AiFillGithub = dynamic(() =>
  import("react-icons/ai").then((mod) => mod.AiFillGithub)
);
const AiOutlineTwitter = dynamic(() =>
  import("react-icons/ai").then((mod) => mod.AiOutlineTwitter)
);
const AiFillInstagram = dynamic(() =>
  import("react-icons/ai").then((mod) => mod.AiFillInstagram)
);
const FaLinkedinIn = dynamic(() =>
  import("react-icons/fa").then((mod) => mod.FaLinkedinIn)
);

const ContactModal = dynamic(() =>
  import("./LayoutExtras").then((mod) => mod.ContactModal)
);

import { AppContext, WindowWidth } from "../../utils/AppContext";

const css = require("./Footer.module.css");

const Footer = () => {
  const [emailConnect, setEmailConnect] = React.useState(false);
  const { windowWidth } = useContext(AppContext);

  // Navigation Route handling
  const router = useRouter();
  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <>
      {emailConnect && <ContactModal close={() => setEmailConnect(false)} />}
      <footer
        id="footer"
        className={css.footer}
      >
        <section id="footerTop">
          <div className={css.footerDetails}>
            <h4>Jesse Greenough</h4>
            <p>
              A passionate and detail-oriented Full Stack developer constantly
              exploring new technologies.{" "}
              {windowWidth === WindowWidth.LARGE &&
                "I thrive on problem-solving and enjoy the challenge of tackling complex issues. With a strong focus on delivering clean and efficient code, I strive to create polished solutions that exceed expectations. Let me bring my expertise and enthusiasm for innovative development to your next project."}
            </p>
          </div>
          <nav
            className={css.footerConnect}
            aria-label="Personal Social Links"
          >
            <ul aria-label="Developers social links">
              {[
                [
                  "GitHub",
                  "https://github.com/GreenJ84",
                  <AiFillGithub
                    className={css.footIcons}
                    aria-label="GitHub Icon"
                  />,
                ],
                [
                  "Twitter",
                  "https://twitter.com/GoodGreens84",
                  <AiOutlineTwitter
                    className={css.footIcons}
                    aria-label="Twitter Icon"
                  />,
                ],
                [
                  "LinkedIn",
                  "https://www.linkedin.com/in/jessegreenough/",
                  <FaLinkedinIn
                    className={css.footIcons}
                    aria-label="LinkedIn Icon"
                  />,
                ],
                [
                  "Instagram",
                  "https://www.instagram.com/jesse.greenough/",
                  <AiFillInstagram
                    className={css.footIcons}
                    aria-label="Instagram Icon"
                  />,
                ],
              ].map((item, idx) => {
                const [title, href, icon] = item;
                return (
                  <li
                    key={idx}
                    aria-label={`Visit my ${title} profile`}
                  >
                    <a
                      href={href as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Navigate Off App to ${title}`}
                    >
                      {icon}
                    </a>
                  </li>
                );
              })}
            </ul>
            <button onClick={() => setEmailConnect(true)}>Contact</button>
          </nav>
        </section>
        <hr
          style={{
            marginTop: "max(1.8vw, 20px)",
            border: "1px solid var(--text-primary)",
          }}
        />
        <section
          id="footerBottom"
          className={css.footerCopywright}
        >
          {windowWidth !== WindowWidth.SMALL && (
            <nav
              id="footerNavigation"
              aria-label="In App navigation"
            >
              <ul
                className={css.footerLinkList}
                aria-labelledby="footerNavigation"
              >
                {[
                  ["/", "Home"],
                  ["/about", "About"],
                  ["/projects", "Projects"],
                  ["/experience", "Experience"],
                  ["/resume", "Resumes"],
                ].map((item, idx) => {
                  const [href, title] = item;
                  return (
                    <li key={idx}>
                      <a
                        href={href as string}
                        rel="noopener noreferrer"
                        aria-label={`Navigate In App to the ${title} page`}
                        onClick={(e) => handleLink(e, href as string)}
                      >
                        {title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}
          <h5>© Copyright 2022. Designed and Developed by Jesse Greenough</h5>
        </section>
      </footer>
    </>
  );
};

export default Footer;
