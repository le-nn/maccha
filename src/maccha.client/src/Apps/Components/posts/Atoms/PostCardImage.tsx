import React, { useEffect, useState, ReactComponentElement, cloneElement } from "react";
import { css, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";

interface AngledImageProps {
    src: string;
    height: string;
    width: string;
}

export function PostCardImage(props: AngledImageProps) {
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
                        css={css({
                            width: "100%",
                            objectFit: "cover"
                        })}
                        src={props.src}
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
                css={css({
                    width: "100%",
                    height: "25%",
                    background: "white",
                    position: "absolute",
                    bottom: "10%",
                    transform: "translateY(100%) skewY(0deg)"
                })}
            ></div>
        </div>
    );
}