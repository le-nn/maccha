import { MoreVert } from "@mui/icons-material";
import { Box, css, IconButton, ListItem, ListItemText, Typography, useTheme } from "@mui/material";
import React from "react";

export const IndicatorListItem = ({
    selected,
    text,
    subText,
    onClick,
    optionEnabled,
    onOptionClicked
}: {
    text: string,
    subText: string,
    selected: boolean,
    optionEnabled?: boolean,
    onClick: () => void,
    onOptionClicked?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
    const theme = useTheme();

    const selectedStyle = css({
        borderRight: `4px solid ${theme.palette.primary.light}`
    });

    return (
        <Box>
            <ListItem
                button
                css={[
                    base,
                    selected
                        ? selectedStyle
                        : ""
                ]}
                onClick={onClick}>
                <ListItemText
                    primary={<Typography variant="body2" color="GrayText" fontSize="0.72rem">
                        {text}
                    </Typography>}
                    secondary={
                        <Typography noWrap>{subText}</Typography>
                    } />
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
    borderBottom: "1px solid #e7e7e7"
});
