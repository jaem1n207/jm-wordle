import { IBaseComponentProps } from '@/types';
import { ISEOProps } from '@/types/seo';
import React from 'react';

import { UnstyledLink, SEO } from '@/components';
import { useSiteMetadata, useDarkMode } from '@/hooks';

interface IProps extends IBaseComponentProps, ISEOProps {}

function Layout({ children, ...rest }: IProps) {
  const { defaultTitle, githubUrl } = useSiteMetadata();

  const { toggle: themeToggle } = useDarkMode();

  return (
    <main className="absolute inset-0 flex flex-col items-center min-w-full prose-sm prose transition bg-light duration-250 dark:bg-dark md:prose-xl dark:prose-invert">
      <div className="flex flex-col items-center justify-between flex-1 w-full max-w-lg">
        <SEO {...rest} />

        <header className="flex items-center justify-between w-full h-12 no-underline border-b border-solid border-secondary dark:text-light">
          <UnstyledLink className="no-underline " external url={githubUrl}>
            Github 🏡
          </UnstyledLink>
          <strong className="text-4xl">{defaultTitle}</strong>
          <button type="button" onClick={themeToggle}>
            Toggle
          </button>
        </header>
        <div className="h-content">{children}</div>
        {/* 키보드 영역 */}
        <div className="flex flex-col items-center justify-center w-full h-48 bg-textMuted mb-14">
          키보드 자판 들어갈 곳
        </div>
      </div>
    </main>
  );
}

export default Layout;
