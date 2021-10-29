import React from "react";
import { PropTypes, Typography, } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";


interface WrappedTextBlockProps {
    row: number;
    children?: React.ReactNode;
    align?: 'inherit'
    | 'left'
    | 'center'
    | 'right'
    | 'justify';
    color?:
    | "initial"
    | "inherit"
    | "primary"
    | "secondary"
    | "textPrimary"
    | "textSecondary"
    | "error";
    display?: "initial" | "block" | "inline";
    gutterBottom?: boolean;
    noWrap?: boolean;
    paragraph?: boolean;
    variant?: Variant | "inherit";
    variantMapping?: Partial<Record<Variant, string>>;
    fontSize?: string;
}

export function WrappedTextBlock(props: WrappedTextBlockProps) {

    return (
        <Typography style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: props.row,
            overflow: "hidden",
            wordBreak: "break-all",
            fontSize: props.fontSize ?? undefined
        }} {...props} >
            {props.children}
        </Typography>
    );
}