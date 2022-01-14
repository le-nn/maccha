import React, { ReactNode, useContext, useEffect, useState } from "react";
import { Avatar, Box, Button, Grow, ListItemText, MenuItem, Select, ThemeProvider, Typography, useMediaQuery, useTheme } from "@mui/material";
import { lightTheme } from "./theme";
import { useTranslation } from "react-i18next";
import { AppRouterProvider, Route, useAppLocation, useAppNavigate } from "Libs/Routing/RouterConfig";
import "./i18n";
import { routes } from "Apps/routes";
import { services } from "./Services";
import { axios, setUrl } from "./Repositories/config";
import { Frame } from "Libs/Frame";
import LoginPage from "Apps/Components/login/LoginPage";
import { MacchaConfig, OptionProvider, useOption } from "./Hooks/useOption";
import { DialogProvider } from "Libs/Dialogs/DialogProvider";
import { build } from "./Models/Stores";
import { StoreProvider, useDispatch, useObserver } from "react-relux";
import { Provider } from "relux.js";
import { observer } from "mobx-react";
import { WebSite } from "./Models/Domain/sites/web-site";
import { AuthStore } from "./Models/Stores/Auth/AuthStore";
import { t } from "i18next";

const bootstrap = async (auth: AuthStore) => {
    await auth.refreshAsync();
    await services.webSiteManagementsService.fetchWebsitesAsync();
    await services.pluginsService.fetchAsync();
    await services.usersService.fetchUesrsAsync();
};

const defaults: MacchaConfig = {
    apiServerHost: "",
    pathPrefix: "",
};

export interface MacchaManagerProps {
    option: MacchaConfig;
}

export {
    MacchaConfig
};

export let stores: Provider | null = null;

/**
 * entry pont.
 * @param config config option params.
 */
export const MacchaManager = (props: MacchaManagerProps) => {
    const history = useAppNavigate();
    const location = useAppLocation();
    const [loginPage, setLoginPage] = useState<ReactNode | null>(null);
    const [option, setOption] = useState(defaults);
    const { t } = useTranslation();
    const router = routes({
        t: t as any,
        pathPrefix: option.pathPrefix,
    });
    const [storeProvider] = useState(() => stores = build());

    const resolvePathPrefix = (path: string) => {
        if (path.length > 0 && path[0] !== "/") {
            return "/" + path;
        }
        return path;
    };

    useEffect(() => {
        setUrl(props.option.apiServerHost === "/" ? "" : props.option.apiServerHost);
        const newOption = {
            ...defaults,
            ...props.option,
            pathPrefix: resolvePathPrefix(props.option.pathPrefix),
        };
        setOption(newOption);
        init(newOption);
    }, [
        props.option.apiServerHost,
        props.option.logo,
        props.option.pathPrefix,
        storeProvider,
    ]);

    const init = async (option: MacchaConfig) => {
        try {
            const authStore = storeProvider.resolve(AuthStore);
            authStore.initialize();
            if (!authStore.state.isLogin) {
                setLoginPage(<LoginPage />);
                return;
            }

            if (location.pathname === option?.pathPrefix) {
                history(option?.pathPrefix + "/posts");
            }

            await bootstrap(authStore);
        }
        catch {
            setLoginPage(<LoginPage />);
        }
    };

    return (
        <StoreProvider provider={storeProvider}>
            <ThemeProvider theme={lightTheme}>
                <DialogProvider>
                    <OptionProvider option={option}>
                        {loginPage ?
                            loginPage
                            :
                            <Main />
                        }
                    </OptionProvider>
                </DialogProvider>
            </ThemeProvider>
        </StoreProvider>
    );
};

const Main = () => {
    const history = useAppNavigate();
    const location = useAppLocation();
    const { t } = useTranslation();
    const option = useOption();
    const router = routes({
        t: t as any,
        pathPrefix: option.pathPrefix,
    });
    const role = useObserver(AuthStore, s => s.loginInfo?.role);

    const resolvePathPrefix = (path: string) => {
        if (path.length > 0 && path[0] !== "/") {
            return "/" + path;
        }
        return path;
    };

    const routePressed = async (e: Route) => {
        history(router.basepath + e.path);
    };

    return <Frame menus={router.routes.filter(x => x.roles?.includes(role))}
        commandBox={isOpene => <NavigationHeader
            open={isOpene}
        />}
        routePressed={routePressed}>
        <Grow key={location.key} in>
            <Box sx={{ height: "100%" }}>
                <AppRouterProvider config={router} />
            </Box>
        </Grow>
    </Frame>;
};

const NavigationHeader = observer(({
    open,
}: {
    open: boolean,
}) => {
    const theme = useTheme();
    const user = useObserver(AuthStore, s => s.loginInfo);
    const dispach = useDispatch(AuthStore);
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

    const handleChangeWebSiteIdentifier = async (webSite: WebSite) => {
        try {
            await dispach(auth => auth.refreshAsync(webSite.webSiteId));
        }
        catch {
            console.log("failed to refresh");
        }
        finally {
            window.location.reload();
        }
    };

    const logout = () => {
        dispach(s => s.logout());
        window.location.reload();
    };

    if (!user) {
        return <>NO User</>;
    }

    return (
        <Box
            width="100%"
            my={3}
        >
            <Box display="flex"
                alignItems="center"
                padding={open ? 1 : 0}
                mt={2}>
                <Box padding={1}>
                    <Avatar src={`${axios.defaults.baseURL}${user.avatar}`}
                        alt={user.name}
                        style={{
                            width: open ? "72px" : "36px",
                            height: open ? "72px" : "36px",
                            background: theme.palette.primary.main
                        }}
                    />
                </Box>
                <Box flex="1 1 auto" marginLeft={1} width="calc(100% - 94px)">
                    <Typography
                        variant="h6"
                        style={{ fontWeight: "bold" }}>
                        {user.name}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" >
                        {user.email}
                    </Typography>
                </Box>
            </Box>

            {(open) && <Box px={2} >
                <Select
                    variant="outlined"
                    value={user.webSiteId}
                    color="primary"
                    label="ログイン中のサイト"
                    fullWidth
                >
                    {
                        services.webSiteManagementsService.webSites.map((w) => (
                            <MenuItem
                                key={w.name}
                                // button
                                value={w.webSiteId}
                                onClick={() => handleChangeWebSiteIdentifier(w)}
                            >
                                <ListItemText>
                                    {w.displayName}
                                </ListItemText>
                            </MenuItem>
                        ))
                    }
                </Select>

                <Box p={2}>
                    <Button onClick={logout} fullWidth>
                        {t("ログアウト")}
                    </Button>
                </Box>
            </Box>
            }
        </Box>
    );
});