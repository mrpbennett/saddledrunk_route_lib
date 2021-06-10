const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

// DYNAMICALLY CREATE PAGES FOR EACH POST
module.exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve('src/templates/route.js');
  const postResult = await graphql(`
    query {
      allContentfulRoutes {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

  // Handle errors
  if (postResult.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  // Create the pages for each markdown file
  postResult.data.allContentfulRoutes.edges.forEach(({ node }) => {
    createPage({
      component: postTemplate,
      path: `/route/${node.slug}`,
      context: {
        slug: node.slug,
      },
    });
  });

  // PAGINATION FOR BLOG POSTS
  const postsResult = await graphql(`
    {
      allContentfulRoutes(sort: { fields: routename, order: DESC }, limit: 1000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

  if (postsResult.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  // Create blog-list pages
  const posts = postsResult.data.allContentfulRoutes.edges;
  const postsPerPage = 8;
  const postNumPages = Math.ceil(posts.length / postsPerPage);
  Array.from({ length: postNumPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? '/route' : `/route/${i + 1}`,
      component: path.resolve('./src/templates/route-list.js'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        postNumPages,
        currentPage: i + 1,
      },
    });
  });
};
