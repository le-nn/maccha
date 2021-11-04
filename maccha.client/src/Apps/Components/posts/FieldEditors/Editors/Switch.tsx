import React from "react";
import { FieldEditorProps } from "../FieldEditorProps";
import { Switch as MSwitch } from "@mui/material";
import { SchemeType } from "../../../../Models/Domain/Contents/Entities/Scheme";
import { Editor } from "./Editor";

export const SwitchEditor: Editor = {
    fieldEditor: Switch,
    schemeEditor: () => <></>,
    type: "switch" as SchemeType,
    name: "スイッチ",
    description: "スイッチでオン/オフを切り替えることができます。"
};

export function Switch(props: FieldEditorProps) {
    function handleChange(text: string) {
        props.onChange(props.field.field.clone({
            value: text
        }));
    }

    return (
        <>
            <MSwitch
                color="primary"
                checked={props.field.field.value === "1"}
                onChange={e => handleChange(e.target.checked ? "1" : "0")}
            ></MSwitch>
        </>
    );
}