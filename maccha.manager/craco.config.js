// craco is the package that can override babel config
module.exports = function ({ env: _env }) {
    return {
        babel: {
            plugins: ["babel-plugin-transform-typescript-metadata"],
        },
    };
};