const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rule = {
    mode: "production",
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
                options: {
                    fix: true,
                    failOnError: true,
                }
            },
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        useBuiltIns: "usage",
                                        corejs: 3
                                    }
                                ]
                            ]
                        }
                    },
                    { loader: "ts-loader" }
                ],
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js", ".css", "scss"]
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
        usedExports: false
    }
};

module.exports = [
    // build with minify
    {
        ...rule,
        ...{
            entry: "./src/index.ts",
            output: {
                filename: "maccha.min.js",
                path: `${__dirname}/dist`,
                library: "Maccha",
                libraryTarget: "umd",
                libraryExport: "Maccha" ,
                umdNamedDefine: true
            },
        }
    },
    // build without minify
    {
        ...rule,
        ...{
            entry: "./src/index.ts",
            output: {
                path: `${__dirname}/dist`,
                filename: "maccha.js",
                library: "Maccha",
                libraryTarget: "umd",
                libraryExport: "default" ,
                umdNamedDefine: true
            },
            optimization: {
                minimize: false,
            }
        }
    },
    // build example page
    {
        ...rule,
        ...{
            entry: "./examples/index.ts",
            output: {
                path: `${__dirname}/dist`,
                filename: "example.js",
            },
            optimization: {
                minimize: false,
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: "./examples/index.html",
                    minify: false
                }),
            ]
        }
    }
];
