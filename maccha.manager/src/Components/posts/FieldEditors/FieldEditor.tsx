import React from "react";
import { FieldEditorProps } from "./FieldEditorProps";
import {editors} from "./Editors";

export function FieldEditor(props: FieldEditorProps) {
    const { field } = props;

    const Element = editors[field.scheme.type].fieldEditor;

    if (Element) {
        return (
            <Element field={field} onChange={props.onChange}></Element>
        );
    }

    return <></>;
}