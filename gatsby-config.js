module.exports = {
  siteMetadata: {
    title: `Jm Wordle Clone`,
    titleTemplate: '%s · Jm Wordle Clone',
    author: 'Jaemin Lee',
    description: 'English Wordle clone.',
    siteUrl: `https://jmwordlemain.gatsbyjs.io/`,
  },
  // Since `gatsby-plugin-typescript` is automatically included in Gatsby you
  // don't need to define it here (just if you need to change the options)
  plugins: [`gatsby-plugin-sitemap`, `gatsby-plugin-react-helmet`],
};
