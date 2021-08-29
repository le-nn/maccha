import React from "react";
import { FieldEditorProps } from "../FieldEditorProps";
import { ValidationTextField } from "../../../commons";
import { SchemeType } from "../../../../Models/Contents/Entities/Scheme";
import { Editor } from "./Editor";

export const TextFieldEditor: Editor = {
    fieldEditor: Text,
    schemeEditor: () => <></>,
    type: "text-field" as SchemeType,
    name: "画像",
    description: "画像用のフィールドです。APIからは画像URLが返却されます。"
};

export function Text(props: FieldEditorProps) {
    function handleChange(text: string) {
        props.onChange(props.field.field.clone({
            value: text
        }));
    }

    return (
        <ValidationTextField
            fullWidth
            variant="outlined"
            helperText={props.helperText}
            errorText="無効な値です"
            required={props.required}
            rules={props.rule}
            value={props.field.field.value}
            textChanged={e => handleChange(e.value)}
        />
    );
}