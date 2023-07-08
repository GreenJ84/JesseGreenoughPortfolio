/** @format */
/* eslint-disable react/jsx-key */

import React, { useContext } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

import { AppContext, WindowWidth } from "../../Utils/AppContext";

const ContactModal = dynamic(() => import("./ContactModal"));
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
            <h3>Jesse Greenough</h3>
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
            <ul>
              {[
                [
                  "https://github.com/GreenJ84",
                  <AiFillGithub className={css.footIcons} />,
                ],
                [
                  "https://twitter.com/GoodGreens84",
                  <AiOutlineTwitter className={css.footIcons} />,
                ],
                [
                  "https://www.linkedin.com/in/jessegreenough/",
                  <FaLinkedinIn className={css.footIcons} />,
                ],
                [
                  "https://www.instagram.com/jesse.greenough/",
                  <AiFillInstagram className={css.footIcons} />,
                ],
              ].map((item, idx) => {
                const [href, icon] = item;
                return (
                  <li
                    key={idx}
                    role="presentation"
                  >
                    <a
                      href={href as string}
                      target="_blank"
                      rel="noopener noreferrer"
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
            <nav aria-label="Personal Social Links">
              <ul className={css.footerLinkList}>
                {[
                  ["/", "Home"],
                  ["/about", "About Me"],
                  ["/projects", "My Projects"],
                  ["/experience", "My Experience"],
                  ["/resume", "My Resumes"],
                ].map((item, idx) => {
                  const [href, title] = item;
                  return (
                    <li
                      key={idx}
                      role="presentation"
                    >
                      <a
                        href={href as string}
                        rel="noopener noreferrer"
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
          <h4>© Copyright 2022. Designed and Developed by Jesse Greenough</h4>
        </section>
      </footer>
    </>
  );
};

export default Footer;
