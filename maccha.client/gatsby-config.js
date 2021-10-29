/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

// SPAでクライアントサイドでルーティングする場合はこちらにパスを追加
const clientRoutes = ["/app/*"];

module.exports = {
    // pathPrefix: `/path`, github pagesなどを利用する場合はこちらにルートパスを指定
    siteMetadata: {
        title: "",
    },
    plugins: [
        `gatsby-plugin-resolve-src`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-typescript`,
        `gatsby-plugin-material-ui`,
        `gatsby-plugin-sass`,
        `gatsby-plugin-webpack-bundle-analyser-v2`,
        `gatsby-plugin-image`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        {
            resolve: `gatsby-plugin-emotion`,
            options: {
                // Accepts the following options, all of which are defined by `@emotion/babel-plugin` plugin.
                // The values for each key in this example are the defaults the plugin uses.
                sourceMap: true,
                autoLabel: "dev-only",
                labelFormat: `[local]`,
                cssPropOptimization: true,
            }
        },
        {
            resolve: `gatsby-plugin-create-client-paths`,
            options: { prefixes: [...clientRoutes] },
        },
        {
            resolve: "gatsby-plugin-eslint",
            options: {
                stages: ["develop"],
                extensions: ["js", "jsx", "ts", "tsx"],
                exclude: ["node_modules", ".cache", "public"],
            },
        },
        {
            resolve: `gatsby-plugin-page-creator`,
            options: {
                path: `${__dirname}/src/StaticPages/Endpoints`,
            },
        },
    ],
};
