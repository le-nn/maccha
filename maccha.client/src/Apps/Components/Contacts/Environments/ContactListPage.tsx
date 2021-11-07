import { Divider, Grid } from "@mui/material";
import { ContactSettingContextStore } from "Apps/Models/Stores/Contacts/ContactSettingContextStore";
import { ContactSettingsStore } from "Apps/Models/Stores/Contacts/ContactSettingsStore";
import React, { useEffect } from "react";
import { useDispatch, useObserver } from "react-relux";
import { ContactListPanel } from "../Ecosystems/ContactListPanel";
import { ContactSettingsList } from "../Ecosystems/ContactSettingsList";
import { ContactSettingDisplayPanel } from "./ContactSettingDisplayPanel";

export default () => {
    const selectedSettingId = useObserver(ContactSettingsStore, s => s.selectedSettingId);
    const dispatch = useDispatch(ContactSettingContextStore);

    useEffect(() => {
        if (selectedSettingId) {
            dispatch(s => s.loadSettingAsync(selectedSettingId));
        }
    }, [selectedSettingId]);

    return <>
        <Grid container sx={{
            height: "100%"
        }}>
            <Grid sm={3} lg={3} item sx={{ display: "flex" }}>
                <ContactSettingsList />
                <Divider orientation="vertical" flexItem />
            </Grid>
            <Grid sm={3} lg={2} item sx={{ display: "flex" }}>
                <ContactListPanel />
                <Divider orientation="vertical" flexItem />
            </Grid>
            <Grid sm={3} lg={5} item sx={{ display: "flex" }}>
                <ContactListPanel />
                <Divider orientation="vertical" flexItem />
            </Grid>
            <Grid sm={2} lg={2} item sx={{ display: "flex" }}>
                <ContactSettingDisplayPanel />
            </Grid>
        </Grid>
    </>;
};