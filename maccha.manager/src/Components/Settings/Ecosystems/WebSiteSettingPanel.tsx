import React, { useState } from "react";
import {
    Avatar,
    Box,
    TextField,
    Typography,
    ListItemText,
    Select,
    MenuItem,
    useTheme
} from "@material-ui/core";
import { useObserver } from "mobx-react";
import { services } from "../../../Services";
import { WebSite } from "../../../Models/sites/web-site";
import { displayRoles, RoleType } from "../../../Models/auth/role";
import { ColorPalette } from "../../commons";

interface WebSiteSettingPanelProps {
    onChange: (key: keyof WebSite, value: any) => void;
}

export function WebSiteSettingPanel(props: WebSiteSettingPanelProps) {
    const { authService, webSiteManagementsService } = services;
    const theme = useTheme();

    return useObserver(() => (
        <Box
            p={2}
            position="relative"
            width="100%"
            display="flex"
            alignItems="center"
            flexDirection="column"
        >
            <Box mt={4}></Box>
            <Box
                width="100%"
                mt={4}
            >
                <Typography variant="subtitle2" color="textSecondary">Web Site Identifier</Typography>
                <Typography variant="h6">{webSiteManagementsService.selected?.webSiteId}</Typography>
            </Box>

            <Box
                width="100%"
                mt={4}
            >
                <Typography variant="subtitle2" color="textSecondary">Web Site Name</Typography>
                <Typography variant="h6">{webSiteManagementsService.selected?.name}</Typography>
            </Box>

            <Box
                width="100%"
                mt={4}
            >
                <Typography variant="subtitle2" color="textSecondary">Web Site Display Name</Typography>
                <TextField
                    style={{ marginTop: "12px" }}
                    fullWidth
                    disabled={!(authService.loginInfo.role >= RoleType.Edit)}
                    value={webSiteManagementsService.selected?.displayName}
                    onChange={e => props.onChange("name", e.target.value)}
                />
            </Box>

            <Box
                width="100%"
                mt={4}
            >
                <Typography variant="subtitle2" color="textSecondary">Host URL</Typography>
                <TextField
                    style={{ marginTop: "12px" }}
                    fullWidth
                    disabled={!(authService.loginInfo.role >= RoleType.Edit)}
                    value={webSiteManagementsService.selected?.host}
                    onChange={e => props.onChange("host", e.target.value)}
                />
            </Box>

            <Box
                width="100%"
                mt={4}
            >
                <Typography variant="subtitle2" color="textSecondary">Web Site Descrtiption</Typography>
                <TextField
                    style={{ marginTop: "12px" }}
                    fullWidth
                    multiline
                    rows="6"
                    variant="filled"
                    disabled={!(authService.loginInfo.role >= RoleType.Edit)}
                    value={webSiteManagementsService.selected?.description}
                    onChange={e => props.onChange("description", e.target.value)}
                />
            </Box>
        </Box>
    )
    );
}