import { Backdrop, CircularProgress, Dialog, DialogProps, Grow, Snackbar, SnackbarOrigin, SnackbarProps, useTheme } from "@mui/material";
import { TransitionHandlerProps, TransitionProps } from "@mui/material/transitions";
import React, { memo, useContext, useState } from "react";

export const DialogContext = React.createContext({
    closeDialog: () => { },
    openDialog: (target: React.ReactNode) => { },
    setDialogOption: (option: DialogOption) => { },
    closeSnackbar: () => {
    },
    openSnackbar: (message: string, option?: OpenNotifyOption) => {
    },
    setSnackbarOption: (option: SnackbarOption) => {
    },
    setIsLoading: (isLoading: boolean) => { },
});

export type DialogOption = Omit<DialogProps, "open">;

export type SnackbarOption = Omit<SnackbarProps, "open" | "autoHideDuration" | "color" | "onClose">;

export interface OpenNotifyOption {
    target?: React.ReactNode;
    color?: string;
    autoHideDuration?: number;
    anchorOrigin?: SnackbarOrigin;
}

interface DialogProvider {
    children: React.ReactNode | React.ReactNodeArray;
    keepMounted?: boolean;
}

export const DialogProvider = (props: DialogProvider) => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifyMessage, setNotifyMessage] = useState("");
    const [isNotifyOpen, setIsNotifyOpen] = useState(false);

    const [dialogRenderTarget, setDialogRenderTarget] = useState<React.ReactNode>(<div></div>);
    const [notifyRenderTarget, setNotifyRenderTarget] = useState<React.ReactNode>(<div></div>);

    const [dialogOption, setDialogOption] = useState<DialogOption | undefined>();
    const [notifyOption, setNotifyOption] = useState<SnackbarProps | undefined>();

    const [isLoading, setIsLoading] = useState(false);

    const theme = useTheme();

    const { keepMounted } = props;
    const handler = {
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
                autoHideDuration: option?.autoHideDuration ?? 3000,
            });

            setNotifyMessage(message);
            setIsNotifyOpen(true);
        },
        setSnackbarOption: (option: SnackbarOption) => {
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
        <DialogContext.Provider value={handler}>
            <Memo> {props.children}</Memo>

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
                open={isNotifyOpen}
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
        </DialogContext.Provider>
    );
};

const Memo = memo(({ children }: any) => <>{children}</>);