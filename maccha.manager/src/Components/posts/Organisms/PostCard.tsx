import React, {} from "react";
import {
    makeStyles,
    Box,
    Typography,
    Card,
    Avatar,
    Fab
} from "@material-ui/core";
import { theme } from "../../../theme";
import { IPost } from "../../../Models/posts/entities/IPost";
import { PostCardMenu } from "../Molecles";
import { PostCardImage } from "../Atoms";
import { WrappedTextBlock, DateTimeText, FlexSpacer } from "../../commons";
import { PostStatusType, postStatusTypeDisplay } from "../../../Models/posts/entities/PostStatusType";
import ProfileImage from "../../commons/ProfileImage";
import { confirmAsync } from "../../commons/confirmAsync";
import { services } from "../../../Services";
import { RoleType } from "../../../Models";
import { Content } from "../../../Models/Contents/Entities/Content";
import { axios } from "../../../Repositories/config";

interface PostCardProps {
    content: Content;
    deletePresed: () => void;
    editPressed: () => void;
    previewPressed: () => void;
}

export function PostCard(props: PostCardProps) {
    const classes = useStyles();
    const { content, deletePresed, editPressed, previewPressed } = props;

    return (
        <Card className={classes.card} elevation={5}>
            <Box display="flex" flexDirection="column" height="100%">
                <Box className={classes.profile}>
                    <Avatar
                        src={axios.defaults.baseURL + services.authService.loginInfo.avatar}
                        style={{
                            width: "32px",
                            height: "32px",
                            background: theme.palette.primary.main
                        }} >
                        {content.createdBy.name[0]}
                    </Avatar>
                    <Typography
                        className={classes.profileText}
                        variant="h6"
                        noWrap
                    >
                        {props.content.createdBy.name}
                    </Typography>
                </Box>

                <img
                    alt={content.title}
                    src={content.thumbnail ? axios.defaults.baseURL + content.thumbnail : ""}
                    height="148px" style={{
                        objectFit: "cover",
                        background: "rgba(127, 127, 127, 0.1"
                    }}
                />

                <Box p={2} flex="1 1 auto" zIndex="1" display="flex" flexDirection="column">
                    <Box position="relative" display="flex" width="100%">
                        <Box className={classes.menuButton}>
                            <PostCardMenu
                                previewPressed={previewPressed}
                                deletePresed={deletePresed}
                                editPressed={editPressed}
                                disableDeleteButton={
                                    services.authService.loginInfo.role <= RoleType.Post &&
                                    content.createdBy.name !== services.authService.loginInfo.name
                                }
                                disableEditButton={
                                    services.authService.loginInfo.role <= RoleType.Post &&
                                    content.createdBy.name !== services.authService.loginInfo.name
                                }
                            />
                        </Box>
                    </Box>

                    <Box className={classes.title}>
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

                        <FlexSpacer />

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
                            showTime
                            color="textSecondary"
                            fontSize="12px"
                            date={(props.content.publishIn ?? props.content.createdAt).toJSDate()}
                        />
                    </Box>
                </Box >
            </Box>
        </Card >
    );
}

const useStyles = makeStyles({
    card: {
        width: "100%",
        height: "348px",
        borderRadius: "0px",
        position: "relative"
    },
    img: {
        width: "100%",
        height: "160px",
        objectFit: "cover"
    },
    title: {
    },
    menuButton: {
        position: "absolute",
        right: "36px",
        top: "-40px"
    },
    profile: {
        height: "28px",
        display: "flex",
        alignItems: "center",
        position: "absolute",
        top: "8px",
        left: "8px",
        right: "8px",
        bottom: "8px"
    },
    profileText: {
        marginLeft: "8px",
        color: "white",
        width: "200%",
        textShadow: "1px 1px 4px #bbbbbb"
    }
});