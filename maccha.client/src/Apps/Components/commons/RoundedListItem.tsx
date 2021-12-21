import { MoreVert } from "@mui/icons-material";
import { Box, css, IconButton, ListItem, ListItemText, useTheme } from "@mui/material";
import React from "react";

export const RoundedListItem = ({
    selected,
    text,
    onClick,
    optionEnabled,
    onOptionClicked
}: {
    text: string,
    selected: boolean,
    optionEnabled?: boolean,
    onClick: () => void,
    onOptionClicked?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
    const theme = useTheme();

    const selectedStyle = css({
        "&::before": {
            background: theme.palette.primary.main + "!important",
            opacity: 0.2,
            content: "''",
            top: 0,
            left: 0,
            right: 0,
            zIndex: -1,
            bottom: 0,
            position: "absolute",
            margin: "0px",
            borderRadius: "8px"
        },
        color: theme.palette.primary.light + "!important",
    });

    return (
        <Box
            py={{ xs: 0.5, md: 1 }}
            px={{ xs: 1, md: 2 }}>
            <ListItem
                button
                css={[
                    base,
                    selected
                        ? selectedStyle
                        : ""
                ]}
                onClick={onClick}
            >
                <ListItemText primary={text} />
                {
                    optionEnabled && (
                        <IconButton
                            size="small"
                            onClick={onOptionClicked}
                        >
                            <MoreVert />
                        </IconButton>
                    )
                }
            </ListItem>
        </Box>
    );
};

const base = css({
    position: "relative",
    borderRadius: "8px"
});
