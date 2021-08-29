import React, { useState } from "react";
import {
    Box,
    TextField,
    Typography,
    useTheme
} from "@material-ui/core";
import { observer } from "mobx-react";
import { services } from "../../../Services";
import { WebSite } from "../../../Models/sites/web-site";
import { displayRoles } from "../../../Models/auth/role";
import { ColorPalette } from "../../commons";
import { User } from "../../../Models/users/user";

interface UserSettingPanelProps {
    onChange: (key: keyof User, value: any) => void;
}

export const UserSettingPanel = observer((props: UserSettingPanelProps) => {
    const { usersService, authService, webSiteManagementsService } = services;
    const [selectedThemeColor, setSelectedThemeColor] = useState(localStorage.getItem("color") ?? "8db860");

    function handleThemeColor(value: string) {
        setSelectedThemeColor(value);
        localStorage.setItem("color", value);
        window.location.reload();
    }

    return (
        <Box
            p={2}
            position="relative"
            width="100%"
            display="flex"
            alignItems="center"
            flexDirection="column"
        >
            <Box
                width="100%"
                mt={4}
            >
                <Typography variant="h6">User ID</Typography>
                <Typography variant="h6">{services.usersService.selected?.userId}</Typography>
            </Box>

            <Box
                width="100%"
                mt={4}
            >
                <Typography variant="h6">User Name</Typography>
                <TextField
                    style={{ marginTop: "12px" }}
                    fullWidth
                    value={usersService.selected?.name}
                    onChange={e => props.onChange("name", e.target.value)}
                />
            </Box>

            <Box
                width="100%"
                mt={4}
            >
                <Typography variant="h6">E-Mail</Typography>
                <TextField
                    onChange={e => props.onChange("email", e.target.value)}
                    style={{ marginTop: "12px" }}
                    fullWidth
                    value={usersService.selected?.email}
                />
            </Box>


            <Box
                width="100%"
                mt={4}
            >
                <Typography variant="h6">Role</Typography>
                <Typography variant="h6">{usersService.selected ? displayRoles[usersService.selected.role] : "None"}</Typography>
            </Box>

            <Box
                width="100%"
                mt={4}
            >
                <Typography variant="h6">Theme Color</Typography>
                <ColorPalette
                    colors={[
                        "#e91e63",
                        "#f44336",
                        "#ff5722",
                        "#ff9800",
                        "#ffc107",
                        "#ffeb3b",
                        "#cddc39",
                        "#8db860",
                        "#4caf50",
                        "#009688",
                        "#00bcd4",
                        "#2196f3",
                        "#3f51b5",
                        "#9c27b0",
                    ]}
                    onChange={c => handleThemeColor(c)}
                    value={selectedThemeColor} />
            </Box>
        </Box>
    );
});