import React, { useRef } from "react";
import "./style.scss";

import ReactQuill from "react-quill";

interface RitchEditorProps {
    content: string;
    contentChanged: (e: string) => void;
    uploadImageHandler: () => Promise<string | null>;
}

const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],        // toggled buttons
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],      // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }],          // outdent/indent
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }],          // dropdown with defaults from theme
    ["image"],
    [{ align: [] }],
    ["clean"]                                         // remove formatting button
];

export class RitchEditor extends React.Component<RitchEditorProps> {
    quillRef: any = null;

    module = {
        toolbar: {
            container: toolbarOptions,
            handlers: {
                image: this.imageHandler.bind(this)
            }
        },
    }

    async imageHandler(e: any, f: any) {
        const quill = this.quillRef?.getEditor();
        if (!quill) {
            return;
        }
        const range = quill.getSelection(true);
        const image = await this.props.uploadImageHandler();

        if (image) {
            quill.insertEmbed(range.index, "image", image);
        }
    }

    render() {
        return (
            <ReactQuill
                ref={el => {
                    this.quillRef = el;
                }}
                value={this.props.content}
                theme="snow"
                modules={this.module}
                onChange={e => this.props.contentChanged(e)}
            />
        );
    }
}