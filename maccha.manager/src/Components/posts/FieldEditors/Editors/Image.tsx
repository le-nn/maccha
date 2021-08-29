import { Box, Button } from "@material-ui/core";
import React from "react";
import { SchemeType } from "../../../../Models/Contents/Entities/Scheme";
import { FieldEditorProps } from "./../FieldEditorProps";
import { Editor } from "./Editor";
import { showMediaSelectionDialog } from "../../Ecosystems/MediaSelectionDialog";
import { showDialogAsync } from "../../../commons/showDialog";
import { axios } from "../../../../Repositories/config";

export const ImageEditor: Editor = {
    fieldEditor: Image,
    schemeEditor: () => <></>,
    type: "image" as SchemeType,
    name: "画像",
    description: "画像用のフィールドです。APIからは画像URLが返却されます。"
};

function Image(props: FieldEditorProps) {
    function handleChange(imageUrl: string) {
        props.onChange(props.field.field.clone({
            value: imageUrl
        }));
    }

    async function selectAsync() {
        const url = await showMediaSelectionDialog();
        handleChange(url);
    }

    return (
        <>
            <Box display="flex" justifyContent="center" flexDirection="column">
                {
                    !props.field.field.value ?
                        <Box mt={2} mx={2} display="flex" flexDirection="column" alignItems="center">
                            <Button
                                style={{ marginTop: "8px" }}
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    selectAsync();
                                }}
                            >
                                画像を選択
                            </Button>
                        </Box>
                        :
                        <img
                            alt="preview"
                            height="280"
                            src={axios.defaults.baseURL + props.field.field.value}
                            style={{ width: "100%", objectFit: "cover" }}
                        >
                        </img>
                }

                <Box mt={2} display="flex">
                    {
                        props.field.field.value && <Button
                            color="primary"
                            onClick={() => {
                                handleChange("");
                            }}
                        >
                            Clear
                        </Button>
                    }
                </Box>
            </Box>
        </>
    );
}