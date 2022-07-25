import { Backdrop, Box, Card, CircularProgress, Typography } from "@mui/material";
import { ContactSettingContextStore } from "Apps/Models/Stores/Contacts/ContactSettingContextStore";
import { useDispatch, useObserver } from "memento.react";
import React, { useEffect } from "react";
import { ContactSettingsStore } from "Apps/Models/Stores/Contacts/ContactSettingsStore";
import { axios } from "Apps/Repositories/config";

export const ContactSettingDisplayPanel = () => {
    const setting = useObserver(ContactSettingContextStore, s => s.contactSetting);
    const selectedSettingId = useObserver(ContactSettingsStore, s => s.selectedSettingId);
    const dispatch = useDispatch(ContactSettingContextStore);

    useEffect(() => {
        dispatch(s => s.loadSettingAsync(selectedSettingId));
    }, [selectedSettingId]);

    return (
        <Box position="relative" p={3}>
            {!!setting && <Box>
                <Typography style={{ wordBreak: "break-all" }}>POST</Typography>
                <Typography style={{ wordBreak: "break-all" }}>{axios.defaults.baseURL}api/contacts/{setting?.contactSettingId}</Typography>
            </Box>
            }
            <Box>
                {
                    setting?.schemes.map(s => <Box
                        key={s}
                        p={1}
                        sx={{
                            width: "100%"
                        }}>
                        {
                            <Typography>{s}</Typography>
                        }
                    </Box>)
                }
            </Box>
        </Box>
    );
};