import React, { useEffect } from "react";
import { FieldEditorProps } from "../FieldEditorProps";
import { ValidationTextField } from "../../../commons";
import { Select as MSelect, MenuItem, TextField, Typography } from "@material-ui/core";
import { SchemeEditorProps } from "../SchemeEditorProps";
import { SchemeType } from "../../../../Models/Contents/Entities/Scheme";
import { Editor } from "./Editor";

export const SelectEditor: Editor = {
    fieldEditor: Select,
    schemeEditor: SelectScheme,
    type: "select" as SchemeType,
    name: "セレクトフィールド",
    description: "定義したリストの中から値を選択するフィールドです。"
};

export function Select(props: FieldEditorProps) {
    function handleChange(text: string) {
        props.onChange(props.field.field.clone({
            value: text
        }));
    }

    const selection = props.field.scheme.metadata.split(",");

    useEffect(() => {
        if (!props.field.field.value) {
            handleChange(selection[0] ?? "");
        }
    }, []);

    return (
        <MSelect
            fullWidth
            variant="outlined"
            required={props.required}
            value={props.field.field.value}
            onChange={e => handleChange(e.target.value as string)}
        >
            {
                selection.map(text => (
                    <MenuItem value={text}>{text}</MenuItem>
                ))
            }
        </MSelect>
    );
}

export function SelectScheme(props: SchemeEditorProps) {
    function handleChange(text: string) {
        props.onChange(props.scheme.clone({
            metadata: text
        }));
    }

    return (
        <>
            <Typography>選択肢</Typography>
            <TextField
                fullWidth
                rows="4"
                multiline
                variant="filled"
                value={props.scheme.metadata}
                onChange={e => handleChange(e.target.value)}
                helperText="「,」カンマ区切りで選択肢を謬力してください"
            />
        </>
    );
}