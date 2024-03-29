import React, { } from "react";
import {
    Box,
    Typography,
    Card,
    Avatar,
    Fab,
    useTheme
} from "@mui/material";
import { PostCardMenu } from "../Molecles";
import { WrappedTextBlock, DateTimeText, Spacer } from "Libs/Components";
import { services } from "../../../Services";
import { RoleType } from "../../../Models";
import { Content } from "../../../Models/Domain/Contents/Entities/Content";
import { axios } from "../../../Repositories/config";
import { postStatusTypeDisplay } from "Apps/Models/Domain/posts/entities/PostStatusType";
import { css } from "@mui/styled-engine";
import { AuthStore } from "Apps/Models/Stores/Auth/AuthStore";
import { useObserver } from "memento.react";
import { roles } from "Apps/roles";
import { DateTime } from "luxon";

interface PostCardProps {
    content: Content;
    deletePresed: () => void;
    editPressed: () => void;
    previewPressed: () => void;
}

export const PostCard = (props: PostCardProps) => {
    const { content, deletePresed, editPressed, previewPressed } = props;
    const theme = useTheme();
    const name = useObserver(AuthStore, s => s.loginInfo?.name ?? "");
    const avatar = useObserver(AuthStore, s => s.loginInfo?.avatar ?? "");
    const postDisabled = useObserver(AuthStore, s => ![...roles.posts.removeOther, ...roles.posts.editOther].includes(s.loginInfo?.role ?? RoleType.None));

    return (
        <Card css={classes.card}>
            <Box display="flex" flexDirection="column" height="100%">
                <Box
                    height="148px"
                    width="100%"
                    sx={{
                        background: theme.palette.primary.light,
                    }}
                >
                    {
                        content.thumbnail ?
                            <img
                                alt={content.title}
                                src={axios.defaults.baseURL + content.thumbnail}
                                height="148px" style={{
                                    objectFit: "cover",
                                }}
                            />
                            :
                            <Box sx={{
                                height: "100%",
                                width: "100%",
                                backgroundColor: theme.palette.background.paper,
                                opacity: "0.66"
                            }}>
                            </Box>
                    }
                </Box>

                <Box css={classes.profile}>
                    <Avatar
                        src={axios.defaults.baseURL + avatar}
                        style={{
                            width: "32px",
                            height: "32px",
                            background: theme.palette.primary.main
                        }} >
                        {content.createdBy.name[0]}
                    </Avatar>
                    <Typography
                        css={classes.profileText}
                        variant="h6"
                        noWrap
                    >
                        {props.content.createdBy.name}
                    </Typography>
                </Box>

                <Box p={2} flex="1 1 auto" zIndex="1" display="flex" flexDirection="column">
                    <Box position="relative" display="flex" width="100%">
                        <Box css={classes.menuButton}>
                            <PostCardMenu
                                previewPressed={previewPressed}
                                deletePresed={deletePresed}
                                editPressed={editPressed}
                                disableDeleteButton={
                                    postDisabled ||
                                    content.createdBy.name !== name
                                }
                                disableEditButton={
                                    postDisabled ||
                                    content.createdBy.name !== name
                                }
                            />
                        </Box>
                    </Box>

                    <Box>
                        <WrappedTextBlock
                            color="inherit"
                            variant="h6"
                            noWrap
                            row={2}
                        >
                            {content.title}
                        </WrappedTextBlock>
                    </Box>

                    <Box height="72px" mt={1}>
                        <WrappedTextBlock
                            color="textSecondary"
                            row={3}
                            variant="caption"
                            fontSize="10px"
                        >
                            {content.description.substr(0, 1024).replace(/<[^>]*>?/gm, "").replace(/&[^;]*;?/gm, "")}
                        </WrappedTextBlock>
                    </Box>

                    <Box display="flex" alignItems="center">
                        <Box>
                            <Typography variant="caption">
                                {postStatusTypeDisplay[props.content.status]}
                            </Typography>
                        </Box>

                        <Spacer />

                        {/* <Box display="flex" alignItems="center">
                            <Icon
                                style={{ color: theme.palette.grey[500] }}
                                fontSize="small"
                            >favorite</Icon>
                            <Typography
                                style={{
                                    color: theme.palette.grey[500],
                                    marginLeft: "4px"
                                }}
                            >2</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" ml={1}>
                            <Icon
                                style={{
                                    color: theme.palette.grey[500],
                                }}
                                fontSize="small"
                            >comment</Icon>
                            <Typography
                                style={{
                                    marginLeft: "4px",
                                    color: theme.palette.grey[500],
                                }}
                            >2</Typography>
                        </Box> */}
                    </Box>

                    <Box display="flex">
                        <DateTimeText
                            color="textSecondary"
                            fontSize="12px"
                            date={DateTime.fromISO(props.content.publishIn || props.content.createdAt).toJSDate()}
                        />
                    </Box>
                </Box >
            </Box>
        </Card >
    );
};

const classes = {
    card: css({
        width: "100%",
        height: "348px",
        position: "relative",
    }),
    img: css({
        width: "100%",
        height: "160px",
        objectFit: "cover"
    }),
    menuButton: css({
        position: "absolute",
        right: "36px",
        top: "-40px"
    }),
    profile: css({
        height: "28px",
        display: "flex",
        alignItems: "center",
        position: "absolute",
        top: "8px",
        left: "8px",
        right: "8px",
        bottom: "8px"
    }),
    profileText: css({
        marginLeft: "8px",
        color: "white",
        width: "200%",
        textShadow: "1px 1px 4px #bbbbbb"
    })
};