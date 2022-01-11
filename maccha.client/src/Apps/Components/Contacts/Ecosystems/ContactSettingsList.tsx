import { List, Box, ListItem, Button, ListItemText, Typography, useTheme, Menu, MenuItem, Divider } from "@mui/material";
import { ContactSettingsStore } from "Apps/Models/Stores/Contacts/ContactSettingsStore";
import { useObserver, useDispatch } from "react-relux";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useAppNavigate } from "Libs/Routing/RouterConfig";
import { ContactsStore } from "Apps/Models/Stores/Contacts/ContactsStore";
import { ListAlt } from "@mui/icons-material";
import { RoundedListItem } from "Apps/Components/commons/RoundedListItem";
import { services } from "../../../Services";
import { RoleType } from "Apps/Models";
import { useIntupDialog } from "Libs/Dialogs/useInputDialog";
import { useNotifybar } from "Libs/Dialogs/useNotifybar";
import { Spacer } from "Libs/Components";
import { AuthStore } from "Apps/Models/Stores/Auth/AuthStore";
import { LoginInfo } from "Apps/Models/Domain/auth/login-info";
import { roles } from "Apps/roles";

export const ContactSettingsList = () => {
    const list = useObserver(ContactSettingsStore, s => s.contactSettings);
    const selectedSettingId = useObserver(ContactSettingsStore, s => s.selectedSettingId);
    const [t] = useTranslation();
    const dispatch = useDispatch(ContactSettingsStore);
    const dispatchContacts = useDispatch(ContactsStore);
    const navigate = useAppNavigate();
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const role = useObserver(AuthStore, s => s.loginInfo?.role ?? RoleType.None);
    const selectedId = useRef<string | null>(null);

    const { show } = useNotifybar();

    useEffect(() => {
        dispatchContacts(s => s.loadAsync(selectedSettingId));
    }, [selectedSettingId]);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, id: string) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
        selectedId.current = id;
    };

    const createContactSetting = async () => {
        await navigate("/contacts/new/edit");
    };

    const handleContactSettingClicked = (settingId: string) => {
        dispatch(s => s.select(settingId));
    };

    const handleCloseMenu = () => {
        selectedId.current = null;
        setAnchorEl(null);
    };

    const handleEdit = () => {
        const selected = selectedId.current;
        navigate("/contacts/" + selected + "/edit");
        handleCloseMenu();
    };

    const handleRemove = async () => {
        const selected = selectedId.current;
        handleCloseMenu();

        try {
            if (!selected) {
                throw new Error();
            }

            await dispatch(s => s.removeItemAsync(selected));
            show(t("削除しました"));
        }
        catch {
            show(t("削除に失敗しました"));
        }
    };

    if (list.length === 0) {
        return (
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                height="100%"
                width="100%"
            >
                {
                    roles.contactSettings.remove.includes(role) && <Box py={4}>
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
                }
                <Spacer />
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
                    >{t("0 件です")}</Typography>
                </Box>
                <Spacer />
            </Box>
        );
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            height="100%"
            width="100%"
        >
            <Box py={4}>
                {
                    roles.contactSettings.remove.includes(role) && <Box py={4}>
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
                }
            </Box>
            <Box width="100%">
                <List>
                    {
                        list.map(x => <RoundedListItem
                            key={x.contactSettingId}
                            onClick={() => handleContactSettingClicked(x.contactSettingId)}
                            text={x.name}
                            selected={x.contactSettingId === selectedSettingId}
                            optionEnabled={roles.contactSettings.remove.includes(role)}
                            onOptionClicked={e => handleOpenMenu(e, x.contactSettingId)}
                        />)
                    }
                </List>
            </Box>

            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={!!anchorEl}
                onClose={handleCloseMenu}
                PaperProps={{
                    style: {
                        maxHeight: 48 * 4.5,
                        width: "20ch",
                    },
                }}
            >
                <MenuItem onClick={() => handleEdit()}>
                    編集
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleRemove}>
                    削除
                </MenuItem>
            </Menu>
        </Box >
    );
};