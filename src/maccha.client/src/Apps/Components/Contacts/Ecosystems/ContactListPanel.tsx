import { ListAlt } from "@mui/icons-material";
import { ListItem, ListItemText, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { EmptyItemsPanel } from "Apps/Components/commons/EmptyItemsPanel";
import { IndicatorListItem } from "Apps/Components/commons/IndicatorListItem";
import { ContactContentMeta } from "Apps/Models/Domain/Contacts/Contact";
import { ContactContentContextStore } from "Apps/Models/Stores/Contacts/ContactContextStore";
import { ContactSettingsStore } from "Apps/Models/Stores/Contacts/ContactSettingsStore";
import { ContactsStore } from "Apps/Models/Stores/Contacts/ContactsStore";
import { DateTime } from "luxon";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useObserver, useStore } from "memento.react";

export const ContactListPanel = () => {
    const selectedId = useObserver(ContactsStore, s => s.selectedId);
    const contacts = useObserver(ContactsStore, s => s.contacts);
    const fields = useObserver(ContactContentContextStore, s => s.contact?.fields ?? []);
    const dispatch = useDispatch(ContactsStore);
    const dispatchContactContentContext = useDispatch(ContactContentContextStore);
    const [t] = useTranslation();
    const theme = useTheme();

    const handleItemClicked = (c: ContactContentMeta) => {
        dispatch(s => s.select(c.contactContentId));
    };

    if (contacts.length === 0) {
        return (
            <EmptyItemsPanel />
        );
    }

    return (
        <Box width="100%" height={"100%"} sx={{ overflowY: "auto" }}>
            {
                contacts.map(c => (<IndicatorListItem
                    key={c.contactContentId}
                    onClick={() => handleItemClicked(c)}
                    text={
                        DateTime.fromISO(c.contactedAt)
                            .toFormat("yyyy/MM/dd - HH:mm")
                    }
                    subText={
                        c.title
                    }
                    selected={c.contactContentId === selectedId}
                />))
            }
        </Box>
    );
};
