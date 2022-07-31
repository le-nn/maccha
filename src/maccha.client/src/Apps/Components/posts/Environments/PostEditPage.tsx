import React, { useEffect } from "react";
import {
    Divider,
    Box, Typography, useTheme
} from "@mui/material";
import { services } from "../../../Services";
import { Observer } from "mobx-react";
import { PostEditOptionPanel } from "../Ecosystems/PostEditOptionPanel";
import { FieldEditor } from "../FieldEditors/FieldEditor";
import "./style.scss";
import { Field } from "../../../Models/Domain/Contents/Entities/Field";
import { useParams } from "@reach/router";
import { EmptyItemsPanel } from "Apps/Components/commons/EmptyItemsPanel";
import { useTranslation } from "react-i18next";
import { useDispatch, useObserver, useStateRef } from "memento.react";
import { PostTypeCollectionStore } from "Apps/Models/Stores/Posts/PostTypeCollectionStore";

export default function PostEditPage() {
    const { postEditService } = services;
    const match = useParams<any>();
    const theme = useTheme();
    const { t } = useTranslation();
    const postTypeDispatch = useDispatch(PostTypeCollectionStore);
    const postTypeState = useObserver(PostTypeCollectionStore);
    const postTypeStateRef = useStateRef(PostTypeCollectionStore);

    useEffect(() => {
        setTimeout(async () => {
            postEditService.clear();
            await postTypeDispatch(s => s.fetchPostTypes(match.taxonomy));
            const postType = postTypeStateRef.state.selected;
            if (!postType) {
                return;
            }

            if (match.taxonomy && match.contentId && match.contentId === "new") {
                postEditService.initializeAsNewPost(postType.taxonomy);
            }
            else {
                postEditService.fetchAsync(match.taxonomy, match.contentId);
            }
        });
    }, []);

    return <Observer>
        {
            () => {
                function handleChangeField(f: Field) {
                    const content = postEditService.content;
                    if (content) {
                        const _f = content.fields.find(x => x.schemeId === f.schemeId);
                        if (!_f) return;

                        const i = content.fields.indexOf(_f);
                        const fields = content.fields;
                        fields[i] = f;
                        postEditService.setContent({
                            ...content,
                            fields,
                        });
                    }
                }

                return postEditService.content && (
                    <Box
                        display="flex"
                        position="relative"
                        height="100%"
                    >
                        <Box
                            p={2}
                            flex={"1 1 auto"}
                            overflow="hidden"
                            height="100%"
                            style={{ overflowY: "auto" }}
                            display="flex"
                            alignItems="center"
                            flexDirection="column"
                        >
                            {
                                postTypeState.selected?.taxonomy.schemes.length === 0
                                    ? <EmptyItemsPanel
                                        message={t("スキームが存在しません")}
                                    />
                                    : postTypeState.selected?.taxonomy.schemes.map(
                                        scheme => {
                                            const f = postEditService.content?.fields.find(s => s.schemeId === scheme.schemeId);
                                            if (!f) {
                                                return <Box key={scheme.schemeId} className="post" maxWidth="100%" width="780px" mt={2}>
                                                    <Typography color="error">{scheme.name} - {scheme.displayName} の読み込みに失敗しました</Typography>
                                                    <Box mt={2} />
                                                    <Divider />
                                                </Box>;
                                            }

                                            return <Box
                                                p={{ xs: 2, sm: 3, md: 4 }}
                                                mt={{ xs: 2, sm: 3, md: 4 }}
                                                sx={{ boxShadow: theme.shadows[6] }}
                                                bgcolor={theme.palette.background.paper}
                                                borderRadius="28px"
                                                key={scheme.schemeId}
                                                className="post"
                                                maxWidth="100%"
                                                width="780px"
                                            >
                                                <Typography variant="h5" style={{ wordBreak: "break-all" }}>
                                                    {scheme.name} - {scheme.displayName}
                                                </Typography>
                                                <Divider sx={{ mt: 2 }} />
                                                <Box mt={2} />
                                                <Typography color="textSecondary" variant="caption">
                                                    {scheme.description}
                                                </Typography>
                                                <Box mt={2} />
                                                <FieldEditor
                                                    onChange={e => handleChangeField(e)}
                                                    field={{
                                                        field: f,
                                                        scheme
                                                    }}
                                                />
                                                <Box mt={4} />
                                            </Box>;
                                        }
                                    )
                            }
                        </Box>
                        <Box sx={{ boxShadow: theme.shadows[6] }}
                            bgcolor={theme.palette.background.paper}
                            p={2} minWidth="380px" maxWidth="380px" overflow="auto">
                            <PostEditOptionPanel
                                contentEditContext={postEditService.content}
                            />
                        </Box>
                    </Box>
                );
            }
        }
    </Observer>;
}