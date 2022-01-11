import React from "react";
import {
    Button,
    ListItemText,
    Box,
    Typography,
    Select,
    MenuItem,
    Avatar,
    useTheme
} from "@mui/material";
import { services } from "../../../Services";
import { WebSite } from "../../../Models/Domain/sites/web-site";
import ProfileImage from "../../commons/ProfileImage";
import { axios } from "../../../Repositories/config";
import { useDispatch, useObserver } from "react-relux";
import { AuthStore } from "Apps/Models/Stores/Auth/AuthStore";

export default () => {
    const { webSiteManagementsService } = services;
    const theme = useTheme();
    const dispatch = useDispatch(AuthStore);

    const handleLogout = () => {
        dispatch(auth => auth.logout());
        window.location.assign("/");
    };

    const handleChangeWebSiteIdentifier = async (webSite: WebSite) => {
        try {
            await dispatch(auth => auth.refreshAsync(webSite.webSiteId));
        }
        catch {
            console.log("failed to refresh");
        }
        finally {
            window.location.assign("/");
        }
    };

    return useObserver(() => {
        const loginInfo = useObserver(AuthStore, s => s.loginInfo);
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
                    src={`${axios.defaults.baseURL}${loginInfo?.avatar}`}
                    alt={`${loginInfo?.name}`} />

                <Box textAlign="center" marginTop="12px">
                    <Typography
                        variant="h6"
                        style={{ fontWeight: "bold" }}>
                        {loginInfo?.name}
                    </Typography>
                    <Typography variant="caption" style={{ color: "rgb(168,168,168)" }} >
                        {loginInfo?.email}
                    </Typography>
                </Box>

                <Select
                    style={{ marginTop: "16px", color: theme.palette.text.primary }}
                    variant="outlined"
                    value={loginInfo?.identifier}
                    color="primary"
                    label="ログイン中のサイト"
                    fullWidth
                >
                    {
                        webSiteManagementsService.webSites.map((w) => (
                            <MenuItem
                                key={w.name}
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
};