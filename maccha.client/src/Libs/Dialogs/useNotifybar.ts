import { DialogProps } from "@mui/material";
import { useContext } from "react";
import { DialogContext, SnackbarOption, OpenNotifyOption } from "./DialogProvider";

type NotifybarRenderer
    = (close: () => void) => React.ReactNode;

interface NotifybarHandler {
    show: (message: string, options?: SnackbarOption)
        => void;
    close: () => void;
    setOption: (option: SnackbarOption) => void;
}

export const useNotifybar = (): NotifybarHandler => {
    const context = useContext(DialogContext);
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
        setOption: (option: SnackbarOption) => {
            context.setDialogOption(option);
        }
    };
};
