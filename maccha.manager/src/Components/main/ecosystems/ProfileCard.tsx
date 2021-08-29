import React from "react";
import {
    Button,
    ListItemText,
    Box,
    Typography,
    Select,
    MenuItem,
    Avatar
} from "@material-ui/core";
import { services } from "../../../Services";
import { useObserver } from "mobx-react";
import { WebSite } from "../../../Models/sites/web-site";
import ProfileImage from "../../commons/ProfileImage";
import { theme } from "../../../theme";
import { axios } from "../../../Repositories/config";

export default function ProfileCard() {
    const { authService, webSiteManagementsService } = services;

    const handleLogout = () => {
        services.authService.logout();
        window.location.assign("/");
    };

    const handleChangeWebSiteIdentifier = async (webSite: WebSite) => {
        try {
            await services.authService.refreshAsync(webSite.webSiteId);
        }
        catch {
            console.log("failed to refresh");
        }
        finally {
            window.location.assign("/");
        }
    };

    return useObserver(() => {
        return (
            <Box
                padding="12px"
                display="flex"
                flexDirection="column"
                alignItems="center"
                width="280px"
                overflow="hidden"
            >
                <Avatar
                    style={{ height: "80px", width: "80px", background: theme.palette.primary.main }}
                    src={`${axios.defaults.baseURL}${services.authService.loginInfo.avatar}`}
                    alt={`${services.authService.loginInfo.name}`} />

                <Box textAlign="center" marginTop="12px">
                    <Typography
                        variant="h6"
                        style={{ fontWeight: "bold" }}>
                        {authService.loginInfo.name}
                    </Typography>
                    <Typography variant="caption" style={{ color: "rgb(168,168,168)" }} >
                        {authService.loginInfo.email}
                    </Typography>
                </Box>

                <Select
                    style={{ marginTop: "16px", color: theme.palette.text.primary }}
                    variant="outlined"
                    value={authService.loginInfo.identifier}
                    color="primary"
                    label="ログイン中のサイト"
                    fullWidth
                >
                    {
                        webSiteManagementsService.webSites.map((w, i) => (
                            <MenuItem
                                key={i}
                                value={w.webSiteId}
                                button
                                onClick={() => handleChangeWebSiteIdentifier(w)}
                            >
                                <ListItemText>
                                    {w.name}
                                </ListItemText>
                            </MenuItem>
                        ))
                    }
                </Select>

                <Button variant="contained" color="primary" fullWidth style={{ marginTop: "12px" }} onClick={() => handleLogout()}> Logout </Button>
            </Box>
        );
    });
}