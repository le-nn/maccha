import React, { useEffect } from "react";
import {
    Box,
    Fab
} from "@mui/material";
import { services } from "../../../Services";
import { Observer } from "mobx-react";
import { PostPreviewPanel } from "../Ecosystems/PostPreviewPanel";
import { useParams } from "@reach/router";

import "./style.scss";
import { useAppNavigate } from "Libs/Routing/RouterConfig";
import { Edit } from "@mui/icons-material";

export default () => {
    const { postEditService, postManagementsService } = services;
    const match = useParams<any>();
    const hisptory = useAppNavigate();

    function handleEdit() {
        const content = postEditService.content;
        if (content || postEditService.taxonomy) {
            hisptory(`/posts/${postEditService.taxonomy}/${content?.contentId}/edit`);
        }
    }

    useEffect(() => {
        postEditService.clear();
        postEditService.fetchAsync(match.taxonomy, match.contentId);
        postManagementsService.fetchPostTypes(match.taxonomy);
    }, []);

    return (
        <Observer>
            {
                () => {
                    return (
                        <Box
                            overflow="auto"
                            height="100%"
                            display="flex"
                            flexDirection="column"
                            position="relative"
                            alignItems="center"
                            width="100%"
                        >
                            <PostPreviewPanel />
                            <Fab color="primary"
                                onClick={() => handleEdit()} style={{ right: "40px", bottom: "40px", position: "fixed" }}
                            >
                                <Edit />
                            </Fab>
                        </Box >
                    );
                }
            }
        </Observer>
    );
};