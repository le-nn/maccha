import React, { useState, useEffect } from "react";
import { Box, Input, Button, Typography, Menu, ClickAwayListener, Divider } from "@material-ui/core";
import { useObserver } from "mobx-react";
import { FileDropArea, SearchBox } from "../../commons";
import { services } from "../../../Services";
import { confirmAsync } from "../../commons/confirmAsync";

export function MediaListToolbar() {
    const [searchText, setSearchText] = useState("");
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const upload = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    function selectAll() {
        services.mediaService.setSelected(
            services.mediaService.files
        );
    }

    function clearAll() {
        services.mediaService.setSelected([]);
    }

    async function handleDelete() {
        if (await confirmAsync(`${services.mediaService.selected.length}件を削除しますか?`)) {
            services.mediaService.removeSelectedAsync();
        }
    }

    return useObserver(() => {
        return (
            < Box p={1} height="100%" overflow="auto" display="flex" alignItems="center">
                <Typography variant="h4">
                    Files
                </Typography>
                {
                    services.mediaService.selected.length
                        ?
                        // when any items are selected
                        <>
                            <Box flex="1 1 auto" />
                            <Typography>
                                {services.mediaService.selected.length} アイテム選択中
                            </Typography>
                            <Button
                                color="primary"
                                style={{ marginLeft: "8px" }}
                                onClick={() => clearAll()}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => selectAll()}
                                variant="contained"
                                color="primary"
                                style={{ marginLeft: "8px" }}
                            >
                                全選択
                            </Button>
                            <Divider orientation="vertical" />
                            <Button
                                onClick={() => handleDelete()}
                                variant="contained"
                                color="primary"
                                style={{ marginLeft: "8px" }}
                            >
                                削除
                            </Button>
                        </>
                        :
                        // when no item is selected
                        <>
                            <Box ml="auto">
                                <Menu
                                    id="long-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={!!anchorEl}
                                    PaperProps={{
                                        style: {
                                            maxHeight: 400,
                                            padding: "12px",
                                            boxSizing: "border-box"
                                        },
                                    }}
                                >
                                    <FileDropArea
                                        showCommend
                                        commited={f => {
                                            f && services.mediaService.postAsync(f);
                                            setAnchorEl(null);
                                        }}
                                        onChange={e => 0}
                                    />
                                </Menu>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={upload}
                                >
                                    Upload
                                </Button>
                            </Box>
                        </>
                }
            </Box >
        );
    });
}