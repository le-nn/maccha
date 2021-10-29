import { Box, DialogProps, Typography, DialogContent, DialogActions, Button, TextField, TextFieldProps } from "@mui/material";
import React, { useState } from "react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { DialogContext, DialogOption } from "./DialogProvider";
import { useDialog } from "./useDialog";

type DialogRenderer<TResult>
    = (close: (result: TResult) => void) => React.ReactNode;

interface DialogHandler {
    showAsync: <TResult = any>(renderer: DialogRenderer<TResult>, options?: DialogOption)
        => Promise<TResult>;
    close: () => void;
    setOption: (option: DialogOption) => void;
}

interface InputDialogOption extends DialogOption {
    hideCancel?: boolean;
    cancelText?: string;
    okText?: string;
    defaultText?: string;
    textFieldProps?: TextFieldProps;
}

export const useIntupDialog = () => {
    const { showAsync, close, setOption } = useDialog();
    const { t } = useTranslation();

    const showMessageAsync = async (message: string, subMessage?: string, options?: InputDialogOption): Promise<string | null> => {
        return await showAsync<string | null>(close => {
            return React.createElement(() => {
                const [text, setText] = useState(options?.defaultText ?? "");

                const ok = () => {
                    close(text);
                };

                const cancel = () => {
                    close(null);
                };

                return (
                    <>
                        <DialogContent>
                            <Box>
                                <Box p={3} pb={0}>
                                    <Typography>{message}</Typography>
                                </Box>
                                {
                                    !!subMessage && <Box px={3}>
                                        <Typography>{message}</Typography>
                                    </Box>
                                }
                                <Box p={3}>
                                    <TextField {...options?.textFieldProps} onChange={e => setText(e.target.value)} />
                                </Box>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            {options?.hideCancel !== false &&
                                <Button onClick={cancel}>{t(options?.cancelText ?? "CANCEL")}</Button>
                            }
                            <Button color="primary" onClick={ok}>{t(options?.okText ?? "OK")}</Button>
                        </DialogActions>
                    </>
                );
            });
        }, options);
    };

    return { showMessageAsync, close, setOption };
};
