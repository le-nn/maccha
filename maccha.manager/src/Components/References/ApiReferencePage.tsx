import React from "react";
import { makeStyles } from "@material-ui/core";
import { axios } from "../../Repositories/config";

export default function ApiReferencePage() {
    const classes = useStyles();

    return (
        <iframe className={classes.iframe} src={axios.defaults.baseURL + "api"}></iframe>
    );
}

const useStyles = makeStyles({
    iframe: {
        width: "100%",
        height: "100%",
        border: "none"
    }
});