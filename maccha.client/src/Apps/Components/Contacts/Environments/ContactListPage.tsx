import {
    css,
    Divider,
    Fade,
    Grid,
    Grow
} from "@mui/material";
import { ContactSettingContextStore } from "Apps/Models/Stores/Contacts/ContactSettingContextStore";
import { ContactSettingsStore } from "Apps/Models/Stores/Contacts/ContactSettingsStore";
import { ContactsStore } from "Apps/Models/Stores/Contacts/ContactsStore";
import React, { useEffect } from "react";
import { useDispatch, useObserver } from "react-relux";
import { ContactContentDetailPanel } from "../Ecosystems/ContactContentDetailPanel";
import { ContactListPanel } from "../Ecosystems/ContactListPanel";
import { ContactSettingsList } from "../Ecosystems/ContactSettingsList";
import { ContactSettingDisplayPanel } from "./ContactSettingDisplayPanel";

export default () => {
    const selectedSettingId = useObserver(ContactSettingsStore, s => s.selectedSettingId);
    const selectedContactContentId = useObserver(ContactsStore, s => s.selectedId);

    const dispatch = useDispatch(ContactSettingContextStore);

    useEffect(() => {
        dispatch(s => s.loadSettingAsync(selectedSettingId));
    }, [selectedSettingId]);

    return <>
        <Grid
            container
            sx={{
                height: "100%",
                width: "100%"
            }}
        >
            <Grid xs={3} item sx={{ display: "flex" }}>
                <ContactSettingsList />
                <Divider orientation="vertical" flexItem />
            </Grid>

            <Grid xs={9} item sx={{ display: "flex" }}>
                <Grow key={selectedSettingId} in>
                    <div
                        css={css({
                            height: "100%",
                            width: "100%"
                        })}
                    >
                        <Grid
                            container
                            sx={{
                                height: "100%"
                            }}
                        >
                            <Grid xs={3} item sx={{ display: "flex" }}>
                                <ContactListPanel />
                                <Divider orientation="vertical" flexItem />
                            </Grid>
                            <Grid xs={9} item sx={{ display: "flex" }}>
                                <Fade key={selectedContactContentId} in>
                                    <div
                                        css={css({
                                            height: "100%",
                                            width: "100%"
                                        })}
                                    >
                                        <Grid
                                            container
                                            sx={{
                                                height: "100%",
                                            }}
                                        >
                                            <Grid xs={8} item sx={{ display: "flex" }}>
                                                <ContactContentDetailPanel />
                                                <Divider orientation="vertical" flexItem />
                                            </Grid>

                                            <Grid xs={4} item sx={{ display: "flex" }}>
                                                <ContactSettingDisplayPanel />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Fade>
                            </Grid>
                        </Grid>
                    </div>
                </Grow>
            </Grid>
        </Grid>
    </>;
};