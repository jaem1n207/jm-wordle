import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';

import { useSiteMetadata } from '@/hooks/use-site-metadata';
import { ISEOProps } from '@/types/seo';

function SEO({ title, description, article, lang }: ISEOProps) {
  const { pathname } = useLocation();
  const { defaultTitle, titleTemplate, defaultDescription, siteUrl } =
    useSiteMetadata();

  if (siteUrl === ``) {
    // eslint-disable-next-line no-console
    console.error(`사이트 메타데이터에 baseUrl을 설정하세요!`);
    return null;
  }

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname}`,
    lang,
  };

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={seo.title}
      titleTemplate={titleTemplate}
    >
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1"
      />
      <meta name="description" content={seo.description} />
      {seo.url && <meta property="og:url" content={seo.url} />}
      {(article ? true : null) && <meta property="og:type" content="article" />}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
    </Helmet>
  );
}

export default SEO;

SEO.defaultProps = {
  lang: `ko`,
};
