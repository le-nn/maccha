import React, { useState, ComponentType } from "react";
import { services } from "../../../Services";
import {
    ThemeProvider,
    IconButton,
    Box,
    Typography,
    Icon,
    Select,
    Menu,
    MenuItem,
    ListItemText, Avatar, useTheme
} from "@mui/material";
import ProfileCard from "./ProfileCard";
import { axios } from "../../../Repositories/config";
import { useObserver } from "react-relux";
import { AuthStore } from "Apps/Models/Stores/Auth/AuthStore";

export default function HeaderToolbar() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const theme = useTheme();
    const avatar = useObserver(AuthStore, s => s.loginInfo?.avatar ?? "");
    const handleOpenProfile = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box flex="1 1 auto" />
            <Avatar
                onClick={handleOpenProfile}
                style={{
                    background: theme.palette.primary.main,
                    height: "40px",
                    width: "40px",
                    cursor: "pointer"
                }}
                src={axios.defaults.baseURL + avatar}
            />
            <Menu
                id="lock-menu"
                keepMounted
                open={!!anchorEl}
                anchorEl={anchorEl}
                onClose={handleClose}
            >
                <ProfileCard></ProfileCard>
            </Menu>
        </>
    );
}