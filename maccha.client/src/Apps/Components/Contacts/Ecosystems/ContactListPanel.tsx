import { ListItem, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import { ContactSettingsStore } from "Apps/Models/Stores/Contacts/ContactSettingsStore";
import { ContactsStore } from "Apps/Models/Stores/Contacts/ContactsStore";
import React, { useEffect } from "react";
import { useDispatch, useObserver } from "react-relux";

export const ContactListPanel = () => {
    const selectedSettingId = useObserver(ContactSettingsStore, s => s.selectedSettingId);
    const contacts = useObserver(ContactsStore, s => s.contacts);
    const dispatch = useDispatch(ContactsStore);

    useEffect(() => {
        if (selectedSettingId) {
            dispatch(s => s.loadAsync(selectedSettingId));
        }
    }, [selectedSettingId]);

    return (
        <Box width="100%">
            {
                contacts.map(c => (<ListItem key={c.contactedAt}>
                    <ListItemText primary={c.contactedAt}>
                    </ListItemText>
                </ListItem>))
            }
        </Box>
    );
};
