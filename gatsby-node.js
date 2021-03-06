/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/course/)) {
    page.matchPath = "/course/*"
    // Update the page.
    createPage(page)
  } else if (page.path.match(/^\/participant/)) {
    page.matchPath = "/participant/*"
    // Update the page.
    createPage(page)
  } else if (page.path.match(/^\/template/)) {
    page.matchPath = "/template/*"
    // Update the page.
    createPage(page)
  }
}
