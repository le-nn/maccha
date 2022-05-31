import React from "react";
import { css, Global } from "@emotion/react";
import { CssBaseline } from "@mui/material";

export const GlobalStyle = () => {
    return (
        <>
            {/* Reset css */}
            <CssBaseline />
            {/* Global css */}
            <Global styles={global} />
        </>
    );
};

const global = css`
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;500;700&display=swap');

::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(177, 177, 177, 0.241);
}

::-webkit-scrollbar-thumb {
    background-color: rgba(181, 181, 181, 0.433);
    border-radius: 10px;
}

::selection {
    background-color: rgba(17, 182, 208, 0.481);
}
body{
    font-family: 'Noto Sans JP', sans-serif;
}
`;