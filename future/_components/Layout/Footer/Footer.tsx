/** @format */
/* eslint-disable react/jsx-key */

import React from 'react';

import { SocialNavLinks } from '../../../_utils/navigationdata';
import Navigation from '../Navigation';
import { ContactButton } from '../ContactModal';
const css = require('./Footer.module.css');

const Footer = () => {
  return (
    <>
      <footer
        id='footer'
        className={css.footer}
      >
        <section id='footerTop'>
          <div className={css.footerDetails}>
            <h4>Jesse Greenough</h4>
            <p>
              A passionate and detail-oriented Full Stack developer constantly
              exploring new technologies.{' '}
              <span className={css.extraFoot}>
                I thrive on problem-solving and enjoy the challenge of tackling
                complex issues. With a strong focus on delivering clean and
                efficient code, I strive to create polished solutions that
                exceed expectations. Let me bring my expertise and enthusiasm
                for innovative development to your next project.
              </span>
            </p>
          </div>
          <nav
            className={css.footerConnect}
            aria-label='Personal Social Links'
          >
            <ul aria-label='Developers social links'>
              {SocialNavLinks.map((link, idx) => {
                const { text, route } = link;
                return (
                  <li
                    key={idx}
                    aria-label={`Visit my ${text} profile`}
                  >
                    <a
                      href={route}
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label={`Navigate Off App to ${text}`}
                    >
                      <link.icon
                        className={css.socialIcon}
                        aria-label={`${text} Icon`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
            <ContactButton />
          </nav>
        </section>
        <hr
          style={{
            marginTop: 'max(1.8vw, 20px)',
            border: '1px solid var(--text-primary)',
          }}
        />
        <section
          id='footerBottom'
          className={css.footerBottom}
        >
          <nav
            id='footerNavigation'
            className={css.footerNav}
            aria-label='In App navigation'
          >
            <Navigation icon={false} />
          </nav>
          <h5>© Copyright 2022. Designed and Developed by Jesse Greenough</h5>
        </section>
      </footer>
    </>
  );
};

export default Footer;
