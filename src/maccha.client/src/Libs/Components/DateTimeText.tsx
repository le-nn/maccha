import React from "react";
import { Variant } from "@mui/material/styles/createTypography";
import { Typography } from "@mui/material";

interface DateTimeTextProps {
    date?: Date;
    showTime?: boolean;
    align?: "center" | "left" | "right";
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

export function DateTimeText(props: DateTimeTextProps) {
    const { date, showTime } = props;
    return (
        <Typography {...props} style={{ fontSize: props.fontSize }}>
            {date?.getFullYear()}
            < small > 年</small >
            {(date?.getMonth() ?? 0) + 1}
            <small>月</small>
            {date?.getDate()}
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