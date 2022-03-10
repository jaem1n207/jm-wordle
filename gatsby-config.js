module.exports = {
  siteMetadata: {
    title: `Jm Wordle Clone`,
    titleTemplate: '%s · Jm Wordle Clone',
    author: 'Jaemin Lee',
    description: 'English Wordle clone.',
    siteUrl: `https://jmwordlemain.gatsbyjs.io/`,
    githubUrl: `https://github.com/jaem1n207/jm-wordle`,
  },
  // Since `gatsby-plugin-typescript` is automatically included in Gatsby you
  // don't need to define it here (just if you need to change the options)
  plugins: [
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-postcss`,
  ],
};
