import { Add, Delete, Edit } from "@mui/icons-material";
import { IconButton, List, ListItem, ListItemButton, ListItemText, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { FlexSpacer } from "Apps/Components/commons";
import { ContactSettingContextStore } from "Apps/Models/Stores/Contacts/ContactSettingContextStore";
import { useIntupDialog } from "Libs/Dialogs/useInputDialog";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useObserver } from "react-relux";

export const ContactSettingSchemePanel = () => {
    const dispatch = useDispatch(ContactSettingContextStore);
    const settingContext = useObserver(ContactSettingContextStore, s => s.contactSetting);
    const theme = useTheme();
    const { showMessageAsync } = useIntupDialog();
    const { t } = useTranslation();

    if (!settingContext) {
        return <></>;
    }

    const add = async () => {
        const name = await showMessageAsync(t("フィールド名を入力してください"));
        if (name) {
            dispatch(s => s.modifySetting({
                ...settingContext,
                schemes: [
                    ...settingContext.schemes,
                    name
                ]
            }));
        }
    };

    const edit = async (scheme: string) => {
        const name = await showMessageAsync(
            t("フィールド名を入力してください"),
            "",
            {
                defaultText: scheme
            });
        if (name) {
            const schemes = settingContext.schemes;
            const i = schemes.indexOf(scheme);
            schemes[i] = name;
            dispatch(s => s.modifySetting({
                ...settingContext,
                schemes: [...schemes]
            }));
        }
    };

    const remove = async (scheme: string) => {
        dispatch(s => s.modifySetting({
            ...settingContext,
            schemes: [...settingContext.schemes.filter(x => x !== scheme)]
        }));
    };

    return (
        <Box maxWidth="600px">
            <Box display="flex" alignItems="center">
                <Typography>
                    {t("フィールド")}
                </Typography>
                <FlexSpacer />
                <IconButton onClick={add}>
                    <Add />
                </IconButton>
            </Box>
            <Box
                sx={{
                    background: theme.palette.background.default,
                    overflowY: "auto"
                }}
                height="280px"
            >
                <List>
                    {
                        settingContext.schemes.map(s => <ListItem
                            key={s}
                            title={s}
                            secondaryAction={
                                <>
                                    <IconButton onClick={() => edit(s)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => remove(s)}>
                                        <Delete />
                                    </IconButton>
                                </>
                            }
                        >
                            <ListItemText primary={s}></ListItemText>
                        </ListItem>)
                    }
                </List>
            </Box>
        </Box>
    );
};