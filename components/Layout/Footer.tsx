/** @format */

import React from "react";
import { useRouter } from "next/router";
import { Row, Col } from "react-bootstrap";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

const css = require("./Footer.module.css");

const Footer = () => {
  let date = new Date();
  let year = date.getFullYear();
  const router = useRouter();

  if (router.pathname == "/") {
  }

  return (
    <footer
      id="footer"
      className={css.footer}
    >
      <Row>
        <Col
          md="4"
          className={css.footerCopywright}
        >
          <h3>Designed and Developed by Jesse Greenough </h3>
        </Col>
        <Col
          md="4"
          className={css.footerCopywright}
        >
          <h3>Copyright © {year} JLG</h3>
        </Col>
        {router.pathname != "/" && (
          <nav aria-label="Personal Social Links">
            <ul className={css.footerIconList}>
              <li role="presentation">
                <a
                  href="https://github.com/GreenJ84"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillGithub className={css.footIcons} />
                </a>
              </li>
              <li role="presentation">
                <a
                  href="https://twitter.com/GoodGreens84"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiOutlineTwitter className={css.footIcons} />
                </a>
              </li>
              <li role="presentation">
                <a
                  href="https://www.linkedin.com/in/jessegreenough/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedinIn className={css.footIcons} />
                </a>
              </li>
              <li role="presentation">
                <a
                  href="https://www.instagram.com/jesse.greenough/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillInstagram className={css.footIcons} />
                </a>
              </li>
            </ul>
          </nav>
        )}
      </Row>
    </footer>
  );
};

export default Footer;
