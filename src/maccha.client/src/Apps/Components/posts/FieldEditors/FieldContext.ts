import { Field } from "../../../Models/Domain/Contents/Entities/Field";
import { Scheme } from "../../../Models/Domain/Contents/Entities/Scheme";

export interface FieldContext {
    field: Field;
    scheme: Scheme;
}
