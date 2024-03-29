import { SchemeType } from "../../../../Models/Domain/Contents/Entities/Scheme";
import { FieldEditorProps } from "../FieldEditorProps";
import { SchemeEditorProps } from "../SchemeEditorProps";

export interface Editor {
    fieldEditor: (props: FieldEditorProps) => JSX.Element;
    schemeEditor: (props: SchemeEditorProps) => JSX.Element;
    type: SchemeType;
    name: string;
    description: string;
}