import React, { useEffect, useState, ReactComponentElement, cloneElement } from "react";
import { render, unmountComponentAtNode, } from "react-dom";
import { Observer, useObserver } from "mobx-react";
import { services } from "../../../Services";
import {
    List,
    makeStyles,
    ListItem,
    ListItemIcon,
    Checkbox, Box, InputBase, useTheme, Button, ListItemText,
    Tabs, Tab,
    Icon,
    Divider,
    Menu,
    Fade,
    MenuItem,
    Slide,
    IconButton,
    Grow,
    Fab,
    Typography
} from "@material-ui/core";
import {
    Search,
    Add,
    MoreVert
} from "@material-ui/icons";
import { PostTypeSettingPanel } from "../Ecosystems/PostTypeSettingDisplayPanel";
import ProfileImage from "../../commons/ProfileImage";
import { IUser } from "../../../Models/users/user.interface";
import { User } from "../../../Models/users/user";
import { RoleType, displayRoles } from "../../../Models";
import SwipeableViews from "react-swipeable-views";
import { theme } from "../../../theme";
import { PostType } from "../../../Models/posts/entities/PostType";
import PostListPanel from "../Ecosystems/PostListPanel";
import { useHistory, useRouteMatch, Route } from "react-router-dom";
import { confirmDeletePostTypeAsync } from "../Ecosystems/confirmRemovePostTypeDialog";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
            style={{ height: "100%" }}
        >
            {value === index && (
                <Box height="100%" p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default function PostsPage() {
    const classes = useStyles();
    const routeMatch = useRouteMatch<{ taxonomy: string; }>();
    const history = useHistory();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const [postTypeContext, setPostTypeContext] = useState<PostType | null>(null);

    useEffect(() => {
        services.postManagementsService.fetchPostTypes().then(() => {
            const selected = services.postManagementsService.selected;
            if (selected) {
                if (!routeMatch.params.taxonomy) {
                    history.replace(`/posts/${selected.taxonomy.name}`);
                }
                else {
                    services.postManagementsService.selectFromName(routeMatch.params.taxonomy);
                }
            }
        });
    }, [history, routeMatch]);

    const handleNewPost = () => {
        const selected = services.postManagementsService.selected;
        if (selected) {
            history.push(`/posts/${selected.taxonomy.name}/new/edit`);
        }
    };

    const onAddPostTypeClicked = async () => {
        history.push("/posts/new/edit");
    };

    function onEditClicked() {
        if (postTypeContext) {
            history.push(`/posts/${postTypeContext.taxonomy.name}/edit`);
        }
    }

    const onPostTypeListClicked = (index: number) => {
        services.postManagementsService.selectFromIndex(index);
        const selected = services.postManagementsService.selected;
        if (selected) {
            setTimeout(() => history.replace(`/posts/${selected.taxonomy.name}`), 10);
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
                            overflow="auto" >
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
                                <Icon>add</Icon>
                                投稿タイプを追加
                            </Button>
                            <List component="nav" className={classes.postTypeBar} aria-label="contacts">
                                {
                                    postManagementsService.postTypes.map(
                                        (t, i) => (
                                            <ListItem key={t.taxonomy.name} button className={postManagementsService.selected?.taxonomy.name === t.taxonomy.name ? classes.activeItem : ""}
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
}

const useStyles = makeStyles({
    postTypeBar: {
        width: "100%",
        flex: "1 1 auto",
    },
    container: {
        height: "100%"
    },
    activeItem: {
        background: theme.palette.primary.main + "!important",
    }
});