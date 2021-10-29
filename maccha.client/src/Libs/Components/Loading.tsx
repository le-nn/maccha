import { CircularProgress } from "@mui/material";
import { css } from "@mui/styled-engine";
import { Box } from "@mui/system";
import React from "react";

export const Loading = () => {
    return <Box sx={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        zIndex: 9999999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0,0,0,0.64)"
    }}>
        <CircularProgress sx={{
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            margin: "auto"
        }} size={100} />
    </Box>;
};
