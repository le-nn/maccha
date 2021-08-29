/// <reference types="react" />
interface FileDropArea {
    onChange?: (path: File) => void;
    commited?: (file: File | null) => void;
    showCommend?: boolean;
}
export declare function FileDropArea(props: FileDropArea): JSX.Element;
export {};
