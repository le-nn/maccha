import { CircularProgress } from "@material-ui/core";
import React from "react";

export default function Loading() {
    return <div style={{
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
        <CircularProgress style={{
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            margin: "auto"
        }} size={100} />
    </div>;
}
