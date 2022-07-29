import React, { useEffect, useState } from "react";
import { Box, Stack, Typography, Checkbox, useTheme } from "@mui/material";
import { CategoryTree } from "Apps/Models/Domain/Contents/Entities/CategoryTree";
import { CategoryNode } from "Apps/Models/Domain/Contents/Entities/CategoryNode";
import { useTranslation } from "react-i18next";
import { EmptyItemsPanel } from "Apps/Components/commons/EmptyItemsPanel";

interface PostCategorySettingProps {
    categoryTree: CategoryTree;
    value: number[];
    onChange: (categoryIds: number[]) => void;
}

export const PostCategorySetting = (props: PostCategorySettingProps) => {
    const {
        categoryTree,
        onChange,
        value
    } = props;

    const [tree, setTree] = useState(() => categoryTree.tree);
    const { t } = useTranslation();
    const theme = useTheme();

    useEffect(() => {
        const subscription = categoryTree.subscribe(() => {
            setTree(categoryTree.tree);
        });

        return () => {
            subscription.dispose();
        };
    }, [categoryTree]);

    const handleChecked = (id: number, v: boolean) => {
        if (v) {
            const children = categoryTree.getAllParents(id);
            onChange(Array.from(new Set([...value, id, ...children])));
        }
        else {
            const children = categoryTree.getAllChildren(id);
            onChange([...value.filter(x => x !== id && !children.includes(x))]);
        }
    };

    return (
        <Box bgcolor={theme.palette.background.default} borderRadius="20px" overflow={"hidden"}>
            <Stack minHeight="200px" maxHeight="436px" sx={{ overflowY: "auto" }}>
                {
                    tree.length === 0 ?
                        <Box py={3}>
                            <EmptyItemsPanel message={t("カテゴリがありません")} />
                        </Box>
                        :
                        tree.map(t => <Box key={t.id} mt={2}>
                            <TreeNode
                                onChange={handleChecked}
                                category={t}
                                nest={0}
                                selectedIds={value}
                            />
                        </Box>)
                }
            </Stack>
        </Box>
    );
};

const TreeNode = ({
    category,
    nest,
    selectedIds,
    onChange
}: {
    category: CategoryNode,
    nest: number,
    selectedIds: number[],
    onChange: (id: number, cheched: boolean) => void,
}) => {
    return <>
        <Stack direction="row"
            ml={nest * 4}
        >
            <Checkbox
                checked={selectedIds.includes(category.id)}
                onChange={(_, v) => onChange(category.id, v)}
            />
            <Typography ml={2}>
                {category.id}
            </Typography>

            <Typography ml={2}>
                {category.name}
            </Typography>

            <Typography ml={2}>
                {category.parentId ?? "None"}
            </Typography>
        </Stack>
        <Stack>
            {
                category.children.length !== 0 && <>
                    {category.children.map(item => (
                        <TreeNode
                            onChange={onChange}
                            key={item.id}
                            category={item}
                            nest={nest + 1}
                            selectedIds={selectedIds}
                        />
                    ))}
                </>
            }
        </Stack>
    </>;
};