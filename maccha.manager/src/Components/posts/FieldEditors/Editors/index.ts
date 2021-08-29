import { Editor } from "./Editor";

import { TextareaEditor } from "./Area";
import { ImageEditor } from "./Image";
import { PhotoGalleryEditor } from "./PhotoGallery";
import { RichEditor } from "./Rich";
import { SelectEditor } from "./Select";
import { SwitchEditor } from "./Switch";
import { TextFieldEditor } from "./Text";

export const editors: { [key: string]: Editor } = {
    "text-area": TextareaEditor,
    "image": ImageEditor,
    "photo-gallery": PhotoGalleryEditor,
    "rich-editor": RichEditor,
    "select": SelectEditor,
    "switch": SwitchEditor,
    "text-field": TextFieldEditor
};