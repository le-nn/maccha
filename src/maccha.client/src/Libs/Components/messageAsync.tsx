import React from "react";
import { showDialogAsync, DialogContentProp } from "./showDialog";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { lightTheme } from "../../Portal/theme";

/**
 * Dialog that can confirm Ok or Cancel.
 * @param props dialog props
 */
function MessageDialog(props: DialogContentProp<MessageOption & { message: string; }, void>) {
    const theme = useTheme();
    return (
        <Box p={2}>
            <Box>
                <Typography variant="h6">{props.context.message}</Typography>
            </Box>

            <Box mt={1}>
                <Typography variant="overline" style={{ color: theme.palette.grey[500] }}>
                    {props.context.description}
                </Typography>
            </Box>
            <Box marginTop="24px" display="flex">
                <Button
                    style={{ marginLeft: "auto" }}
                    variant="contained"
                    onClick={() => props.onClose()}
                    color="primary" >
                    {props.context.okText}
                </Button>
            </Box>
        </Box>
    );
}

interface MessageOption {
    description: string;
    okText: string;
}

/**
 * show confirm dialog async.
 * @param message confirm message
 * @param option dialog option
 */
export async function messageAsync(message: string, option?: Partial<MessageOption>) {
    const merged = ({
        message,
        description: "",
        okText: "OK",
        ...option
    }) as MessageOption & { message: string; };

    return await showDialogAsync(MessageDialog, merged,{ theme: lightTheme });
}