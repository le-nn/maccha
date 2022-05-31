import { DialogProps } from "@mui/material";
import { useContext } from "react";
import { DialogContext, OpenNotifyOption } from "./DialogProvider";

type NotifybarRenderer
    = (close: () => void) => React.ReactNode;

interface LoadingHandler {
    setIsLoading: (isLoading: boolean) => void;
    begin: () => void;
    end: () => void;
}

export const useLoading = (): LoadingHandler => {
    const context = useContext(DialogContext).handlers;
    if (!context) {
        throw new Error("DialogProvider is not registered.");
    }

    return {
        setIsLoading(isLoading: boolean) {
            context.setIsLoading(isLoading);
        },
        begin() {
            context.setIsLoading(true);
        },
        end() {
            context.setIsLoading(false);
        }
    };
};
