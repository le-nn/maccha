import { TextField, TextFieldProps } from "@mui/material";
import React, { useState } from "react";

interface ValidationTextFieldProps {
    value?: unknown;
    rules?: RegExp;
    required?: boolean;
    errorText?: string;
    textChanged?: (e: { value: string, valid: boolean }) => void;
}

export function ValidationTextField(props: ValidationTextFieldProps & TextFieldProps) {
    const [isError, setIsError] = useState(false);
    const [isChanged, setIsChanged] = useState(false);


    function handleChange(value: string) {
        const valid = props.rules?.test(value) ?? true;

        if (isError !== !valid) {
            setIsError(!valid);
        }

        props.textChanged && props.textChanged({
            value,
            valid
        });
    }

    return <TextField
        {...props}
        error={(isError || (props.required && !props.value)) && isChanged}
        value={props.value}
        onChange={e => { setIsChanged(true); handleChange(e.target.value); }}
        helperText={
            (props.required && !props.value) && isChanged ?
                "入力してください" :
                isError ?
                    props.errorText :
                    props.helperText
        }
    ></TextField>;
}