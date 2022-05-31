import { Box, IconButton, TextField, Typography } from "@mui/material";
import { Clear, Edit, Save } from "@mui/icons-material";
import React, { useState } from "react";
import { Spacer } from "./Spacer";

interface EditableTextProps {
    onChange: (v: string) => void;
    value: string;
    label?: string;
    helperText?: string;
}

export const EditableText = (props: EditableTextProps) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [text, setText] = useState(props.value);

    return (
        <Box display="flex" alignItems="center" width="100%">
            {!isEditMode ?
                <>
                    <Box>
                        <Typography variant="caption" color="textSecondary">{props.label}</Typography>
                        <Typography>{props.value}</Typography>
                        <Typography variant="caption" color="textSecondary">{props.helperText}</Typography>
                    </Box>
                    <Spacer />
                    <IconButton onClick={_ => setIsEditMode(true)}>
                        <Edit />
                    </IconButton>
                </>
                :
                <>
                    <TextField
                        helperText={props.helperText}
                        value={text}
                        label={props.label}
                        onChange={e => setText(e.target.value)}
                    ></TextField>
                    <Spacer />
                    <IconButton onClick={_ => {
                        setText(props.value);
                        setIsEditMode(false);
                    }}>
                        <Clear />
                    </IconButton>
                    <IconButton onClick={_ => {
                        props.onChange(text);
                        setIsEditMode(false);
                    }}>
                        <Save />
                    </IconButton>
                </>
            }
        </Box>
    );
};
