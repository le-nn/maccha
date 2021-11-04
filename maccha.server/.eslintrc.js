module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    rules: {
        "no-anonymous-exports-page-templates": "off",
        "limited-exports-page-templates": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "semi": [
            "error",
            "always"
        ],
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "react/display-name": "off",
        "@typescript-eslint/no-empty-function": "off",
        "no-irregular-whitespace": "off",
        "@typescript-eslint/ban-types": "off"
    }
};
