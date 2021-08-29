import React, { useEffect, useState, ReactComponentElement, cloneElement } from "react";
import { makeStyles, useTheme } from "@material-ui/core";

interface AngledImageProps {
    src: string;
    height: string;
    width: string;
}

export function PostCardImage(props: AngledImageProps) {
    const classes = useStyles();
    const theme = useTheme();
    const [isImgEnabled, setIsImgEnabled] = useState(!!props.src);
    return (
        <div style={{
            overflow: "hidden",
            position: "relative",
            height: props.height,
            minHeight: props.height,
            maxHeight: props.height
        }}>
            {
                isImgEnabled ?
                    <img
                        onError={() => setIsImgEnabled(false)}
                        className={classes.img}
                        src={props.src }
                        alt={props.src}
                        style={{
                            width: props.width,
                            height: props.height,
                            minHeight: props.height,
                            maxHeight: props.height
                        }}
                    /> :
                    <div style={{
                        width: props.width,
                        height: props.height,
                        minHeight: props.height,
                        maxHeight: props.height,
                        background: theme.palette.primary.dark
                    }}></div>
            }
            <div
                className={classes.skewBar}
            ></div>
        </div>
    );
}

const useStyles = makeStyles({
    img: {
        width: "100%",
        objectFit: "cover"
    },
    skewBar: {
        width: "100%",
        height: "25%",
        background: "white",
        position: "absolute",
        bottom: "10%",
        transform: "translateY(100%) skewY(0deg)"
    }
});