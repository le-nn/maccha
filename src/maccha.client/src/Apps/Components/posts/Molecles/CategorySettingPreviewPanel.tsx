import { CheckBox } from "@mui/icons-material";
import { Box, Stack, Typography, Paper } from "@mui/material";
import { EmptyItemsPanel } from "Apps/Components/commons/EmptyItemsPanel";
import { Category } from "Apps/Models/Domain/Contents/Entities/Category";
import { CategoryNode } from "Apps/Models/Domain/Contents/Entities/CategoryNode";
import { CategoryTree } from "Apps/Models/Domain/Contents/Entities/CategoryTree";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface CategorySettingPreviewPanelProps {
    categoryTree: CategoryTree;
}

export const CategorySettingPreviewPanel = ({ categoryTree }: CategorySettingPreviewPanelProps) => {
    const [tree, setTree] = useState(() => categoryTree.tree);
    const { t } = useTranslation();

    useEffect(() => {
        const subscription = categoryTree.subscribe(() => {
            setTree([...categoryTree.tree]);
        });

       setTree([...categoryTree.tree]);
        return () => {
            subscription.dispose();
        };
    }, [categoryTree]);

    return (
        <Paper
            elevation={6}
            sx={{
                height: "100%",
                borderRadius: "20px",
                width: "100%",
                p: { xs: 2, sm: 4, md: 5 }
            }}>
            <Typography>{t("プレビュー")}</Typography>
            <Stack minHeight="200px" maxHeight="436px" sx={{ overflowY: "auto" }}>
                {
                    tree.length === 0 ?
                        <Box py={3}>
                            <EmptyItemsPanel message={t("カテゴリがありません")} />
                        </Box>
                        :
                        tree.map(t => <Box key={t.id} mt={2}>
                            <Tree category={t} nest={0} />
                        </Box>)

                }
            </Stack>
        </Paper >
    );
};

const Tree = ({ category, nest }: { category: CategoryNode, nest: number }) => {
    return < >
        <Stack direction="row"
            ml={nest * 4}
        >
            <CheckBox />
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
                        <Tree key={item.id}
                            category={item}
                            nest={nest + 1}
                        />
                    ))}
                </>
            }
        </Stack>
    </>;
};