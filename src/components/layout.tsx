import { ISEOProps } from '@/types/seo';
import React from 'react';

import SEO from './seo';

function Layout({ children, ...rest }: React.PropsWithChildren<ISEOProps>) {
  return (
    <main>
      <SEO {...rest} />
      {children}
    </main>
  );
}

export default Layout;
