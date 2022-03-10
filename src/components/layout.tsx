/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Switch from 'react-switch';
import { RiMoonClearFill, RiSunLine } from 'react-icons/ri';

import { IBaseComponentProps } from '@/types';
import { ISEOProps } from '@/types/seo';
import { UnstyledLink, SEO } from '@/components';
import { useSiteMetadata, useDarkMode } from '@/hooks';

interface IProps extends IBaseComponentProps, ISEOProps {}

function Layout({ children, ...rest }: IProps) {
  const { defaultTitle, githubUrl } = useSiteMetadata();

  const { isDarkMode, toggle: themeToggle } = useDarkMode();

  return (
    <main className="absolute inset-0 flex flex-col items-center min-w-full prose-sm prose transition bg-light duration-250 dark:bg-dark md:prose-xl dark:prose-invert">
      <div className="flex flex-col items-center justify-between flex-1 w-full max-w-lg overflow-hidden">
        <SEO {...rest} />

        <header className="flex items-center justify-between w-full h-12 no-underline border-b border-solid border-secondary dark:text-light">
          <UnstyledLink
            className="no-underline text-primary dark:text-light"
            external
            url={githubUrl}
          >
            GitHub ↗
          </UnstyledLink>
          <strong className="text-xl text-center uppercase sm:text-2xl">
            {defaultTitle}
          </strong>
          <label className="flex items-end px-1">
            <Switch
              onColor="#718096"
              offColor="#a0aec0"
              checkedIcon={<ToggleIcon status="checked" />}
              uncheckedIcon={<ToggleIcon status="unchecked" />}
              checked={isDarkMode}
              onChange={themeToggle}
            />
          </label>
        </header>
        {children}
      </div>
    </main>
  );
}

export default Layout;

interface IToggleIcon {
  status: 'checked' | 'unchecked';
}

function ToggleIcon({ status }: IToggleIcon) {
  return (
    <div className="flex items-center justify-center h-full text-base">
      {status === `checked` ? <RiMoonClearFill /> : <RiSunLine />}
    </div>
  );
}
