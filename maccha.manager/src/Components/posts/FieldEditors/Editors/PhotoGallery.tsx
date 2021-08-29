import React, { useState } from "react";
import { PhotoGridView } from "../../../commons";
import { FieldEditorProps } from "./../FieldEditorProps";
import { confirmAsync } from "../../../commons/confirmAsync";
import { showMultipleMediaSelectionDialogAsync } from "../../Ecosystems/MediaSelectionDialog";
import { Box, IconButton } from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";
import { SchemeType } from "../../../../Models/Contents/Entities/Scheme";
import { Editor } from "./Editor";
import { axios } from "../../../../Repositories/config";

export const PhotoGalleryEditor: Editor = {
    fieldEditor: PhotoGallery,
    schemeEditor: () => <></>,
    type: "photo-gallery" as SchemeType,
    name: "フォトギャラリー",
    description: "画像の一覧用のフィールドです。APIからは画像URLが返却されます。"
};

export function PhotoGallery(props: FieldEditorProps) {
    const [selected, setSelected] = useState<string[]>([]);

    async function addMedia() {
        const path = await showMultipleMediaSelectionDialogAsync();
        props.onChange(props.field.field.clone({
            value: props.field.field.value + "," + path
        }));
    }

    async function removeSelected() {
        if (await confirmAsync(`${selected.length}件のアイテムを削除しますか？`)) {
            props.onChange(props.field.field.clone({
                value: props.field.field.value.split(",").filter(p => !selected.includes(p)).join(",")
            }));
            setSelected([]);
        }
    }

    return (
        <Box>
            <Box display="flex">
                <IconButton
                    disabled={!selected.length}
                    color="primary"
                    size="small"
                    style={{ marginLeft: "auto" }}
                    onClick={() => removeSelected()}
                >
                    <Delete />
                </IconButton>
                <IconButton
                    disabled={!!selected.length}
                    color="primary"
                    size="small"
                    onClick={() => addMedia()}
                >
                    <Add />
                </IconButton>
            </Box>

            <Box
                height="368px"
                width="100%"
                mt={1}
                overflow="hidden"
                style={{
                    overflowY: "auto",
                    position: "relative",
                    borderRadius: "2px",
                    background: "rgba(127,127,127,0.09)",
                }}
            >
                <PhotoGridView
                    disableInvok
                    hideCheckbox
                    itemHeight={90}
                    span={1}
                    images={props.field.field.value.split(",").filter(x => !!x)}
                    selected={selected}
                    baseUrl={axios.defaults.baseURL}
                    multiSelect
                    selectionChanged={e => setSelected(e)}
                ></PhotoGridView>
            </Box>
        </Box>
    );
}