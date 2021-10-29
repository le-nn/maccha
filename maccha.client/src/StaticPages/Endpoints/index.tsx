import React from "react";
import { Link } from "gatsby";
import { css } from "@emotion/react";
import { GlobalStyle } from "StaticPages/Styles";

const root = css`
    padding: 28px;
    display: flex;
    flex-direction: column;
`;

const box = css`
    padding: 12px;
`;

const bar = css({
    padding: "28px",
    display: "flex",
    flexDirection: "column"
});

export default () => {
    return <>
        <GlobalStyle />
        <div css={root}>
            <div css={box}>
                <h2>Welcome !!</h2>
                <p></p>
            </div>
            <div css={box}>
                <Link to="/app">SPA - Client side routing. </Link>
            </div>
            <div css={box}>
                <Link to="/page2">Page2 - Static Page. </Link>
            </div>
        </div>
    </>;
};
