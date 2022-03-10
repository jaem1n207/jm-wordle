import { graphql, useStaticQuery } from 'gatsby';

type SiteProps = {
  site: {
    id: string;
    siteMetadata: {
      author?: string;
      defaultDescription: string;
      githubUrl?: string;
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
        githubUrl
        siteUrl
        defaultTitle: title
        titleTemplate
      }
    }
  }
`;

/**
 * @description 정적 site metadata를 가져오는 hook
 */
export function useSiteMetadata() {
  const { site }: SiteProps = useStaticQuery(query);

  return site.siteMetadata;
}
