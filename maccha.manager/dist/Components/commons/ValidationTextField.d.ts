/// <reference types="react" />
import { TextFieldProps } from "@material-ui/core";
interface ValidationTextFieldProps {
    value?: unknown;
    rules?: RegExp;
    required?: boolean;
    errorText?: string;
    textChanged?: (e: {
        value: string;
        valid: boolean;
    }) => void;
}
export declare function ValidationTextField(props: ValidationTextFieldProps & TextFieldProps): JSX.Element;
export {};
