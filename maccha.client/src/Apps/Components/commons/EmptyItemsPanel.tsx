import { ListAlt } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

interface EmptyItemsPanelProps {
    message?: string;
}

export const EmptyItemsPanel = (props: EmptyItemsPanelProps) => {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <Box
            width="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={1}
        >
            <Box textAlign="center">
                <ListAlt
                    sx={{
                        fontSize: "100px",
                        color: theme.palette.grey[400]
                    }}
                />
                <Typography
                    sx={{
                        fontSize: "1.1rem",
                        color: theme.palette.grey[400],
                        whiteSpace: "break-spaces"
                    }}
                >{props.message ?? t("0 件です")}</Typography>
            </Box>
        </Box>
    );
};