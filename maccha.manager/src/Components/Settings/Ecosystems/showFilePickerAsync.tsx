import React, { useState } from "react";
import { showDialogAsync, DialogContentProp } from "../../commons/showDialog";
import { Box, Typography, Button } from "@material-ui/core";
import { FileDropArea } from "../../commons";

/**
 * Dialog that can confirm Ok or Cancel.
 * @param props dialog props
 */
function ConfirmDialog(props: DialogContentProp<undefined, File | null>) {
    const [file, setFile] = useState<File | null>(null);

    return (
        <Box p={2}>
            <Box>
                <Typography variant="h6">ファイルを選択してください</Typography>
            </Box>

            <Box mt={1}>
                <FileDropArea onChange={e => setFile(e)} />
            </Box>
            <Box marginTop="24px" display="flex">
                <Button
                    variant="text"
                    color="primary"
                    style={{ marginLeft: "auto" }}
                    onClick={() => props.onClose(null)}
                >
                    Cancel
                </Button>
                <Button
                    disabled={!file}
                    variant="contained"
                    style={{ marginLeft: "12px" }}
                    onClick={() => props.onClose(file)}
                    color="primary" >
                    Ok
                </Button>
            </Box>
        </Box>
    );
}

interface ConfirmOption {
    okText: string;
    cancelText: string;
}

/**
 * show confirm dialog async.
 * @param message confirm message
 * @param option dialog option
 */
export async function showFilePickerAsync() {
    return await showDialogAsync(ConfirmDialog, undefined);
}