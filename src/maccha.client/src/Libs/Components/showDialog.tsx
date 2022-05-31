import React, { createContext, useContext, useEffect, useState } from "react";
import { render, unmountComponentAtNode, } from "react-dom";
import {
    Dialog,
    Grow,
    DialogContent as DContent,
    useMediaQuery,
    Typography,
    DialogActions,
    Box,
} from "@mui/material";
import { Theme, ThemeProvider, useTheme, createMuiTheme } from "@mui/material";
import { Spacer } from "./Spacer";

interface DialogProp<T = unknown, U = unknown> {
    onClose: (value: U) => void;
    context: T;
    content: (props: DialogContentProp<T, U>) => React.ReactElement;
    element: HTMLElement;
    maxWidth: false | "md" | "xs" | "sm" | "lg" | "xl" | undefined;
    fullScreen?: boolean;
}

const DialogContext = createContext<DialogProp | null>(null);

function DialogBase<T, U>(props: DialogProp<T, U>) {
    const theme = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const matches = useMediaQuery(theme.breakpoints.down("xs"));

    useEffect(() => {
        setIsOpen(true);
    }, []);

    const onClose = (e: U) => {
        setIsOpen(false);
        setTimeout(() => {
            props.onClose(e);
        }, 500);
    };

    return (
        <DialogContext.Provider value={props}>
            <Dialog
                TransitionComponent={Grow}
                open={isOpen}
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth={props.maxWidth}
                fullWidth
                fullScreen={matches || props.fullScreen}
                container={props.element}
            >
                <DContent style={{ padding: "0px" }}>
                    <props.content
                        onClose={e => onClose(e)}
                        context={props.context}></props.content>
                </DContent>
            </Dialog >
        </DialogContext.Provider>
    );
}

export interface DialogContentProp<T, U> {
    onClose: (value: U) => void;
    context: T;
    forwardRef?: unknown;
}

interface DialogOption {
    maxWidth?: false | "md" | "xs" | "sm" | "lg" | "xl" | undefined;
    theme?: Theme;
    fullscreen?: boolean;
}

export function showDialogAsync<T, U, V extends React.ReactElement>(
    component: (props: DialogContentProp<T, U>) => V,
    context: T,
    option?: DialogOption
): Promise<U> {
    return new Promise(resolve => {
        const element = document.createElement("div");
        document.body.appendChild(element);

        const onClose = (e: U) => {
            unmountComponentAtNode(element);
            document.body.removeChild(element);
            element.remove();
            resolve(e);
        };

        render(
            <ThemeProvider theme={(option && option.theme) || createMuiTheme()}>
                <DialogBase
                    onClose={onClose}
                    content={component}
                    context={context}
                    element={element}
                    fullScreen={option?.fullscreen}
                    maxWidth={option?.maxWidth} />
            </ThemeProvider>,
            element
        );
    });
}

interface DialogContentFrameProps {
    children?: React.ReactNode;
    actions?: React.ReactNode;
    message?: string;
    description?: string;
}

export function DialogContentFrame(props: DialogContentFrameProps) {
    const dialogOptions = useContext(DialogContext);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("xs"));

    return (
        <Box height={dialogOptions?.fullScreen || matches ? "100vh" : ""} display="flex" flexDirection="column">
            <Box p={3}>
                {
                    props.message &&
                    <Box>
                        <Typography variant="h6">{props.message}</Typography>
                    </Box>
                }
                {
                    props.description &&
                    <Box mt={3}>
                        <Typography variant="overline" color="textSecondary">
                            {props.description}
                        </Typography>
                    </Box>
                }
                {
                    props.children &&
                    <Box my={3}>
                        {props.children}
                    </Box>
                }
            </Box>
            <Spacer />
            <Box p={1} style={{
                position: "sticky",
                bottom: 0,
                background: theme.palette.background.paper
            }}>
                {
                    props.actions && <DialogActions >
                        {props.actions}
                    </DialogActions>
                }
            </Box >
        </Box>
    );
}
