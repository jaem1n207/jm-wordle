import { graphql, useStaticQuery } from 'gatsby';

type SiteProps = {
  site: {
    id: string;
    siteMetadata: {
      author?: string;
      defaultDescription: string;
      siteUrl?: string;
      defaultTitle: string;
      titleTemplate: string;
    };
  };
};

const query = graphql`
  query {
    site {
      id
      siteMetadata {
        author
        defaultDescription: description
        siteUrl
        defaultTitle: title
        titleTemplate
      }
    }
  }
`;

export const useSiteMetadata = () => {
  const { site }: SiteProps = useStaticQuery(query);

  return site.siteMetadata;
};
