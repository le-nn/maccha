import React, { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Card,
    Checkbox,
    css,
    Divider,
    Icon,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useTheme,
} from "@mui/material";
import { services } from "../../../Services";
import { observer } from "mobx-react";
import { PostCard } from "../Organisms";
import { ItemsWrapGrid, DateTimeText } from "Libs/Components";
import { confirmAsync } from "../../commons/confirmAsync";
import { Content } from "../../../Models/Domain/Contents/Entities/Content";
import { PostSearchPagingBar } from "../Molecles/PostSearchPagingBar";
import { Scheme } from "../../../Models/Domain/Contents/Entities/Scheme";
import { postStatusTypeDisplay } from "../../../Models/Domain/posts/entities/PostStatusType";
import { axios } from "../../../Repositories/config";
import { useAppLocation, useAppNavigate } from "Libs/Routing/RouterConfig";
import { Delete, Edit, Preview } from "@mui/icons-material";
import { useOption } from "Apps/Hooks/useOption";
import { EmptyItemsPanel } from "Apps/Components/commons/EmptyItemsPanel";
import { useTranslation } from "react-i18next";
import { AuthStore } from "Apps/Models/Stores/Auth/AuthStore";
import { useObserver } from "memento.react";
import { DateTime } from "luxon";

export default observer(() => {
    const history = useAppNavigate();
    const location = useAppLocation();
    const query = new URLSearchParams(location.search);
    const option = useOption();
    const { t } = useTranslation();

    useEffect(() => {
        const page = Number(query.get("page") ?? 1);
        const postType = services.postManagementsService.selected;
        services.postsService.setSearchOption({
            ...services.postsService.searchOption,
            offset: services.postsService.searchOption.fetch * (page - 1),
            fetch: postType?.displayFormat === "card" ? 30 : 60
        });
        searchAsync();
    }, [services.postManagementsService.selected]);

    async function searchAsync() {
        const selected = services.postManagementsService.selected;
        if (selected) {
            await services.postsService.searchPostsAsync(selected.taxonomy.name);
        }
    }

    async function handleChangePage(e: { offset: number; fetch: number }) {
        window.history.replaceState("",
            "",
            `${location.pathname}?page=${(e.offset / e.fetch) + 1}`);

        const page = Number(query.get("page") ?? 1);
        const postType = services.postManagementsService.selected;
        services.postsService.setSearchOption({
            ...services.postsService.searchOption,
            offset: e.offset,
            fetch: e.fetch
        });
        searchAsync();
    }

    async function onDeletePresed(post: Content) {
        if (await confirmAsync("削除しますか?")) {
            const selected = services.postManagementsService.selected;
            await services.postsService.deleteFromId(
                services.postManagementsService.selected?.taxonomy.name ?? "",
                post.contentId
            );

            if (selected) {
                services.postsService.searchPostsAsync(selected.taxonomy.name);
            }
        }
    }

    function onEditPressed(post: Content) {
        const selected = services.postManagementsService.selected;
        if (selected) {
            history(`./${selected.taxonomy.name}/${post.contentId}/edit`);
        }
    }

    function onPreviewPressed(contentId: string) {
        const selected = services.postManagementsService.selected;
        if (selected) {
            history(`./${selected.taxonomy.name}/${contentId}`);
        }
    }

    return (
        <Box height="100%" display="flex" flexDirection="column">
            <Box p={1.5}>
                <Box
                    display="flex"
                    alignItems="center"
                    flexWrap="wrap"
                >
                    <Box flex="1 1 auto" />
                    <PostSearchPagingBar
                        offset={services.postsService.searchOption.offset}
                        count={services.postsService.hitCount}
                        fetch={services.postsService.searchOption.fetch}
                        onChange={e => handleChangePage(e)}
                    />
                </Box>
            </Box>

            <Box
                display="flex"
                flex="1 1 auto"
                overflow="auto"
                width="100%"
            >
                {
                    !services.postManagementsService.selected && <EmptyItemsPanel message={t("投稿がありません")} />
                }
                {
                    services.postManagementsService.selected?.displayFormat === "card" && (
                        services.postsService.posts.length === 0 ?
                            <EmptyItemsPanel message={t("投稿がありません")} />
                            :
                            <ItemsWrapGrid
                                css={css({
                                })}
                                segmentLength={240}
                                space={12}
                                items={
                                    services
                                        .postsService
                                        .posts
                                        .map(item => ({ id: item.contentId, content: item }))
                                }
                                itemSlot={item => <PostCard
                                    key={item.id}
                                    previewPressed={() => onPreviewPressed(item.content.contentId)}
                                    deletePresed={() => onDeletePresed(item.content)}
                                    editPressed={() => onEditPressed(item.content)}
                                    content={item.content}
                                />}
                            />
                    )
                }
                {
                    services.postManagementsService.selected?.displayFormat === "table" && (
                        services.postsService.posts.length === 0 ?
                            <EmptyItemsPanel message={t("投稿がありません")} />
                            :
                            <PostSearchView
                                previewPressed={c => onPreviewPressed(c.contentId)}
                                deletePresed={c => onDeletePresed(c)}
                                editPressed={c => onEditPressed(c)}
                                contents={services.postsService.posts}
                                schemes={services.postManagementsService.selected?.taxonomy.schemes ?? []}
                            />
                    )
                }
            </Box>
        </Box >
    );
});

