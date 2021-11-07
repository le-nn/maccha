import React, { useEffect, useState } from "react";
import { ContactSettingsList } from "../Ecosystems/ContactSettingsList";
import { useMatch } from "@reach/router";
import { ContactsStore } from "Apps/Models/Stores/Contacts/ContactsStore";
import { IContactSetting } from "Apps/Models/Domain/Contacts/ContactSettings";
import { services } from "Apps/Services";
import { useDispatch, useObserver } from "react-relux";
import { ContactSettingContextStore } from "Apps/Models/Stores/Contacts/ContactSettingContextStore";
import { useLoading } from "Libs/Dialogs/useLoading";
import { useOption } from "Apps/Hooks/useOption";
import { Box } from "@mui/system";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ContactSettingSchemePanel } from "../Ecosystems/ContactSettingSchemePanel";
import { ContactSettingEmailPanel } from "../Ecosystems/ContactSettingEmailPanel";
import { ArrowBack, ArrowLeft, ArrowLeftSharp, Save } from "@mui/icons-material";
import { useAppNavigate } from "Libs/Routing/RouterConfig";
import { FlexSpacer } from "Apps/Components/commons";

export default () => {
    const option = useOption();
    const match = useMatch(`/${option.pathPrefix}/contacts/:contactSettingId/edit`);
    const dispatch = useDispatch(ContactSettingContextStore);
    const settingContext = useObserver(ContactSettingContextStore, s => s.contactSetting);
    const { setIsLoading } = useLoading();
    const { t } = useTranslation();
    const navigate = useAppNavigate();
    const { begin, end } = useLoading();

    const handleBack = () => {
        navigate("contacts");
    };

    const handleSave = async () => {
        begin();
        await dispatch(s => s.saveSettingAsync());
        end();
        handleBack();
    };

    useEffect(() => {
        const contactSettingId = match?.contactSettingId;
        if (match?.contactSettingId === "new") {
            dispatch(s => s.initAsNewSetting());
        }
        else if (contactSettingId) {
            dispatch(s => s.loadSettingAsync(contactSettingId));
        }
    }, []);

    useEffect(() => {
        setIsLoading(!settingContext);
    }, [settingContext]);

    const changeSettingContext = (key: keyof IContactSetting, value: any) => {
        if (!settingContext) {
            return;
        }

        dispatch(s => s.modifySetting({
            ...settingContext,
            [key]: value
        }));
    };

    if (!settingContext) {
        return <></>;
    }

    return <Box p={4} sx={{
        height: "100%",
        overflowY: "auto"
    }}>
        <Box display="flex" alignItems="center">
            <IconButton onClick={() => handleBack()}>
                <ArrowBack />
            </IconButton>
            <Typography variant="h5">{t("お問い合わせ設定")}</Typography>
            <FlexSpacer />

            <Button
                onClick={handleSave}
                variant="contained"
            >
                <Save />
                <Box ml={1} />
                {t("保存")}
            </Button>
        </Box>
        <Box
            display="flex"
            flexDirection="column"
            mt={4}
        >
            <Box>
                <TextField
                    onChange={e => changeSettingContext("name", e.target.value)}
                    label={t("名前")} />
            </Box>

            <Box mt={4}>
                <ContactSettingSchemePanel />
            </Box>

            <Box mt={4}>
                <ContactSettingEmailPanel />
            </Box>
        </Box>
    </Box>;
};