import { List, Box, ListItem, Button, ListItemText, Typography, useTheme } from "@mui/material";
import { ContactSettingsStore } from "Apps/Models/Stores/Contacts/ContactSettingsStore";
import { useObserver, useDispatch } from "react-relux";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppNavigate } from "Libs/Routing/RouterConfig";
import { ContactsStore } from "Apps/Models/Stores/Contacts/ContactsStore";
import { ListAlt } from "@mui/icons-material";

export const ContactSettingsList = () => {
    const list = useObserver(ContactSettingsStore, s => s.contactSettings);
    const selectedSettingId = useObserver(ContactSettingsStore, s => s.selectedSettingId);
    const [t] = useTranslation();
    const dispatch = useDispatch(ContactSettingsStore);
    const dispatchContacts = useDispatch(ContactsStore);
    const navigate = useAppNavigate();
    const theme = useTheme();

    useEffect(() => {
        dispatchContacts(s => s.loadAsync(selectedSettingId));
    }, [selectedSettingId]);

    const createContactSetting = async () => {
        await navigate("/contacts/new/edit");
    };

    const handleContactSettingClicked = (settingId: string) => {
        dispatch(s => s.select(settingId));
    };

    if (list.length === 0) {
        return (
            <Box
                width="100%"
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Box textAlign="center">
                    <ListAlt
                        sx={{
                            fontSize: "120px",
                            color: theme.palette.grey[400]
                        }}
                    />
                    <Typography
                        sx={{
                            fontSize: "24px",
                            color: theme.palette.grey[400]
                        }}
                    >{t("0 件です")}</Typography>
                </Box>
            </Box>
        );
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            height="100%"
            width="100%"
        >
            <Box py={4}>
                <Button
                    onClick={createContactSetting}
                    sx={{
                        borderRadius: "24px"
                    }}
                    variant="contained"
                >
                    {t("お問い合わせ設定を作成")}
                </Button>
            </Box>
            <Box width="100%">
                <List>
                    {
                        list.map(x => <ListItem
                            button
                            key={x.contactSettingId}
                            onClick={e => handleContactSettingClicked(x.contactSettingId)}
                        >
                            <ListItemText primary={x.name} />
                        </ListItem>)
                    }
                </List>
            </Box>
        </Box >
    );
};