interface PostSearchViewProps {
    previewPressed: (c: Content) => void;
    deletePresed: (c: Content) => void;
    editPressed: (c: Content) => void;
    contents: Content[];
    schemes: Scheme[];
}

const PostSearchView = (props: PostSearchViewProps) => {
    const theme = useTheme();
    const avatar = useObserver(AuthStore, s => s.loginInfo?.avatar ?? "");
    return (
        <TableContainer>
            <Table stickyHeader aria-label="sticky table">
                <TableHead >
                    <TableRow>
                        <TableCell>
                        </TableCell>
                        <TableCell>
                            タイトル
                        </TableCell>
                        <TableCell>
                            作成者
                        </TableCell>
                        <TableCell>
                            サムネイル
                        </TableCell>
                        <TableCell>
                            メタデータ
                        </TableCell>
                        <TableCell>
                            備考
                        </TableCell>
                        <TableCell>
                            公開日時
                        </TableCell>
                        <TableCell>
                            ステータス
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                            備考
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                            詳細
                        </TableCell>
                        {
                            props.schemes.map(s => <TableCell key={s.schemeId} style={{ textAlign: "center" }}>
                                {s.displayName}
                            </TableCell>)
                        }
                        <TableCell style={{ textAlign: "center" }}>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.contents.map(c => (
                        <TableRow key={c.contentId}>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                // indeterminate={numSelected > 0 && numSelected < rowCount}
                                // checked={rowCount > 0 && numSelected === rowCount}
                                // onChange={onSelectAllClick}
                                // inputProps={{ 'aria-label': 'select all desserts' }}
                                />
                            </TableCell>
                            <TableCell>
                                {c.title}
                            </TableCell>
                            <TableCell>
                                <Box display="flex">
                                    <Avatar
                                        src={axios.defaults.baseURL + avatar}
                                        style={{
                                            width: "32px",
                                            height: "32px",
                                            background: theme.palette.primary.main
                                        }} >
                                        {c.createdBy.name[0]}
                                    </Avatar>
                                    <Typography
                                        variant="h6"
                                        noWrap
                                    >
                                        {c.createdBy.name}
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <img
                                    alt={c.title}
                                    src={c.thumbnail}
                                    height="38px" style={{
                                        objectFit: "cover",
                                        background: "rgba(127, 127, 127, 0.1"
                                    }}
                                />
                            </TableCell>
                            <TableCell>
                                {c.metadata}
                            </TableCell>
                            <TableCell>
                                {c.description}
                            </TableCell>
                            <TableCell>
                                <DateTimeText
                                    color="textSecondary"
                                    fontSize="12px"
                                    date={DateTime.fromISO(c.publishIn ?? c.createdAt).toJSDate()}
                                />
                            </TableCell>
                            <TableCell>
                                <Typography variant="caption">
                                    {postStatusTypeDisplay[c.status]}
                                </Typography>
                            </TableCell>
                            {
                                c.fields.map(f => <TableCell key={f.fieldId} style={{ textAlign: "center" }}>
                                    {f.value}
                                </TableCell>)
                            }
                            <TableCell>
                                <Box display="flex">
                                    <IconButton><Preview /></IconButton>
                                    <IconButton><Edit /></IconButton>
                                    <IconButton><Delete /></IconButton>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};