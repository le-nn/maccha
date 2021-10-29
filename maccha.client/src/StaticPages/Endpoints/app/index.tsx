import React from "react";
import { MacchaManager } from "Apps";
import { GlobalStyle } from "StaticPages/Styles";
import { css } from "@mui/styled-engine";

/**
 * Load spa with client side routing.
 */
export default () => {
    return <div css={
        css({
            width: "100vw",
            height: "100vh",
        })}>
        <GlobalStyle />
        <MacchaManager option={{
            apiServerHost: "http://localhost:8081",
            pathPrefix: "/app",
        }} />
    </div>;
};
