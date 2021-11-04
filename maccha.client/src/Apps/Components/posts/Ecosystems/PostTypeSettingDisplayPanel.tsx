import React from "react";
import {
    Box, Typography, List, ListItem, Paper, IconButton, Divider, Fab, Button
} from "@mui/material";
import { Edit as EditIcon, FileCopy } from "@mui/icons-material";
import { PostType } from "../../../Models/Domain/posts/entities/PostType";
import { schemeTypeDisplayNames } from "../../../Models/Domain/Contents/Entities/Scheme";
import { axios } from "Apps/Repositories/config";
import { FlexSpacer } from "../../commons";
import { useAppNavigate } from "Libs/Routing/RouterConfig";

interface PostTypeSettingPanelProps {
    postType: PostType;
}

export function PostTypeSettingPanel(props: PostTypeSettingPanelProps) {
    const { postType } = props;
    const history = useAppNavigate();

    function handleEdit() {
        history(`/posts/${postType.taxonomy.name}/edit`);
    }

    function copyToClipBoard(text: string) {
        navigator.clipboard?.writeText(text);
    }

    return (
        <Box p={2}>
            <Box display="flex" width="100%" alignItems="center">
                <Typography variant="h6">投稿設定</Typography>
                <Box flex="1 1 auto" />
                <IconButton color="primary" onClick={handleEdit}>
                    <EditIcon />
                </IconButton>
            </Box>

            <Divider />

            <Box mt={1}>
                <Box display="flex">
                    <Typography variant="overline" color="textSecondary">エンドポイント</Typography>
                    <FlexSpacer />
                    <IconButton color="primary" size="small" onClick={_ => copyToClipBoard(`${axios.defaults.baseURL}contents/${props.postType.taxonomy.name}`)}>
                        <FileCopy fontSize="small" />
                    </IconButton>
                </Box>
                <Typography style={{ wordBreak: "break-all" }}>{axios.defaults.baseURL}contents/{props.postType.taxonomy.name}</Typography>
            </Box>

            <Box mt={1}>
                <Typography variant="overline" color="textSecondary">名称</Typography>
                <Typography noWrap>{postType.taxonomy.name}</Typography>
            </Box>

            <Box mt={1}>
                <Typography variant="overline" color="textSecondary">表示名</Typography>
                <Typography noWrap>{postType.taxonomy.displayName}</Typography>
            </Box>

            <Box mt={1}>
                <Typography variant="overline" color="textSecondary">備考</Typography>
                <Typography noWrap>{postType.taxonomy.description}</Typography>
            </Box>

            <Box mt={1}>
                <Typography variant="overline" color="textSecondary">スキーム</Typography>
                <Divider />
                {
                    postType.taxonomy.schemes.length ?
                        <List>
                            {
                                postType.taxonomy.schemes.map(
                                    s => (
                                        <Box mb={1} key={s.schemeId}>
                                            <Box>
                                                <Typography variant="body2" style={{ fontSize: "12px" }} color="textSecondary" noWrap>{s.name ? s.name : "　"}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" style={{ fontSize: "12px" }} color="textSecondary" noWrap>{s.displayName ? s.displayName : "　"}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography color="primary" variant="subtitle2" noWrap>{schemeTypeDisplayNames[s.type] ?? "　"}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography style={{ fontSize: "11px" }} variant="caption" color="textSecondary">{s.description}</Typography>
                                            </Box>
                                            <Box mt={1} />
                                            <Divider />
                                        </Box>
                                    )
                                )
                            }
                        </List>
                        :
                        <Typography color="textSecondary" variant="caption">
                            スキームがありません
                        </Typography>
                }
            </Box>
        </Box >
    );
}