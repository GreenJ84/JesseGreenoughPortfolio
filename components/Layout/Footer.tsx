/** @format */
/* eslint-disable react/jsx-key */

import React, { BaseSyntheticEvent, useContext } from "react";
import { useRouter } from "next/router";

import { Row } from "react-bootstrap";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { AppContext, WindowWidth } from "../../Utils/AppContext";
import ContactModal from "./contactModal";

const css = require("./Footer.module.css");

const Footer = () => {
  const router = useRouter();
  const [emailConnect, setEmailConnect] = React.useState(false);
  const { windowWidth } = useContext(AppContext);

  const date = new Date();
  const year = date.getFullYear();

  const handleLink = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    router.push(e.target.href);
  };

  return (
    <>
      {emailConnect && (<ContactModal close={() => setEmailConnect(false)} />)}
      <footer
        id="footer"
        className={css.footer}
      >
        <section>
          <div className={css.footerDetails}>
            <h3>Jesse Greenough</h3>
            <p>
              A passionate and detail-oriented Full Stack developer constantly
              exploring new technologies.{" "}
              {windowWidth === WindowWidth.LARGE &&
                "I thrive on problem-solving and enjoythe challenge of tackling complex issues. With a strong focus on delivering clean and efficient code, I strive to create polished solutions that exceed expectations. Let me bring my expertise and enthusiasm for innovative development to your next project."}
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
                return (
                  <li
                    key={idx}
                    role="presentation"
                  >
                    <a
                      href={item[0] as string}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item[1]}
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
        <Row
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
                  return (
                    <li
                      key={idx}
                      role="presentation"
                    >
                      <a
                        href={item[0] as string}
                        rel="noopener noreferrer"
                        onClick={handleLink}
                      >
                        {item[1]}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}
          <h4>© Copyright {year}. Designed and Developed by Jesse Greenough</h4>
        </Row>
      </footer>
    </>
  );
};

export default Footer;
