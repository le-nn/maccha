import { Box, DialogProps, Typography, DialogContent, DialogActions, Button, TextField, TextFieldProps } from "@mui/material";
import React, { ReactNode, useState, useEffect } from "react";
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

interface ConfirmDialogOption extends DialogOption {
    hideCancel?: boolean;
    cancelText?: string;
    okText?: string;
    defaultText?: string;
    textFieldProps?: TextFieldProps;
}

export const useConfirmDialog = () => {
    const { showAsync, close, setOption } = useDialog();
    const { t } = useTranslation();

    const confirmAsync = async (message: string, subMessage?: string | ReactNode, options?: ConfirmDialogOption): Promise<boolean> => {
        return await showAsync<boolean>(close => {
            return React.createElement(() => {
                const [text, setText] = useState(options?.defaultText ?? "");

                const ok = () => {
                    close(true);
                };

                const cancel = () => {
                    close(false);
                };

                useEffect(() => {
                    if (options) {
                        setOption(options);
                    }
                }, [options]);

                return (
                    <>
                        <DialogContent>
                            <Box>
                                <Box p={3} pb={0}>
                                    <Typography variant="h5">{message}</Typography>
                                </Box>
                                {
                                    !!subMessage && <Box px={3} mt={2}  >
                                        <Typography variant="body2">{subMessage}</Typography>
                                    </Box>
                                }
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

    return { confirmAsync, close, setOption };
};
