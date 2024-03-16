'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import InternalLinks from './NavigationLinks';

const css = require('./Layout.module.css');

const Navigation = ({ icon }: { icon: boolean }) => {
  const path = usePathname();

  return (
    <>
      {InternalLinks.map(
        (link, idx) => {
          const { route, text } = link;

          return (
            <li
              key={idx} // Unchanging lost so idx OK
              className={`${css.navItem} ${route === path && css.active}`}
              >
              <Link
                href={route}
                className={css.navLink}
                aria-label={`Navigate to the ${text} page.`}
                replace={true}
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
