import { Add, Delete, Edit } from "@mui/icons-material";
import { Button, Grid, IconButton, List, ListItem, ListItemButton, ListItemText, TextField, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { FlexSpacer } from "Apps/Components/commons";
import { IContactEmailSetting, IContactSetting } from "Apps/Models/Domain/Contacts/ContactSettings";
import { ContactSettingContextStore } from "Apps/Models/Stores/Contacts/ContactSettingContextStore";
import { useIntupDialog } from "Libs/Dialogs/useInputDialog";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useObserver } from "memento.react";

export const ContactSettingEmailPanel = () => {
    const dispatch = useDispatch(ContactSettingContextStore);
    const settingContext = useObserver(ContactSettingContextStore, s => s.contactSetting);
    const theme = useTheme();
    const { showMessageAsync } = useIntupDialog();
    const { t } = useTranslation();
    const [selectedIndex, setSelectedIndex] = useState(0);

    if (!settingContext) {
        return <></>;
    }

    const add = async () => {
        await dispatch(s => s.modifySetting({
            ...settingContext,
            emailSettings: [
                ...settingContext.emailSettings,
                {
                    bodyTemplate: "",
                    from: "",
                    header: "",
                    titleTemplate: "",
                    to: ""
                }
            ]
        }));
        setSelectedIndex(settingContext.emailSettings.length);
    };

    const onChange = async (setting: IContactEmailSetting) => {
        const settings = settingContext.emailSettings;
        settings[selectedIndex] = setting;
        dispatch(s => s.modifySetting({
            ...settingContext,
            emailSettings: [...settings]
        }));
    };

    const remove = async (scheme: string) => {
        dispatch(s => s.modifySetting({
            ...settingContext,
            schemes: [...settingContext.schemes.filter(x => x !== scheme)]
        }));
    };

    return (
        <Box width="100%">
            <Box display="flex" alignItems="center" my={1}>
                <Typography>
                    {t("メール設定")}
                </Typography>
            </Box>
            <Box
                sx={{
                    background: theme.palette.background.default,
                    overflowY: "auto"
                }}
            >
                <Box p={2}>
                    <Button
                        onClick={() => add()}
                        variant="contained"
                        sx={{
                            borderRadius: "24px"
                        }}
                    >
                        {t("Eメール設定を追加")}
                    </Button>
                </Box>
                <Box>
                    <Grid container>
                        <Grid item xs={4}>
                            <List>
                                {
                                    settingContext.emailSettings.map((s, i) => (
                                        <ListItem
                                            key={i}
                                            button
                                            sx={{
                                                background: i === selectedIndex ?
                                                    "blue" : ""
                                            }}
                                            onClick={() => setSelectedIndex(i)}
                                        >
                                            <ListItemText primary={`${t("設定")} ${i + 1}`}></ListItemText>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </Grid>
                        <Grid item xs={8}>
                            <Box>
                                <MailSettingPanel
                                    onChange={onChange}
                                    setting={settingContext.emailSettings[selectedIndex]}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

interface MailSettingPanelProps {
    setting: IContactEmailSetting;
    onChange: (setting: IContactEmailSetting) => void;
}

const MailSettingPanel = ({ setting, onChange }: MailSettingPanelProps) => {
    const dispatch = useDispatch(ContactSettingContextStore);
    const settingContext = useObserver(ContactSettingContextStore, s => s.contactSetting);
    const theme = useTheme();
    const { showMessageAsync } = useIntupDialog();
    const { t } = useTranslation();

    if (!settingContext) {
        return <></>;
    }

    const change = (key: keyof IContactEmailSetting, value: any) => {
        onChange({
            ...setting,
            [key]: value,
        });
    };

    return (
        <Box p={4}>
            <Box p={3}>
                <TextField
                    fullWidth
                    minRows={1}
                    multiline
                    label={t("To")}
                    value={setting.to}
                    onChange={e => change("to", e.target.value)}
                />
            </Box>

            <Box p={3}>
                <TextField
                    fullWidth
                    minRows={1}
                    multiline
                    label={t("From")}
                    value={setting.from}
                    onChange={e => change("from", e.target.value)}
                />
            </Box>

            <Box p={3}>
                <TextField
                    fullWidth
                    minRows={2}
                    multiline
                    label={t("Titleテンプレート")}
                    value={setting.titleTemplate}
                    onChange={e => change("titleTemplate", e.target.value)}
                />
            </Box>

            <Box p={3}>
                <TextField
                    fullWidth
                    multiline
                    minRows={6}
                    label={t("Bodyテンプレート")}
                    value={setting.bodyTemplate}
                    onChange={e => change("bodyTemplate", e.target.value)}
                />
            </Box>

            <Box p={3}>
                <TextField
                    fullWidth
                    multiline
                    minRows={6}
                    label={t("Header")}
                    value={setting.header}
                    onChange={e => change("header", e.target.value)}
                />
            </Box>
        </Box>
    );
};