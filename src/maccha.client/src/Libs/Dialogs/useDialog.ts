import { DialogProps } from "@mui/material";
import { useContext } from "react";
import { DialogContext, DialogOption } from "./DialogProvider";

type DialogRenderer<TResult>
    = (close: (result: TResult) => void) => React.ReactNode;

interface DialogHandler {
    showAsync: <TResult = void>(renderer: DialogRenderer<TResult>, options?: DialogOption)
        => Promise<TResult>;
    close: () => void;
    setOption: (option: DialogOption) => void;
}

export const useDialog = (): DialogHandler => {
    const context = useContext(DialogContext).handlers;
    if (!context) {
        throw new Error("DialogProvider is not registered.");
    }

    return {
        showAsync: <TResult = any>(renderer: DialogRenderer<TResult>, options?: DialogOption) => {
            if (!renderer) {
                throw new Error("renderer is undefined.");
            }

            if (options) {
                context.setDialogOption(options);
            }

            return new Promise<TResult>(
                resolve => {
                    const onClose = (result: TResult) => {
                        context.closeDialog();
                        resolve(result);
                    };

                    const ctx = renderer(onClose);
                    context.openDialog(ctx);
                }
            );
        },
        close: () => {
            context.closeDialog();
        },
        setOption: (option: DialogOption) => {
            context.setDialogOption(option);
        }
    };
};
