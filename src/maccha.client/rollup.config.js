import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import babel from "@rollup/plugin-babel";
import sass from "rollup-plugin-sass";
import babelrc from "babelrc-rollup";
import image from "@rollup/plugin-image";
import alias from "@rollup/plugin-alias";
import json from "@rollup/plugin-json";

export default [{
    input: "./src/index.ts",
    output: {
        format: "esm",
        dir: "./dist/", // 出力先ディレクトリトップ
        entryFileNames: "index.lib.js",
        name: "Maccha"
    },
    globals: {
        "react": "React",
        "react-dom": "ReactDOM",
    },
    external: ["react", "react-dom"],
    plugins: [
        image(),
        nodeResolve({
            browser: true,
            resolveOnly: [
                /^(?!react$)/,
                /^(?!react-dom$)/,
            ],
        }),
        json(),
        commonjs(),
        typescript({
            tsconfigOverride: {
                "compilerOptions": {
                    "experimentalDecorators": true,
                    "outDir": "./dist/",
                    "sourceMap": true,
                    "noImplicitAny": true,
                    "module": "ESNext",
                    "target": "esnext",
                    "jsx": "react",
                    "moduleResolution": "node",
                    "noResolve": false,
                    "esModuleInterop": true,
                    "strict": true,
                    "strictNullChecks": true,
                    "baseUrl": "./src",
                    "lib": [
                        "dom",
                        "es2015",
                        "es2017"
                    ],
                    "paths": {
                        "*": [
                            "types/*",
                            "*"
                        ]
                    },
                    "jsxImportSource": "@emotion/react"
                },
                "include": [
                    "./src/**/*"
                ]
            }
        }),
        babel(
            babelrc({
                addExternalHelpersPlugin: false,
                exclude: /node_modules/,
                runtimeHelpers: false,
            })
        ),
        sass({
            insert: true,
        }),
        alias({
            entries: [
                { find: 'App', replacement: __dirname + "/src/App" },
                { find: 'Libs', replacement: __dirname + "/src/Libs" }
            ]
        })
    ]
}];