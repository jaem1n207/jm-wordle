module.exports = {
  siteMetadata: {
    title: `jm.wordle`,
    author: 'Jaemin Lee',
    description: 'This site is a brain stretching site',
    siteUrl: `https://jmwordlemain.gatsbyjs.io/`,
  },
  // Since `gatsby-plugin-typescript` is automatically included in Gatsby you
  // don't need to define it here (just if you need to change the options)
  plugins: [`gatsby-plugin-sitemap`, `gatsby-plugin-react-helmet`],
};
