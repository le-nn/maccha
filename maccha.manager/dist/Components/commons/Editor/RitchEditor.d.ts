import React from "react";
import "./style.scss";
interface RitchEditorProps {
    content: string;
    contentChanged: (e: string) => void;
    uploadImageHandler: () => Promise<string | null>;
}
export declare class RitchEditor extends React.Component<RitchEditorProps> {
    quillRef: any;
    module: {
        toolbar: {
            container: (string[] | {
                list: string;
            }[] | {
                script: string;
            }[] | {
                indent: string;
            }[] | {
                header: (number | boolean)[];
            }[] | {
                color: never[];
            }[] | {
                align: never[];
            }[])[];
            handlers: {
                image: (e: any, f: any) => Promise<void>;
            };
        };
    };
    imageHandler(e: any, f: any): Promise<void>;
    render(): JSX.Element;
}
export {};
