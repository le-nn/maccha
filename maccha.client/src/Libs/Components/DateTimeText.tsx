import React from "react";
import { PropTypes, Typography } from "@mui/material";

interface DateTimeTextProps {
    date?: Date;
    showTime?: boolean;
    align?: "left"|"right"|"center";
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
    variant?: "left"|"right"|"center" | "inherit";
    variantMapping?: Partial<Record<"left"|"right"|"center", string>>;
    fontSize?: string;
}

export function DateTimeText(props: DateTimeTextProps) {
    const { date, showTime } = props;
    return (
        <Typography {...props as any} style={{ fontSize: props.fontSize }}>
            { date?.getFullYear()}
            < small > 年</small >
            {(date?.getMonth() ?? 0) + 1}
            <small>月</small>
            { date?.getDate()}
            <small>日</small>
            {
                showTime && (
                    <>
                        {date?.getHours()}
                        < small >時</small>
                        {date?.getMinutes()}
                        <small>分</small>
                    </>
                )
            }
        </Typography >
    );
}