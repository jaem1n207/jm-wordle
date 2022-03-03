import { BaseComponentProps } from '@/types';
import { ISEOProps } from '@/types/seo';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

import { UnstyledLink, SEO } from '@/components';
import { useDarkMode } from '@/hooks/use-dark-mode';

interface IProps extends BaseComponentProps, ISEOProps {}

function Layout({ children, ...rest }: IProps) {
  const data = useStaticQuery(graphql`
    query {
      site {
        id
        siteMetadata {
          title
          titleTemplate
          siteUrl
          description
          author
          githubUrl
        }
      }
    }
  `);

  const { title, githubUrl } = data.site.siteMetadata;

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
        <strong className="inset-x-0 dark:text-light">{title}</strong>
        <button type="button" onClick={themeToggle}>
          Toggle
        </button>
      </header>
      <div className="mx-auto h-content dark:text-light">{children}</div>
    </main>
  );
}

export default Layout;
