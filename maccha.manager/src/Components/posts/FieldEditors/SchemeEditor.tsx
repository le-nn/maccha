import React from "react";

import { SchemeEditorProps } from "./SchemeEditorProps";

import { SelectScheme } from "./Editors/Select";
import { Box, TextField, Typography } from "@material-ui/core";
import { Scheme } from "../../../Models/Contents/Entities/Scheme";
import { editors } from "./Editors";

export function SchemeEditor(props: SchemeEditorProps) {
    const { scheme } = props;

    const editor = editors[scheme.type];
    const Element = editor.schemeEditor;

    function handlePropertyChanged(key: keyof Scheme, value: unknown) {
        props.onChange(
            scheme.clone({
                [key]: value
            })
        );
    }

    if (Element) {
        return (
            <>
                <Box p={3}>
                    <Typography color="primary" >{editor.name}</Typography>
                    <Typography variant="caption" color="textSecondary" >{editor.description}</Typography>
                </Box>
                <Box flex="1 1 auto" p={2} overflow="auto" height="60vh" >
                    <Box p={1}>
                        <Typography noWrap>フィールド名</Typography>
                        <Box mt={1} />
                        <TextField
                            placeholder="例：title"
                            fullWidth
                            helperText="APIで取得する際のキー名になります"
                            value={scheme.name}
                            onChange={e => handlePropertyChanged("name", e.target.value)}
                        />
                    </Box>
                    <Box p={1}>
                        <Typography noWrap>表示名</Typography>
                        <Box mt={1} />
                        <TextField
                            placeholder="例：タイトル"
                            helperText="入稿画面に表示する名称です。入稿者にとってわかりやすい説明を入力しましょう。"
                            fullWidth
                            value={scheme.displayName}
                            onChange={e => handlePropertyChanged("displayName", e.target.value)}
                        />
                    </Box>
                    <Box p={1}>
                        <Element scheme={scheme} onChange={props.onChange}></Element>
                    </Box>
                    <Box p={1}>
                        <Typography noWrap>備考</Typography>
                        <Box mt={1} />
                        <TextField
                            fullWidth
                            multiline
                            rows="3"
                            placeholder="例：ブログのタイトルです。"
                            helperText="入稿画面に表示する説明文です。入稿者にとってわかりやすい説明を入力しましょう。"
                            value={scheme.description}
                            variant="filled"
                            onChange={e => handlePropertyChanged("description", e.target.value)}
                        />
                    </Box>
                </Box>
            </>
        );
    }

    return <></>;
}
