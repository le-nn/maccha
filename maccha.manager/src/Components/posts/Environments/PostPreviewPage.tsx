import React, { useEffect, useState, ReactComponentElement, cloneElement } from "react";
import {
    Tabs, Tab, Divider,
    Icon,
    TextField, Box, Typography, Button, Select, Fab
} from "@material-ui/core";
import { Post } from "../../../Models/posts/entities/Post";
import SwipeableViews from "react-swipeable-views";
import { services } from "../../../Services";
import { Observer, useObserver } from "mobx-react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { PostEditOptionPanel } from "../Ecosystems/PostEditOptionPanel";
import { RitchEditor } from "../../commons/Editor/RitchEditor";
import { PostPreviewPanel } from "../Ecosystems/PostPreviewPanel";

import "./style.scss";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

export default function PostPreviewPage() {
    const { postEditService, postManagementsService } = services;
    const match = useRouteMatch<any>();
    const hisptory = useHistory();

    function handleEdit() {
        const content = postEditService.content;
        if (content || postEditService.taxonomy) {
            hisptory.push(`/posts/${postEditService.taxonomy}/${content?.contentId}/edit`);
        }
    }

    useEffect(() => {
        postEditService.clear();
        postEditService.fetchAsync(match.params.taxonomy, match.params.contentId);
        postManagementsService.fetchPostTypes(match.params.taxonomy);
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
                            ><Icon>edit</Icon></Fab>
                        </Box >
                    );
                }
            }
        </Observer>
    );
}