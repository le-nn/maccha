import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { services } from "../../../Services";
import {
    Box,
    Button,
    Typography
} from "@material-ui/core";
import {
    PostTypeBasicSettingPanel,
    SchemeSettingPanel
} from "../Ecosystems";
import { PostType } from "../../../Models/posts/entities/PostType";
import { Taxonomy } from "../../../Models/Contents/Entities/Taxonomy";
import { useHistory, useRouteMatch } from "react-router-dom";

export default observer(() => {
    const [postType, setPostType] = useState(new PostType({
        taxonomy: new Taxonomy({
            description: "",
            name: "",
            displayName: "",
            identifier: "",
            schemes: [],
            taxonomyId: ""
        })
    }));
    const [isNew, setIsNew] = useState(false);
    const [isChanged, setIsChanged] = useState(false);

    const taxonomyName = useRouteMatch<{ taxonomy: string }>();
    const history = useHistory();

    async function init() {
        await services.postManagementsService.fetchPostTypes();
        if (taxonomyName.params.taxonomy === "new") {
            setIsNew(true);
        }
        else {
            if (taxonomyName.params.taxonomy) {
                services.postManagementsService.selectFromName(taxonomyName.params.taxonomy);
            }

            if (services.postManagementsService.selected) {
                setPostType(services.postManagementsService.selected);
            }
        }
    }

    useEffect(() => {
        init();
    }, []);

    function handleCreate() {
        console.log(postType);
        if (isNew) {
            services.postManagementsService.createPostTypeAsync({
                taxonomy: postType.taxonomy,
                displayFormat: postType.displayFormat
            });
        }
        else {
            services.postManagementsService.savePostTypeAsync({
                postTypeId: postType.postTypeId,
                taxonomy: postType.taxonomy,
                displayFormat: postType.displayFormat
            });
        }
        history.push(`/posts/${services.postManagementsService.selected?.taxonomy.name}`);
    }

    return <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        height="100%"
        overflow="auto"
        p={3}
    >
        <Box
            mt={4}
            display="flex"
            alignItems="center"
            maxWidth="960px"
            width="100%"
        >
            <Typography variant="h4" >{isNew ? "投稿タイプを作成" : "投稿タイプを編集"}</Typography>
        </Box>

        <PostTypeBasicSettingPanel
            postType={postType} onChange={p => {
                setPostType(p);
                setIsChanged(true);
            }}
        />
        <SchemeSettingPanel
            postType={postType}
            onChange={p => {
                setPostType(p);
                setIsChanged(true);
            }}
        />

        <Box
            mt={4}
        >
            <Button
                disabled={!(postType.taxonomy.name && postType.taxonomy.displayName) || !isChanged}
                color="primary"
                onClick={() => handleCreate()}
                variant="contained"
            >{isNew ? "作成" : "保存"}</Button>
        </Box>
    </Box>;
});
