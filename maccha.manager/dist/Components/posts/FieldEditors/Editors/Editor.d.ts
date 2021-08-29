/// <reference types="react" />
import { SchemeType } from "../../../../Models/Contents/Entities/Scheme";
import { FieldEditorProps } from "../FieldEditorProps";
import { SchemeEditorProps } from "../SchemeEditorProps";
export interface Editor {
    fieldEditor: (props: FieldEditorProps) => JSX.Element;
    schemeEditor: (props: SchemeEditorProps) => JSX.Element;
    type: SchemeType;
    name: string;
    description: string;
}
