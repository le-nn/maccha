import { Field } from "../../../Models/Domain/Contents/Entities/Field";
import { FieldContext } from "./FieldContext";

export interface FieldEditorProps {
    field: FieldContext;
    onChange: (e: Field) => void;
    helperText?: string;
    required?: boolean;
    rule?: RegExp;
    metadata?: string;
}