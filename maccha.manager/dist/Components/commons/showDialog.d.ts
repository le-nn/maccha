import React from "react";
export interface DialogContentProp<T, U> {
    onClose: (value: U) => void;
    context: T;
    forwardRef?: any;
}
interface DialogOption {
    maxWidth: false | "md" | "xs" | "sm" | "lg" | "xl" | undefined;
}
export declare function showDialogAsync<T, U, V extends React.ReactElement>(component: (props: DialogContentProp<T, U>) => V, context: T, option?: DialogOption): Promise<U>;
interface DialogContentFrameProps {
    children?: React.ReactNode;
    actions?: React.ReactNode;
    message?: string;
    description?: string;
}
export declare function DialogContentFrame(props: DialogContentFrameProps): JSX.Element;
export {};
