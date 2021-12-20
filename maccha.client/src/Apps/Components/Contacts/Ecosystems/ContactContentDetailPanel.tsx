import { Typography, useTheme } from "@mui/material";
import { Box, Backdrop } from "@mui/material";
import { ContactContentContextStore } from "Apps/Models/Stores/Contacts/ContactContextStore";
import React, { useEffect } from "react";
import { useDispatch, useObserver } from "react-relux";
import { DateTime } from "luxon";
import { FlexSpacer } from "Apps/Components/commons";
import { useTranslation } from "react-i18next";
import { MailOutline } from "@mui/icons-material";
import { ContactsStore } from "Apps/Models/Stores/Contacts/ContactsStore";

export const ContactContentDetailPanel = () => {
    const detail = useObserver(ContactContentContextStore, s => s.contact);
    const theme = useTheme();
    const [t] = useTranslation();

    if (!detail) {
        return (
            <Box
                width="100%"
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Box textAlign="center">
                    <MailOutline
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
                    >{t("選択されていません")}</Typography>
                </Box>
            </Box>
        );
    }

    return (
        <Box
            width="100%"
            p={2}
        >
            <Box p={2}>
                <Typography>{detail.contactContentId}</Typography>
            </Box>

            <Box p={2} sx={{
                display: "flex",
            }}>
                <Typography>{t("お問い合わせ日時")}</Typography>
                <FlexSpacer />
                <Typography>
                    {DateTime.fromISO(detail?.contactedAt ?? "").toFormat("yyyy/MM/dd - HH:mm")}
                </Typography>
            </Box>

            <Box>
                {detail?.fields.map(f =>
                    <Box key={f.contactContentFieldId} p={2}>
                        <Box>
                            <Typography>{f.name}</Typography>
                        </Box>
                        <Box p={3}
                            mt={2}
                            sx={{
                                borderRadius: "8px",
                                background: theme.palette.background.default
                            }}>
                            <Typography>{f.value}</Typography>
                        </Box>
                    </Box>)}
            </Box>
        </Box>
    );
};