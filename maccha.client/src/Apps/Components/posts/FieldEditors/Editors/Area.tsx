import React from "react";
import { SchemeType } from "../../../../Models/Contents/Entities/Scheme";
import { ValidationTextField } from "../../../commons";
import { FieldEditorProps } from "../FieldEditorProps";
import { Editor } from "./Editor";

export const TextareaEditor: Editor = {
    fieldEditor: Area,
    schemeEditor: () => <></>,
    type: "text-area" as SchemeType,
    name: "テキストエリア",
    description: "自由入力の複数行テキストです。リッチエディタによる編集が可能です。APIからHTMLが取得できます。"
};

function Area(props: FieldEditorProps) {
    function handleChange(text: string) {
        props.onChange(props.field.field.clone({
            value: text
        }));
    }

    return (
        <ValidationTextField
            fullWidth
            rows={8}
            variant="outlined"
            multiline
            helperText={props.helperText}
            errorText="無効な値です"
            required={props.required}
            rules={props.rule}
            value={props.field.field.value}
            textChanged={e => handleChange(e.value)}
        />
    );
}