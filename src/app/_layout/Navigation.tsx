/**
 * eslint-
 *
 * @format
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { InternalNavLinks } from '../_shared/navigationdata';
const css = require('./Layout.module.css');

const Navigation = ({ icon }: { icon: boolean }) => {
  const path = usePathname();

  return (
    <ul>
      {InternalNavLinks.filter((link) => link.route !== path).map(
        (link, idx) => {
          const { route, text } = link;

          return (
            <li
              key={idx}
              className={css.navItem}
            >
              <Link
                href={route}
                aria-label={`Navigate to the ${text} page.`}
                className={css.navLink}
                rel='noopener noreferrer'
              >
                {icon && <link.icon className={css.navIcon} />}
                {text}
              </Link>
            </li>
          );
        }
      )}
    </ul>
  );
};

export default Navigation;
