/**
 * eslint-
 *
 * @format
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { InternalLinks } from '../_shared/_icons/navigation';
const css = require('./Layout.module.css');

interface NavigationProps {
  icon: boolean;
  callback?: Function;
}


const Navigation = ({ icon, callback }: NavigationProps) => {
  const path = usePathname();

  return (
    <>
      {InternalLinks.map(
        (link, idx) => {
          const { route, text } = link;
          return (
            <li
              key={idx}
              className={`${css.navItem} ${path === route ? css.activeItem : ""}`}
              onClick={() => {
                callback && callback();
              }}
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
    </>
  );
};

export default Navigation;
