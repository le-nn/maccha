import React, { useState } from "react";
import { showDialogAsync, DialogContentProp } from "../../commons/showDialog";
import { Box, Typography, Button, TextField, useTheme, Fade } from "@material-ui/core";
import { Scheme, SchemeType, schemeTypeDisplayNames } from "../../../Models/Contents/Entities/Scheme";
import { SchemeEditor } from "../FieldEditors/SchemeEditor";

export default function FieldTypeEditDialog(props: DialogContentProp<Scheme, Scheme | null>) {
    const [scheme, setScheme] = useState(props.context);
    const theme = useTheme();
    const [isChanged, setIsChanged] = useState(false);

    function handleClick(key: SchemeType) {
        setScheme(scheme.clone({
            type: key
        }));
    }

    return (
        <Box display="flex" >
            <Box style={{ background: "rgb(240,240,240)" }}>
                <Box width="240px" p={2}>
                    {
                        Object.keys(schemeTypeDisplayNames).map(key => (
                            <Box p={1}>
                                <Button
                                    fullWidth
                                    color="primary"
                                    variant={key === scheme.type ? "contained" : "text"}
                                    onClick={() => handleClick(key as SchemeType)}
                                >
                                    {schemeTypeDisplayNames[key]}
                                </Button>
                            </Box>
                        ))
                    }
                </Box>
            </Box>
            <Fade key={scheme.type} timeout={800} in={true}>
                <Box flex="1 1 auto" display="flex" flexDirection="column" >
                    <SchemeEditor scheme={scheme} onChange={e => {
                        setScheme(e);
                        setIsChanged(true);
                    }} />
                    <Box p={2} width="100%" display="flex">
                        <Box ml="auto" />
                        <Button color="primary" variant="text" onClick={() => props.onClose(null)}>Cancel</Button>
                        <Box ml={1} />
                        <Button
                            disabled={!(scheme.name && scheme.displayName) || !isChanged}
                            color="primary"
                            variant="contained"
                            onClick={() => props.onClose(scheme)}
                        >Ok</Button>
                    </Box>
                </Box>
            </Fade>
        </Box>
    );
}

export async function showFieldTypeEditDialogAsync(params: Scheme) {
    return await showDialogAsync(FieldTypeEditDialog, params, {
        maxWidth: "lg"
    });
}