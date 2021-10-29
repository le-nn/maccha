import React, { ReactNode, ReactNodeArray, useEffect } from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Prism } from "react-syntax-highlighter";
import { graphql, useStaticQuery } from "gatsby";

const CodeRenderer = (p: any) => {
    return <Prism
        customStyle={{
            padding: "28px 16px",
            margin: "0",
            height: "100%"
        }}
        language={p.className.replace("language-", "")}
        style={vscDarkPlus}
    >
        {p.children}
    </Prism>;
};

interface DocsProviderProps {
    children: ReactNode | ReactNodeArray;
}

export const DocsProvider = (props: DocsProviderProps) => {
    return (
        <MDXProvider components={{
            code: CodeRenderer
        }}>
            {props.children}
        </MDXProvider>
    );
};
