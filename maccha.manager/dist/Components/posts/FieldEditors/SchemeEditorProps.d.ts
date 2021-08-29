import { Scheme } from "../../../Models/Contents/Entities/Scheme";
export interface SchemeEditorProps {
    scheme: Scheme;
    onChange: (e: Scheme) => void;
}
