import { DialogProps, SnackbarProps } from "@mui/material";
import { useContext } from "react";
import { DialogContext, DialogOption, OpenNotifyOption } from "./DialogProvider";

type NotifybarRenderer
    = (close: () => void) => React.ReactNode;

interface NotifybarHandler {
    show: (message: string, options?: OpenNotifyOption)
        => void;
    close: () => void;
    setOption: (option: SnackbarProps) => void;
}

export const useNotifybar = (): NotifybarHandler => {
    const context = useContext(DialogContext).handlers;
    if (!context) {
        throw new Error("DialogProvider is not registered.");
    }

    return {
        show: (message: string, options?: OpenNotifyOption) => {
            context.openSnackbar(message, options);
        },
        close: () => {
            context.closeDialog();
        },
        setOption: (option: SnackbarProps) => {
            context.setSnackbarOption(option);
        }
    };
};
