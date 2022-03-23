module.exports = {
  siteMetadata: {
    title: `Jm Wordle`,
    titleTemplate: '%s · Jm Wordle',
    author: 'Jaemin Lee',
    description: 'English Wordle Clone',
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
