import { BaseComponentProps } from '@/types';
import { ISEOProps } from '@/types/seo';
import React from 'react';

import { UnstyledLink, SEO } from '@/components';
import { useSiteMetadata, useDarkMode } from '@/hooks';

interface IProps extends BaseComponentProps, ISEOProps {}

function Layout({ children, ...rest }: IProps) {
  const { defaultTitle, githubUrl } = useSiteMetadata();

  const { toggle: themeToggle } = useDarkMode();

  return (
    <main className="h-screen max-w-full prose-sm prose transition duration-200 dark:bg-stone-900 md:prose-xl dark:prose-invert">
      <SEO {...rest} />

      <header className="flex items-center justify-between px-4 flex-nowrap h-header">
        <UnstyledLink
          className="inset-x-0 dark:text-light"
          external
          url={githubUrl}
        >
          Github
        </UnstyledLink>
        <strong className="inset-x-0 dark:text-light">{defaultTitle}</strong>
        <button type="button" onClick={themeToggle}>
          Toggle
        </button>
      </header>
      <div className="mx-auto h-content dark:text-light">{children}</div>
    </main>
  );
}

export default Layout;
