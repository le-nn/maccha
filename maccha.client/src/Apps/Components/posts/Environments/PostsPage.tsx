import React, { useEffect, useState } from "react";
import { Observer } from "mobx-react";
import { services } from "../../../Services";
import {
    List,
    ListItem,
    Box,
    Button,
    ListItemText,
    Icon,
    Divider,
    Menu,
    MenuItem,
    IconButton,
    Fab,
    Typography,
    useTheme
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
    Search,
    Add,
    MoreVert
} from "@mui/icons-material";
import { PostTypeSettingPanel } from "../Ecosystems/PostTypeSettingDisplayPanel";
import ProfileImage from "../../commons/ProfileImage";
import { RoleType } from "../../../Models";
import { lightTheme } from "Apps/theme";
import { PostType } from "../../../Models/posts/entities/PostType";
import PostListPanel from "../Ecosystems/PostListPanel";
import { confirmDeletePostTypeAsync } from "../Ecosystems/confirmRemovePostTypeDialog";
import { useAppLocation, useAppNavigate } from "Libs/Routing/RouterConfig";
import { useParams } from "@reach/router";
import { css } from "@mui/styled-engine";

export default () => {
    const history = useAppNavigate();
    const location = useAppLocation();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const [postTypeContext, setPostTypeContext] = useState<PostType | null>(null);
    const theme = useTheme();
    const routeMatch = useParams() ?? {};

    useEffect(() => {
        const selected = services.postManagementsService.selected;
        if (selected) {
            if (!routeMatch.taxonomy) {
                window.history.replaceState("", "", `${location.pathname}/${selected.taxonomy.name}`);
            }
            else {
                services.postManagementsService.selectFromName(routeMatch.taxonomy);
            }
        }
    }, []);

    const handleNewPost = () => {
        const selected = services.postManagementsService.selected;
        if (selected) {
            history(`/posts/${selected.taxonomy.name}/new/edit`);
        }
    };

    const onAddPostTypeClicked = async () => {
        history("/posts/new/edit");
    };

    function onEditClicked() {
        if (postTypeContext) {
            history(`/posts/${postTypeContext.taxonomy.name}/edit`);
        }
    }

    const onPostTypeListClicked = (index: number) => {
        services.postManagementsService.selectFromIndex(index);
        const selected = services.postManagementsService.selected;
        if (selected) {
            setTimeout(() => history(`/posts/${selected.taxonomy.name}`), 10);
        }
        console.log(selected);
    };

    const onPostTypeMenu = (event: React.MouseEvent<HTMLElement>, postType: PostType) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
        setPostTypeContext(postType);
    };

    const onRemovePostTypeClicked = async () => {
        handleCloseMenu();

        if (!postTypeContext) {
            return;
        }

        if (await confirmDeletePostTypeAsync(`${postTypeContext.taxonomy.displayName}を本当に削除しますか？`)) {
            await services.postManagementsService.removeAsync(postTypeContext.postTypeId);
            console.log(services.postManagementsService.postTypes);
        }
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return <Observer>
        {
            (() => {
                const { postManagementsService, authService } = services;
                if (!authService.loginInfo.identifier) {
                    return (
                        <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
                            <Typography variant="h5" style={{ color: theme.palette.error.main }}>
                                WEBサイトを選択してください
                            </Typography>
                        </Box>
                    );
                }

                return (
                    <Box height="100%" display="flex">
                        <Box p={0}
                            width="200px"
                            minWidth="200px"
                            maxWidth="200px"
                            overflow="auto"
                        >
                            <Button
                                disabled={!(authService.loginInfo.role >= RoleType.Edit)}
                                onClick={onAddPostTypeClicked}
                                color="primary"
                                variant="contained"
                                style={{
                                    borderRadius: "18px",
                                    margin: "8px", marginTop: "16px"
                                }}
                            >
                                <Add />
                                投稿タイプを追加
                            </Button>
                            <List component="nav" css={postTypeBar} aria-label="contacts">
                                {
                                    postManagementsService.postTypes.map(
                                        (t, i) => (
                                            <ListItem
                                                key={t.taxonomy.name}
                                                button
                                                css={postManagementsService.selected?.taxonomy.name === t.taxonomy.name ? activeItem : ""}
                                                onClick={() => onPostTypeListClicked(i)} >
                                                <ListItemText primary={t.taxonomy.displayName} />
                                                {
                                                    authService.loginInfo.role >= RoleType.Edit && (
                                                        <IconButton
                                                            size="small"
                                                            onClick={e => onPostTypeMenu(e, t)}
                                                        >
                                                            <MoreVert />
                                                        </IconButton>
                                                    )
                                                }
                                            </ListItem>
                                        )
                                    )
                                }
                            </List>

                            <Menu
                                id="long-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={!!anchorEl}
                                onClose={handleCloseMenu}
                                PaperProps={{
                                    style: {
                                        maxHeight: 48 * 4.5,
                                        width: "20ch",
                                    },
                                }}
                            >
                                <MenuItem onClick={() => onEditClicked()}>
                                    編集
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={onRemovePostTypeClicked}>
                                    削除
                                </MenuItem>
                            </Menu>
                        </Box >

                        <Divider orientation="vertical" />

                        <Box
                            flex="1 1 auto"
                            position="relative"
                            overflow="hidden"
                            height="100%"
                        >
                            <PostListPanel />
                            <Fab
                                disabled={!services.postManagementsService.selected || !(authService.loginInfo.role >= RoleType.Post)}
                                style={{
                                    position: "absolute",
                                    zIndex: 9999,
                                    right: "24px",
                                    bottom: "24px"
                                }}
                                onClick={() => handleNewPost()}
                                color="primary">
                                <Add />
                            </Fab>
                        </Box>

                        <Divider orientation="vertical" />

                        <Box minWidth="220px" maxWidth="220px" height="100%" overflow="auto">
                            {services.postManagementsService.selected &&
                                <PostTypeSettingPanel postType={services.postManagementsService.selected} />
                            }
                        </Box>
                    </Box >
                );
            })
        }
    </Observer>;
};

const postTypeBar = css({
    width: "100%",
    flex: "1 1 auto",
});
const container = css({
    height: "100%"
});
const activeItem = css({
    background: lightTheme.palette.primary.main + "!important",
});

