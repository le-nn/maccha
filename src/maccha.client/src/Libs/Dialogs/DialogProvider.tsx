import { Backdrop, CircularProgress, Dialog, DialogProps, Grow, Snackbar, SnackbarOrigin, SnackbarProps, useTheme } from "@mui/material";
import { TransitionHandlerProps, TransitionProps } from "@mui/material/transitions";
import { color } from "@mui/system";
import React, { memo, useContext, useEffect, useRef, useState } from "react";

const handlersRef = {
    handlers: {
        closeDialog: () => {
            console.log("DialogProvider context is not loaded.");
        },
        openDialog: (target: React.ReactNode) => {
            console.log("DialogProvider context is not loaded.");
        },
        setDialogOption: (option: DialogOption) => {
            console.log("DialogProvider context is not loaded.");
        },
        closeSnackbar: () => {
            console.log("DialogProvider context is not loaded.");
        },
        openSnackbar: (message: string, option?: OpenNotifyOption) => {
            console.log("DialogProvider context is not loaded.");
        },
        setSnackbarOption: (option: SnackbarProps) => {
            console.log("DialogProvider context is not loaded.");
        },
        setIsLoading: (isLoading: boolean) => {
            console.log("DialogProvider context is not loaded.");
        },
    }
};

export const DialogContext = React.createContext(handlersRef);

export type DialogOption = Omit<DialogProps, "open">;

export interface OpenNotifyOption {
    target?: React.ReactNode;
    color?: string;
    autoHideDuration?: number | null;
    anchorOrigin?: SnackbarOrigin;
}

interface DialogProvider {
    children: React.ReactNode | React.ReactNodeArray;
    keepMounted?: boolean;
}

export const DialogProvider = (props: DialogProvider) => {
    const [handlerRef] = useState(() => ({ ...handlersRef }));
    return (
        <DialogContext.Provider value={handlerRef}>
            <Main {...props} />
            {props.children}
        </DialogContext.Provider>
    );
};

const Main = (props: DialogProvider) => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifyMessage, setNotifyMessage] = useState("");
    const [isNotifyOpen, setIsNotifyOpen] = useState(false);

    const [dialogRenderTarget, setDialogRenderTarget] = useState<React.ReactNode>(<div></div>);
    const [notifyRenderTarget, setNotifyRenderTarget] = useState<React.ReactNode>(<div></div>);

    const [dialogOption, setDialogOption] = useState<DialogOption | undefined>();
    const [notifyOption, setNotifyOption] = useState<SnackbarProps | undefined>();

    const [isLoading, setIsLoading] = useState(false);

    const theme = useTheme();
    const handlerRef = useContext(DialogContext);
    const { keepMounted } = props;

    handlerRef.handlers = {
        closeDialog: () => {
            setIsOpen(false);
            setDialogRenderTarget(null);
        },
        openDialog: (target: React.ReactNode) => {
            setDialogRenderTarget(target);
            setIsOpen(true);
        },
        setDialogOption: (option: DialogOption) => {
            setDialogOption(option);
        },
        closeSnackbar: () => {
            setIsOpen(false);
            setDialogRenderTarget(null);
        },
        openSnackbar: (message: string, option?: OpenNotifyOption) => {
            if (option?.target) {
                setNotifyRenderTarget(option.target);
            }

            setNotifyOption({
                ...notifyOption,
                anchorOrigin: {
                    horizontal: option?.anchorOrigin?.horizontal ?? "center",
                    vertical: option?.anchorOrigin?.vertical ?? "top",
                },
                color: theme.palette.primary.main,
                autoHideDuration: option?.autoHideDuration === undefined ? 3000 : option.autoHideDuration,
            });

            setNotifyMessage(message);
            setIsNotifyOpen(true);
        },
        setSnackbarOption: (option: SnackbarProps) => {
            setNotifyOption(option);
        },
        setIsLoading(value: boolean) {
            setIsLoading(value);
        }
    };

    const handleNotifyClose = () => {
        setIsNotifyOpen(false);
    };

    const handleTransitionExit = (node: HTMLElement) => {
        setNotifyMessage("");

        const onExit = notifyOption?.TransitionProps?.onExit;
        if (onExit) {
            onExit(node);
        }
    };

    return (
        <>
            <Dialog
                {...dialogOption}
                TransitionComponent={dialogOption?.TransitionComponent ?? Grow}
                keepMounted={keepMounted}
                open={isOpen}
            >
                {dialogRenderTarget}
            </Dialog>
            <Snackbar
                {...notifyOption}
                open={isNotifyOpen && !!notifyMessage}
                onClose={handleNotifyClose}
                message={notifyMessage}
                action={notifyRenderTarget}
                TransitionProps={{
                    ...notifyOption?.TransitionProps,
                    onExit: handleTransitionExit
                }}
            />
            <Backdrop open={isLoading} style={{ zIndex: 9999, width: "100vw", height: "100vh" }} >
                <CircularProgress size={52} color="primary" />
            </Backdrop>
        </>
    );
};
