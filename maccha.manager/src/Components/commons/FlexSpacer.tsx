import React from "react";
import { makeStyles } from "@material-ui/core";

export function FlexSpacer() {
    const styles = useStyles();
    return (
        <div className={styles.flexFill}></div>
    );
}

const useStyles = makeStyles({
    flexFill: {
        flex: "1 1 auto"
    }
});