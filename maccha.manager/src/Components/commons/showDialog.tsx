import React, { useEffect, useState } from "react";
import { render, unmountComponentAtNode, } from "react-dom";
import {
    Dialog,
    Grow,
    DialogContent as DContent,
    useMediaQuery,
    Typography,
    DialogActions,
    Box
} from "@material-ui/core";
import { makeStyles, Theme, createStyles, ThemeProvider } from "@material-ui/core/styles";
import { theme } from "../../theme";

interface DialogProp<T, U> {
    onClose: (value: U) => void;
    context: T;
    content: (props: DialogContentProp<T, U>) => React.ReactElement;
    element: HTMLElement;
    maxWidth: false | "md" | "xs" | "sm" | "lg" | "xl" | undefined;
}

function DialogBase<T, U>(props: DialogProp<T, U>) {
    const [isOpen, setIsOpen] = useState(false);
    const classes = useStyles();
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
        <Dialog
            TransitionComponent={Grow}
            open={isOpen}
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth={props.maxWidth}
            fullWidth
            fullScreen={matches}
            container={props.element}
        >
            <DContent style={{ padding: "0px" }}>
                <props.content
                    onClose={e => onClose(e)}
                    context={props.context}></props.content>
            </DContent>
        </Dialog >
    );
}

export interface DialogContentProp<T, U> {
    onClose: (value: U) => void;
    context: T;
    forwardRef?: any;
}

interface DialogOption {
    maxWidth: false | "md" | "xs" | "sm" | "lg" | "xl" | undefined;
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
            <ThemeProvider theme={theme}>
                <DialogBase
                    onClose={onClose}
                    content={component}
                    context={context}
                    element={element}
                    maxWidth={option?.maxWidth} />
            </ThemeProvider>,
            element);
    });
}

interface DialogContentFrameProps {
    children?: React.ReactNode;
    actions?: React.ReactNode;
    message?: string;
    description?: string;
}

export function DialogContentFrame(props: DialogContentFrameProps) {
    return (
        <Box>
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
            <Box p={1}>
                {
                    props.actions && <DialogActions >
                        {props.actions}
                    </DialogActions>
                }
            </Box >
        </Box>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            outline: "none"
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: "2px solid #000",
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        container: {
            width: "90%"
        }
    }),
);