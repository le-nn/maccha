import { showDialogAsync, DialogContentProp } from "../../commons/showDialog";
import React, { useState } from "react";
import {
    Button,
    Box,
    Typography,
    Checkbox,
} from "@material-ui/core";
import { theme } from "../../../theme";

/**
 * select media or upload Dialog.
 * @param props props
 */
function ConfirmPostTypeDialog(props: DialogContentProp<ConfirmPostTypeDialogProps, boolean>) {
    const [confirm, setConfirm] = useState(false);
    return (
        <Box p={2}>
            <Box>
                <Typography variant="h6">{props.context.message}</Typography>
            </Box>

            <Box mt={1}>
                <Typography variant="overline" style={{ color: theme.palette.grey[500] }}>
                    投稿タイプと紐づいている投稿がすべて削除されますがよろしいですか？
                </Typography>
            </Box>
            <Box>
                <Checkbox checked={confirm} onChange={e => setConfirm(e.target.checked)}></Checkbox>
                確認しました
            </Box>
            <Box marginTop="24px" display="flex">
                <Button
                    variant="text"
                    color="primary"
                    style={{ marginLeft: "auto" }}
                    onClick={() => props.onClose(false)}
                >
                    Cancel
                </Button>
                <Button
                    disabled={!confirm}
                    variant="contained"
                    style={{ marginLeft: "12px" }}
                    onClick={() => props.onClose(true)}
                    color="primary" >
                    Ok
                </Button>
            </Box>
        </Box>
    );
}

interface ConfirmPostTypeDialogProps {
    message: string;
}

export async function confirmDeletePostTypeAsync(message: string) {
    return await showDialogAsync(ConfirmPostTypeDialog, { message }, {
        maxWidth: "lg"
    });
}
