/// <reference types="react" />
import { DialogContentProp } from "../../commons/showDialog";
import { Scheme } from "../../../Models/Contents/Entities/Scheme";
export default function FieldTypeEditDialog(props: DialogContentProp<Scheme, Scheme | null>): JSX.Element;
export declare function showFieldTypeEditDialogAsync(params: Scheme): Promise<Scheme | null>;
