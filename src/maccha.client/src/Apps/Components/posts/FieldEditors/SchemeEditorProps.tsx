import { Scheme } from "../../../Models/Domain/Contents/Entities/Scheme";

export interface SchemeEditorProps {
    scheme: Scheme;
    onChange: (e: Scheme) => void;
}