import { Add, Delete, Edit } from "@mui/icons-material";
import { Box, Button, Divider, IconButton, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material";
import { EmptyItemsPanel } from "Apps/Components/commons/EmptyItemsPanel";
import { Category } from "Apps/Models/Domain/Contents/Entities/Category";
import { CategoryTree } from "Apps/Models/Domain/Contents/Entities/CategoryTree";
import { Spacer } from "Libs/Components";
import { useDialog } from "Libs/Dialogs/useDialog";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface CategorySettingPanelProps {
    categoryTree: CategoryTree;
    onChange: () => void;
}

export const CategorySettingPanel = ({ categoryTree, onChange }: CategorySettingPanelProps) => {
    const [categories, setCategories] = useState(() => categoryTree.all);
    const { t } = useTranslation();

    useEffect(() => {
        const subscription = categoryTree.subscribe(() => {
            setCategories([...categoryTree.all]);
            onChange();
        });

        return () => {
            subscription.dispose();
        };
    }, [categoryTree, onChange, categories]);


    const { showAsync } = useDialog();

    const handleAdd = async () => {
        const item = await showAsync<Omit<Category, "id"> | null>(close => (
            <CategorySetttingDialog
                categories={categories}
                onOk={close}
            />
        ));

        if (item) {
            categoryTree.add({
                id: categoryTree.generateNextId(),
                name: item.name,
                parentId: item.parentId,
                order: item.order,
                slug: item.slug,
            });
        }
    };

    const handleRemove = (id: number) => {
        categoryTree.remove(id);
    };

    const handleEdit = async (category: Category) => {
        const entity = categoryTree.get(category.id);
        if (entity) {
            const edited = await showAsync<Omit<Category, "id"> | null>(close => (
                <CategorySetttingDialog
                    categories={categories}
                    category={category}
                    onOk={close}
                />
            ));

            if (edited) {
                categoryTree.mutate(category.id, c => ({ id: c.id, ...edited }));
            }
        }
    };

    return (
        <Paper sx={{
            borderRadius: "20px",
            width: "100%",
            p: { xs: 2, sm: 4, md: 5 },
            height: "100%"
        }}
            elevation={6} >
            <Typography>{t("編集")}</Typography>
            <Stack minHeight="200px" maxHeight="400px" sx={{ overflowY: "auto" }}>
                {
                    categoryTree.all.length === 0 ?
                        <Box py={3}>
                            <EmptyItemsPanel message={t("カテゴリがありません")} />
                        </Box>
                        :
                        categories.map(category => (
                            <Stack direction="row" key={JSON.stringify(category)} width="100%">
                                <Box>
                                    <Typography>{category.id}</Typography>
                                </Box>
                                <Box ml={1}>
                                    <Typography>{category.name}</Typography>
                                </Box>

                                <Spacer />

                                <IconButton onClick={() => handleEdit(category)}>
                                    <Edit />
                                </IconButton>
                                <IconButton onClick={() => handleRemove(category.id)}>
                                    <Delete />
                                </IconButton>
                            </Stack>
                        ))
                }
            </Stack>
            <Stack direction="row">
                <Button
                    onClick={handleAdd}
                    color="primary"
                    variant="contained"
                    sx={{ borderRadius: "32px", mx: "auto" }}
                >
                    {t("追加する")}
                    <Add />
                </Button>
            </Stack>
        </Paper>
    );
};

const CategorySetttingDialog = ({
    category,
    categories,
    onOk,
}: {
    category?: Omit<Category, "id">,
    categories: Category[],
    onOk: (value: Omit<Category, "id"> | null) => void,
}) => {
    const { t } = useTranslation();
    const [target, setTarget] = useState(() => category ?? {
        children: [], name: "", order: 0, parentId: null, slug: ""
    });
    return (
        <>
            <Stack p={{ sx: 2, sm: 3, md: 5 }}>
                <Typography sx={{ mt: 3 }}>{t("カテゴリ名")}</Typography>
                <TextField
                    sx={{ mt: 2 }}
                    value={target.name}
                    onChange={e => setTarget({
                        ...target,
                        name: e.target.value,
                    })}
                />

                <Typography sx={{ mt: 3 }}>{t("スラッグ")}</Typography>
                <TextField
                    sx={{ mt: 2 }}
                    helperText={t("検索する際の識別子になります")}
                    value={target.slug}
                    onChange={e => setTarget({
                        ...target,
                        slug: e.target.value,
                    })}
                />

                <Typography sx={{ mt: 3 }}>{t("親カテゴリ")}</Typography>
                <Select
                    sx={{ mt: 2 }}
                    value={target.parentId ?? -1}
                    onChange={e => setTarget({
                        ...target,
                        parentId: (e.target.value !== "-1" && e.target.value !== -1)
                            ? Number(e.target.value)
                            : null,
                    })}
                >
                    {[
                        <MenuItem
                            key={-1}
                            value={-1}
                        >
                            {t("なし")}
                        </MenuItem>,
                        ...categories.map(c => <MenuItem
                            key={c.id}
                            value={c.id}
                        >
                            {c.name}
                        </MenuItem>)
                    ]}

                </Select>
            </Stack>

            <Divider />

            <Stack direction="row" p={{ xs: 2, sm: 3 }}>
                <Spacer />
                <Button
                    onClick={_ => {
                        onOk(null);
                    }}>
                    {t("CANCEL")}
                </Button>
                <Button
                    variant="contained"
                    onClick={_ => {
                        onOk(target);
                    }}>
                    {t("OK")}
                </Button>
            </Stack>
        </>
    );
};