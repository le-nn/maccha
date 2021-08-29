import React, { useState } from "react";
import {
    Box,
    Divider,
    IconButton,
    makeStyles,
    MenuItem,
    Select,
    Typography
} from "@material-ui/core";
import { FlexSpacer, ValidationTextField } from "../../commons";
import { PostType } from "../../../Models/posts/entities/PostType";
import { Taxonomy } from "../../../Models/Contents/Entities/Taxonomy";
import { axios } from "../../../Repositories/config";
import { FileCopy } from "@material-ui/icons";

interface PostTypeBasicSettingPanelProps {
    postType: PostType;
    onChange: (postType: PostType) => void;
}

export function PostTypeBasicSettingPanel(props: PostTypeBasicSettingPanelProps) {
    const styles = useStyles();

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

    return (
        <>
            <Box
                mt={3}
                maxWidth="960px"
                width="100%"
            >
                <Typography variant="h6" >タクソノミー</Typography>
                <Typography color="textSecondary" variant="caption" >
                    クソノミーとは、コンテンツを分類するための概念です。「ブログ」、「お知らせ」、「レビュー」などのように目的に応じてコンテンツを分類することができます。
                </Typography>
            </Box>

            <Box
                mt={2}
                display="flex"
                alignItems="center"
                width="100%"
                maxWidth="960px"
            >
                <Typography variant="subtitle1" className={styles.itemTitle}>タクソノミー名</Typography>
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
                <Typography variant="subtitle1" className={styles.itemTitle}>エンドポイント名</Typography>
                <Typography style={{ width: "100%", maxWidth: "100%", wordBreak: "break-all" }} >
                    {axios.defaults.baseURL}contents/{props.postType.taxonomy.name}
                </Typography>
                <FlexSpacer />
                <IconButton color="primary" size="small" onClick={_ => copyToClipBoard(`${axios.defaults.baseURL}contents/${props.postType.taxonomy.name}`)}>
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
                <Typography variant="subtitle1" className={styles.itemTitle}>表示名</Typography>
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
                <Typography variant="subtitle1" className={styles.itemTitle}>備考</Typography>
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
                <Typography variant="subtitle1" className={styles.itemTitle}>表示形式</Typography>
                <Box width="100%">
                    <Select value={props.postType.displayFormat} fullWidth onChange={e => props.onChange(
                        props.postType.clone({ displayFormat: e.target.value as string })
                    )}>
                        <MenuItem value="table">テーブル</MenuItem>
                        <MenuItem value="card">カード</MenuItem>
                    </Select>
                    <Box mt={1} />
                    <Typography color="textSecondary" variant="caption">一覧表示の際の表示形式</Typography>
                </Box>
            </Box>
        </>
    );
}

const useStyles = makeStyles({
    itemTitle: {
        width: "320px"
    }
});