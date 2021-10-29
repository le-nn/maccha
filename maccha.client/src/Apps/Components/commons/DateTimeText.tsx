import React from "react";
import { PropTypes, Typography } from "@mui/material";

interface DateTimeTextProps {
    date?: Date;
    showTime?: boolean;
    align?: any;
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
    variant?: any | "inherit";
    variantMapping?: Partial<Record<any, string>>;
    fontSize?: string;
}

export function DateTimeText(props: DateTimeTextProps) {
    const { date, showTime } = props;
    return (
        <Typography {...props} style={{ fontSize: props.fontSize }}>
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