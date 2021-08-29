import React, { useEffect, useState, ReactComponentElement, cloneElement } from "react";
import {
    Avatar,
    Box,
    Icon,
    makeStyles,
    TextField,
    Typography,
    useTheme,
    Tab,
    Tabs,
    Paper,
    Button,
    Select,
    MenuItem, ListItemText, Fab
} from "@material-ui/core";
import { observer, useObserver } from "mobx-react";
import { services } from "../../../Services";
import { FlexSpacer, messageAsync } from "../../../Components/commons";
import SwipeableViews from "react-swipeable-views";
import { UserSettingPanel } from "../Ecosystems/UserSettingPanel";
import { WebSiteSettingPanel } from "../Ecosystems/WebSiteSettingPanel";
import { WebSite } from "../../../Models/sites/web-site";
import { User } from "../../../Models/users/user";
import { showFilePickerAsync } from "../Ecosystems/showFilePickerAsync";
import { axios } from "../../../Repositories/config";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index } = props;

    return (
        <>
            {value === index && (children)}
        </>
    );
}


export default observer(() => {
    const theme = useTheme();
    const [selectedTab, setSelectedTab] = useState(0);
    const { usersService, authService, webSiteManagementsService } = services;
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        usersService.selectUserAsync(authService.loginInfo.userId);
        webSiteManagementsService.selectWebSiteAsync(authService.loginInfo.identifier);
    }, []);

    async function handleChangeWebSiteIdentifier(webSite: WebSite) {
        try {
            await services.authService.refreshAsync(webSite.webSiteId);
        }
        catch {
            console.log("failed to refresh");
        }
        finally {
            window.location.assign("/settings");
        }
    };

    function handleChangeWebSite(key: keyof WebSite, value: any) {
        if (!isChanged) {
            setIsChanged(true);
        }

        const webSite = webSiteManagementsService.selected;
        if (webSite) {
            webSiteManagementsService.setSelectedWebSite(webSite.with({
                [key]: value
            }));
        }
    }

    function handleChangeUser(key: keyof User, value: any) {
        if (!isChanged) {
            setIsChanged(true);
        }

        const user = usersService.selected;
        if (user) {
            usersService.setSelectedUser(user.with({
                [key]: value
            }));
        }
    }

    async function saveAsync() {
        setIsChanged(false);
        await Promise.all([
            services.webSiteManagementsService.saveAsync(),
            services.usersService.saveSelectedUserAsync()
        ]);
        messageAsync("保存しました");
    }

    async function opanPickerAsync() {
        const file = await showFilePickerAsync();
        if (file) {
            await usersService.saveMyAvatarAsync(file);
            await services.authService.refreshAsync();
        }
    }

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
            style={{ background: theme.palette.background.default }}
            flexWrap="wrap"
            overflow="auto"
        >
            <Box
                p={2}
                display="flex"
                maxWidth="380px"
                width="100%"
                flexDirection="column"
                alignItems="center"
                maxHeight="100%"
                top="0px"
                overflow="auto"
                mb="auto"
            >
                <Box mt={2}></Box>
                <Box
                    position="relative"
                >
                    <Avatar
                        src={axios.defaults.baseURL + services.authService.loginInfo.avatar}
                        style={{
                            width: "180px",
                            height: "180px"
                        }}
                    />
                    <Fab
                        style={{
                            position: "absolute",
                            bottom: "8px",
                            right: "8px"
                        }}
                        color="primary"
                        size="small"
                        onClick={() => opanPickerAsync()}
                    >
                        <Icon>edit</Icon>
                    </Fab>
                </Box>


                <Box mt={4}></Box>
                <Typography variant="h6">Current Identifier </Typography>
                <Select
                    style={{ marginTop: "16px", color: theme.palette.text.primary }}
                    variant="outlined"
                    value={authService.loginInfo.identifier}
                    color="primary"
                    label="ログイン中のサイト"
                    fullWidth
                >
                    {
                        webSiteManagementsService.webSites.map((w, i) => (
                            <MenuItem
                                key={i}
                                value={w.webSiteId}
                                button
                                onClick={() => handleChangeWebSiteIdentifier(w)}
                            >
                                <ListItemText>
                                    {w.name}
                                </ListItemText>
                            </MenuItem>
                        ))
                    }
                </Select>

                <Box mt={4}></Box>
                <Tabs
                    indicatorColor="primary"
                    orientation="vertical"
                    value={selectedTab}
                    onChange={(_, e) => setSelectedTab(e)}
                    style={{ width: "100%" }}
                >
                    <Tab icon={<Icon>account_circle</Icon>} label="プロフィール" />
                    <Tab icon={<Icon>view_module</Icon>} label="サイト管理" />
                </Tabs>
            </Box>

            {/* Tab content */}
            <Box
                flex="1 1 auto"
                overflow="auto"
                height="100%"
            >
                <SwipeableViews index={selectedTab}
                    axis="x"
                    style={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                    onChangeIndex={(_, e) => setSelectedTab(e)}
                >
                    <TabPanel
                        value={selectedTab}
                        index={0}
                    >
                        <Box mt={4} p={2} display="flex">
                            <Typography variant="h4">Profile Settings</Typography>
                            <FlexSpacer />
                            <Button
                                disabled={!isChanged}
                                color="primary"
                                variant="contained"
                                onClick={_ => saveAsync()}
                            >
                                <Icon style={{ marginRight: "4px" }}>save</Icon>
                                保存
                            </Button>
                        </Box>
                        <UserSettingPanel onChange={(k, v) => handleChangeUser(k, v)} />
                    </TabPanel>
                    <TabPanel
                        value={selectedTab}
                        index={1}
                    >
                        <Box mt={4} display="flex" width="600px">
                            <Typography variant="h4">Web Site Settings</Typography>
                            <FlexSpacer />
                            <Button
                                disabled={!isChanged}
                                color="primary"
                                variant="contained"
                                onClick={_ => saveAsync()}
                            >
                                <Icon style={{ marginRight: "4px" }}>save</Icon>
                                保存
                            </Button>
                        </Box>
                        <WebSiteSettingPanel onChange={(k, v) => handleChangeWebSite(k, v)} />
                    </TabPanel>
                </SwipeableViews>
            </Box>
        </Box>
    );
});