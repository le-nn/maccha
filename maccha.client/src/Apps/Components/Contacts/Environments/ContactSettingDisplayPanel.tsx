import { Backdrop, Box, Card, CircularProgress } from "@mui/material";
import { ContactSettingContextStore } from "Apps/Models/Stores/Contacts/ContactSettingContextStore";
import { useObserver } from "react-relux";
import React from "react";

export const ContactSettingDisplayPanel = () => {
    const setting = useObserver(ContactSettingContextStore, s => s.contactSetting);

    return (
        <Box position="relative">
            <Backdrop open={!setting} sx={{ position: "absolute" }}>
                <CircularProgress />
            </Backdrop>
            <Box>
                {setting?.contactSettingId}
            </Box>
            <Box p={3} sx={{
                width: "100%"
            }}>
                {setting?.schemes.map(s => <Box key={s} p={1} sx={{
                    width: "100%"
                }}>
                    <Card sx={{ padding: "8px", width: "100%" }} >
                        {s}
                    </Card>
                </Box>)}
            </Box>

        </Box>
    );
};