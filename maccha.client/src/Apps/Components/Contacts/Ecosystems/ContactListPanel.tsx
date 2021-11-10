import { ListAlt } from "@mui/icons-material";
import { ListItem, ListItemText, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { ContactContentMeta } from "Apps/Models/Domain/Contacts/Contact";
import { ContactContentContextStore } from "Apps/Models/Stores/Contacts/ContactContextStore";
import { ContactSettingsStore } from "Apps/Models/Stores/Contacts/ContactSettingsStore";
import { ContactsStore } from "Apps/Models/Stores/Contacts/ContactsStore";
import { DateTime } from "luxon";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useObserver } from "react-relux";

export const ContactListPanel = () => {
    const selectedId = useObserver(ContactsStore, s => s.selectedId);
    const contacts = useObserver(ContactsStore, s => s.contacts);
    const dispatch = useDispatch(ContactsStore);
    const dispatchContactContentContext = useDispatch(ContactContentContextStore);
    const [t] = useTranslation();
    const theme = useTheme();

    useEffect(() => {
        console.log("qqqq",selectedId);
        dispatchContactContentContext(s => s.loadAsync(selectedId));
    }, [selectedId]);

    const handleItemClicked = (c: ContactContentMeta) => {
        dispatch(s => s.select(c.contactContentId));
    };

    if (contacts.length === 0) {
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
                    >{t("0件です")}</Typography>
                </Box>
            </Box>
        );
    }

    return (
        <Box width="100%">
            {
                contacts.map(c => (<ListItem
                    key={c.contactContentId}
                    button
                    onClick={e => handleItemClicked(c)}
                >
                    <ListItemText
                        primary={
                            <Typography>
                                {
                                    DateTime.fromISO(c.contactedAt)
                                        .toFormat("yyyy/MM/dd - HH:mm")
                                }
                            </Typography>
                        }
                        color={c.contactContentId === selectedId ?
                            "primary" : ""}
                    >
                    </ListItemText>
                </ListItem>))
            }
        </Box>
    );
};
