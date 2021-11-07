import { List, Box, ListItem, Button, ListItemText } from "@mui/material";
import { ContactSettingsStore } from "Apps/Models/Stores/Contacts/ContactSettingsStore";
import { useObserver, useDispatch } from "react-relux";
import React from "react";
import { useTranslation } from "react-i18next";
import { useAppNavigate } from "Libs/Routing/RouterConfig";

export const ContactSettingsList = () => {
    const list = useObserver(ContactSettingsStore, s => s.contactSettings);
    const [t] = useTranslation();
    const dispatch = useDispatch(ContactSettingsStore);
    const navigate = useAppNavigate();

    const createContactSetting = async () => {
        await navigate("/contacts/new/edit");
    };

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
                        >
                            <ListItemText primary={x.name} />
                        </ListItem>)
                    }
                </List>
            </Box>
        </Box >
    );
};