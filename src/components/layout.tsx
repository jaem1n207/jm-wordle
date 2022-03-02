import { BaseComponentProps } from '@/types';
import { ISEOProps } from '@/types/seo';
import React from 'react';

import SEO from './seo';

interface IProps extends BaseComponentProps, ISEOProps {}

function Layout({ children, ...rest }: IProps) {
  return (
    <main>
      <SEO {...rest} />

      <nav>
        <ul>
          <li className="font-bold">hello</li>
        </ul>
      </nav>
      {children}
    </main>
  );
}

export default Layout;
