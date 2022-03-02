import { BaseComponentProps } from '@/types';
import { ISEOProps } from '@/types/seo';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

import { UnstyledLink, SEO } from '@/components';

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

  const { title, description, githubUrl } = data.site.siteMetadata;

  return (
    <main>
      <SEO {...rest} />

      <header className="flex flex-nowrap items-center justify-between px-4 font-bold h-header text-xs text-center">
        <div>
          <UnstyledLink
            className="text-violet-300 lg:text-xl inset-x-0"
            external
            url={githubUrl}
          >
            Github
          </UnstyledLink>
        </div>
        <div className="lg:text-3xl inset-x-0">{title}</div>
        <div className="lg:text-xl inset-x-0">{description}</div>
      </header>
      <div className="mx-auto h-content">{children}</div>
    </main>
  );
}

export default Layout;
