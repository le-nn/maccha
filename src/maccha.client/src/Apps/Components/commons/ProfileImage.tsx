import React, { useState } from "react";
import {
    IconButton
} from "@mui/material";

interface ProfileImageProp {
    src: string;
    name: string;
    width: string;
    height: string;
    textColor?: string;
    alt?: string;
    backgroundColor?: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void | Promise<void>;
}

export default function ProfileImage(props: ProfileImageProp) {
    const [imgEnabled, setImgEnebled] = useState(true);

    if (imgEnabled) {
        return (
            <IconButton
                style={{
                    padding: "0px",
                    width: props.width,
                    height: props.height
                }}
                onClick={e => props.onClick && props.onClick(e)}>
                <img
                    onError={() => setImgEnebled(false)}
                    alt={props.alt}
                    src={props.src}
                    style={{
                        borderRadius: "50%",
                        width: props.width,
                        height: props.height
                    }}
                />
            </IconButton>
        );
    }
    else {
        return (
            <IconButton
                style={{
                    padding: "0px",
                    width: props.width,
                    height: props.height
                }}
                onClick={e => props.onClick && props.onClick(e)}>
                <div style={{
                    borderRadius: "50%",
                    background: props.backgroundColor,
                    color: props.textColor,
                    width: props.width,
                    height: props.height,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <div style={{ fontSize: "36px" }}>{props.name[0]}</div>
                </div >
            </IconButton>
        );
    }
}