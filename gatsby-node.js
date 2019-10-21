const Promise = require('bluebird')
const path = require('path')
const contentful = require("contentful");
exports.createPages = ({ graphql, boundActionCreators }) => {


  const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: 'i0hva9ymdcfj',
  /* This is the access token for this space. Normally you get both ID
and the token in the Contentful web app */
  accessToken: '0b0b3f364250d3324474730010ee9346a22ac1947865610a3888c2c5424f2ce5'
})
/* This API call will request an entry with the specified ID from
the space defined at the top, using a space-specific access token. */
client.getEntry('1batE3MF6Gy0uIOgWgQm00')
  .then((entry) => {
    console.log("MOSMAFOPSAFOASNONAOSINFAISNOFNOIFNO")
    console.log(entry)
  })



  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    resolve(
      graphql(
        `
          {
            allContentfulBlogPost {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
          `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulBlogPost.edges
        posts.forEach((post, index) => {
          createPage({
            path: `/blog/${post.node.slug}/`,
            component: blogPost,
            context: {
              slug: post.node.slug
            },
          })
        })
      })
    )
  })
}
