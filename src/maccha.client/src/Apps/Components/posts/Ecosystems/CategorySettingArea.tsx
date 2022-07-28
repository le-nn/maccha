import { Box, Grid, Typography, Stack } from "@mui/material";
import { PostType } from "Apps/Models/Domain/posts/entities/PostType";
import React, { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { CategorySettingPanel } from "../Molecles/CategorySettingPanel";
import { CategorySettingPreviewPanel } from "../Molecles/CategorySettingPreviewPanel";

interface CategorySettingAreaProps {
    postType: PostType;
    onChange: (scheme: PostType) => void;
}

export const CategorySettingArea = (props: CategorySettingAreaProps) => {
    const { t } = useTranslation();
    return (
        <>
            <Typography variant="h6" mt={6}>{t("カテゴリ設定")}</Typography>
            <Typography color="textSecondary" variant="caption" >
                {t("コンテンツのカテゴリを定義します。")}
            </Typography>

            <Grid container
                spacing={3}
                p={{ sx: 1 }}
                mt={3}
                maxWidth="960px"
                width="100%">
                <Grid item xs={12} sm={6}>
                    <CategorySettingPanel
                        onChange={() => {
                            props.onChange(props.postType);
                        }}
                        categoryTree={props.postType.taxonomy.categoryTree!} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CategorySettingPreviewPanel
                        categoryTree={props.postType.taxonomy.categoryTree!} />
                </Grid>
            </Grid>
        </>
    );
};