import React, { useState } from "react";
import {
    Box,
    Divider,
    IconButton,
    MenuItem,
    Select, Paper,
    Typography
} from "@mui/material";
import { FlexSpacer, ValidationTextField } from "../../commons";
import { PostType } from "../../../Models/Domain/posts/entities/PostType";
import { Taxonomy } from "../../../Models/Domain/Contents/Entities/Taxonomy";
import { axios } from "../../../Repositories/config";
import { FileCopy } from "@mui/icons-material";
import { css } from "@emotion/react";
import { useObserver } from "memento.react";
import { AuthStore } from "Apps/Models/Stores/Auth/AuthStore";

interface PostTypeBasicSettingPanelProps {
    postType: PostType;
    onChange: (postType: PostType) => void;
}

export function PostTypeBasicSettingPanel(props: PostTypeBasicSettingPanelProps) {
    const auth = useObserver(AuthStore);

    function handlePostTypeParamsChanged(key: keyof Taxonomy, value: unknown) {
        props.onChange(
            props.postType.clone({
                taxonomy: props.postType.taxonomy.clone({ [key]: value })
            })
        );
    }

    function copyToClipBoard(text: string) {
        navigator.clipboard?.writeText(text);
    }

    const contentUrl = `${axios.defaults.baseURL}public/${auth.loginInfo?.identifier}/contents/${props.postType.taxonomy.name}`;

    return (
        <Box p={1} mt={2}>
            <Paper
                sx={{
                    p: { xs: 2, sm: 4, md: 5 },
                    borderRadius: "20px"
                }}
                elevation={6}
            >

                <Typography variant="h6" >タクソノミー</Typography>
                <Typography color="textSecondary" variant="caption" >
                    クソノミーとは、コンテンツを分類するための概念です。「ブログ」、「お知らせ」、「レビュー」などのように目的に応じてコンテンツを分類することができます。
                </Typography>

                <Box
                    mt={2}
                    display="flex"
                    alignItems="center"
                    width="100%"
                    maxWidth="960px"
                >
                    <Typography variant="subtitle1" css={itemTitle}>タクソノミー名</Typography>
                    <ValidationTextField
                        required
                        placeholder="例：blogs"
                        value={props.postType.taxonomy.name}
                        style={{ marginTop: "16px" }}
                        rules={/^[A-Za-z0-9-_]*$/}
                        fullWidth
                        helperText="APIのエンドポイントになります"
                        errorText="英数字および-_のみ"
                        textChanged={(e: any) => handlePostTypeParamsChanged("name", e.value)}
                    />
                </Box>

                <Box
                    mt={4}
                    display="flex"
                    alignItems="center"
                    width="100%"
                    maxWidth="960px"
                >
                    <Typography variant="subtitle1" css={itemTitle}>エンドポイント名</Typography>
                    <Typography style={{ width: "100%", maxWidth: "100%", wordBreak: "break-all" }} >
                        {contentUrl}
                    </Typography>
                    <FlexSpacer />
                    <IconButton color="primary" size="small" onClick={_ => copyToClipBoard(contentUrl)}>
                        <FileCopy fontSize="small" />
                    </IconButton>
                </Box>

                <Box
                    mt={3}
                    display="flex"
                    alignItems="center"
                    width="100%"
                    maxWidth="960px"
                >
                    <Typography variant="subtitle1" css={itemTitle}>表示名</Typography>
                    <ValidationTextField
                        required
                        value={props.postType.taxonomy.displayName}
                        style={{ marginTop: "16px" }}
                        placeholder="例：ブログ"
                        helperText="入稿画面に表示する名称です。入稿者にとってわかりやすい説明を入力しましょう。"
                        fullWidth
                        textChanged={(e: any) => handlePostTypeParamsChanged("displayName", e.value)}
                    />
                </Box>

                <Box
                    mt={3}
                    display="flex"
                    alignItems="center"
                    width="100%"
                    maxWidth="960px"
                >
                    <Typography variant="subtitle1" css={itemTitle}>備考</Typography>
                    <ValidationTextField
                        fullWidth
                        style={{ marginTop: "24px" }}
                        multiline
                        variant="filled"
                        placeholder="例：ブログの投稿です。"
                        rows={4}
                        helperText="入稿画面に表示する説明文です。入稿者にとってわかりやすい説明を入力しましょう。"
                        value={props.postType.taxonomy.description}
                        textChanged={(e: any) => handlePostTypeParamsChanged("description", e.value)}
                    />
                </Box>

                <Box
                    mt={3}
                    display="flex"
                    alignItems="center"
                    width="100%"
                    maxWidth="960px"
                >
                    <Typography variant="subtitle1" css={itemTitle}>表示形式</Typography>
                    <Box width="100%">
                        <Select
                            value={props.postType.displayFormat}
                            fullWidth onChange={e => props.onChange(
                                props.postType.clone({ displayFormat: e.target.value as string })
                            )}
                        >
                            <MenuItem value="card">カード</MenuItem>
                            <MenuItem value="table">テーブル</MenuItem>
                        </Select>
                        <Box mt={1} />
                        <Typography color="textSecondary" variant="caption">一覧表示の際の表示形式</Typography>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}

const itemTitle = css({
    width: "320px"
});