import React, { useEffect } from "react";
import {
    Divider,
    Box, Typography
} from "@mui/material";
import { services } from "../../../Services";
import { Observer } from "mobx-react";
import { PostEditOptionPanel } from "../Ecosystems/PostEditOptionPanel";
import { FieldEditor } from "../FieldEditors/FieldEditor";
import "./style.scss";
import { Field } from "../../../Models/Domain/Contents/Entities/Field";
import { useParams } from "@reach/router";

export default function PostEditPage() {
    const { postEditService } = services;
    const match = useParams<any>();

    useEffect(() => {
        setTimeout(async () => {
            postEditService.clear();
            await services.postManagementsService.fetchPostTypes(match.taxonomy);
            const postType = services.postManagementsService.selected;
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
                        postEditService.setContent(
                            content.clone({
                                fields,
                            })
                        );
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
                                services.postManagementsService.selected?.taxonomy.schemes.map(
                                    scheme => {
                                        const f = postEditService.content?.fields.find(s => s.schemeId === scheme.schemeId);
                                        if (!f) {
                                            return <Box key={scheme.schemeId} className="post" maxWidth="100%" width="780px" mt={2}>
                                                <Typography color="error">{scheme.name} - {scheme.displayName} の読み込みに失敗しました</Typography>
                                                <Box mt={2} />
                                                <Divider />
                                            </Box>;
                                        }

                                        return <Box key={scheme.schemeId} className="post" maxWidth="100%" width="780px" mt={2}>
                                            <Typography variant="h5" style={{ wordBreak: "break-all" }}>
                                                {scheme.name} - {scheme.displayName}
                                            </Typography>
                                            <Divider />
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
                        <Divider orientation="vertical" />
                        <Box p={2} minWidth="300px" maxWidth="300px" overflow="auto">
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