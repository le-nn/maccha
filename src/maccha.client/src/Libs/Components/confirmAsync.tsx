import React, { useEffect, useState } from "react";
import { showDialogAsync, DialogContentProp, DialogContentFrame } from "./showDialog";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { lightTheme } from "../../Portal/theme";

/**
 * Dialog that can confirm Ok or Cancel.
 * @param props dialog props
 */
function ConfirmDialog(props: DialogContentProp<ConfirmOption & { message: string; }, boolean>) {
    const theme = useTheme();
    return (
        <DialogContentFrame
            actions={<>
                <Button
                    variant="text"
                    onClick={() => props.onClose(false)}
                >
                    {props.context.cancelText}
                </Button>
                <Button
                    variant="text"
                    onClick={() => props.onClose(true)}
                    color="primary" >
                    {props.context.okText}
                </Button>
            </>}
            description={props.context.description}
            message={props.context.message}
        >
        </DialogContentFrame>
    );
}

interface ConfirmOption {
    description: string;
    okText: string;
    cancelText: string;
}

/**
 * show confirm dialog async.
 * @param message confirm message
 * @param option dialog option
 */
export async function confirmAsync(message: string, option?: Partial<ConfirmOption>) {
    const merged = ({
        message,
        description: "",
        okText: "OK",
        cancelText: "Cancel",
        ...option
    }) as ConfirmOption & { message: string; };

    return await showDialogAsync(ConfirmDialog, merged, { theme: lightTheme });
}