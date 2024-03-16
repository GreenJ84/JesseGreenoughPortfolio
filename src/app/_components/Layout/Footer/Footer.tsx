/** @format */
/* eslint-disable react/jsx-key */

import React from 'react';

import SocialNavLinks from '../Shared/SocialLinks';
import Navigation from '../Shared/Navigation';
import { ContactButton } from '../Shared/ContactModal';

const css = require('./Footer.module.css');

const Footer = () => {
  return (
    <>
      <footer
        id='footer'
        className={css.footer}
      >
        <section id='footerTop' className={css.footerTop}>
          <div className={css.footerDetails}>
            <h4 className={css.developerName}>Jesse Greenough</h4>
            <p className={css.developerSummary}>
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
          <ContactButton />
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
