import React, { useState, useEffect } from "react";
import { Box, Input, Button, Divider } from "@mui/material";
import { observer } from "mobx-react";
import { services } from "../../../Services";
import { MediaListToolbar } from "../Ecosystems/MediaListToolbar";
import { ImageGrid } from "../Ecosystems";

export default observer(() => {
    useEffect(() => {
        services.mediaService.fetchAllFilesAsync();
    }, []);

    return (
        < Box p={1} height="100%" overflow="auto">
            <Box>
                <MediaListToolbar />
            </Box>
            <Divider style={{ marginTop: "8px" }} />
            <Box mt={2} display="flex" flexWrap="wrap" width="100%">
                <ImageGrid />
            </Box>
        </Box >
    );
});
