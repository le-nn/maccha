import React from "react";
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

export default () => {
    return <>
        <GlobalStyle />
        <div css={root}>
            <div css={box}>
                <h2>This is generated static page.</h2>
            </div>
        </div>
    </>;
};
