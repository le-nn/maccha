import React from "react";
import { Typography, PropTypes } from "@material-ui/core";
import { Variant } from "@material-ui/core/styles/createTypography";

interface WrappedTextBlockProps {
    row: number;
    children?: React.ReactNode;
    align?: PropTypes.Alignment;
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
            wordBreak:"break-all",
            fontSize: props.fontSize ?? undefined
        }} {...props} >
            {props.children}
        </Typography>
    );
}