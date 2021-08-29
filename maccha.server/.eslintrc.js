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
    "rules": {
        "indent": [
            "error",
            4,
            {
                "SwitchCase": 1
            }
        ],
        "@typescript-eslint/adjacent-overload-signatures": "error",
        "@typescript-eslint/array-type": "error",
        "@typescript-eslint/consistent-type-definitions": [
            "error",
            "interface"
        ],
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/no-inferrable-types": "error",
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-this-alias": "error",
        "no-unused-expressions": "off",
        "@typescript-eslint/no-unused-expressions": [
            "error",
            {
                "allowTernary": true
            }
        ],
        "@typescript-eslint/prefer-for-of": "error",
        "@typescript-eslint/prefer-function-type": "error",
        "@typescript-eslint/prefer-namespace-keyword": "error",
        "quotes": "off",
        "@typescript-eslint/quotes": [
            "error",
            "double",
            {
                "avoidEscape": true,
                "allowTemplateLiterals": true
            }
        ],
        "semi": "off",
        "no-extraneous-dependencies": "off",
        "@typescript-eslint/semi": "error",
        "space-before-function-paren": "off",
        "@typescript-eslint/space-before-function-paren": [
            "error",
            {
                "asyncArrow": "always",
                "anonymous": "always",
                "named": "never"
            }
        ],
        "@typescript-eslint/triple-slash-reference": "error",
        "@typescript-eslint/type-annotation-spacing": "error",
        "@typescript-eslint/unified-signatures": "error",
        "no-unused-vars": "off",
        // eslint
        "brace-style": [
            "error",
            "stroustrup",
            {
                "allowSingleLine": true
            }
        ],
        "constructor-super": "error",
        "curly": [
            "error",
            "multi-line"
        ],
        "dot-notation": "error",
        "eqeqeq": "error",
        "linebreak-style": [
            "error",
            "windows"
        ],
        "non-null": "off",
        "new-parens": "error",
        "no-caller": "error",
        "no-duplicate-case": "error",
        "no-duplicate-imports": "error",
        "no-empty": "error",
        "no-eval": "error",
        "no-extra-bind": "error",
        "no-fallthrough": "error",
        "no-new-func": "error",
        "no-new-wrappers": "error",
        "no-return-await": "off",
        "no-sparse-arrays": "error",
        "no-template-curly-in-string": "error",
        "no-throw-literal": "error",
        "no-trailing-spaces": "error",
        "no-undef-init": "error",
        "no-unsafe-finally": "error",
        "no-unused-labels": "error",
        "no-var": "off",
        "object-shorthand": "error",
        "prefer-const": "error",
        "prefer-object-spread": "error",
        "no-useless-constructor": "off",
        "quote-props": [
            "error",
            "consistent-as-needed"
        ],
        "space-in-parens": "error",
        "unicode-bom": [
            "error",
            "never"
        ],
        "use-isnan": "error"
    }
};
