import React from "react";
import { PropTypes, Typography } from "@mui/material";

interface DateTimeTextProps {
    date?: Date;
    isShowTime?: boolean;
    align?: "left"|"right"|"center";
    color?:
    | "initial"
    | "inherit"
    | "primary"
    | "secondary"
    | "textPrimary"
    | "textSecondary"
    | "error";
    fontSize?: string;
}

export function DateTimeText(props: DateTimeTextProps) {
    const { date, isShowTime,color } = props;
    return (
        <Typography color={color} style={{ fontSize: props.fontSize }}>
            { date?.getFullYear()}
            <small> 年</small >
            {(date?.getMonth() ?? 0) + 1}
            <small>月</small>
            { date?.getDate()}
            <small>日</small>
            {
                isShowTime && (
                    <>
                        {date?.getHours()}
                        <small>時</small>
                        {date?.getMinutes()}
                        <small>分</small>
                    </>
                )
            }
        </Typography >
    );
}