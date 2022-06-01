import React, { ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { Avatar, Box, Button, css, Grow, ListItemText, MenuItem, Select, ThemeProvider, Typography, useMediaQuery, useTheme } from "@mui/material";
import { lightTheme } from "./theme";
import { useTranslation } from "react-i18next";
import { AppRouterProvider, AppRoutes, Route, useAppLocation, useAppNavigate } from "Libs/Routing/RouterConfig";
import "./i18n";
import { routes } from "Apps/routes";
import { services } from "./Services";
import { axios, setUrl } from "./Repositories/config";
import { Frame, NavigationList } from "Libs/Frame";
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
import { useParams, useMatch } from "@reach/router";

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
                <AppRouterProvider
                    basepath={router.basepath}
                    homepath={router.homepath}
                >
                    <DialogProvider>
                        <OptionProvider option={option}>
                            {loginPage ?
                                loginPage
                                :
                                <Main />
                            }
                        </OptionProvider>
                    </DialogProvider>
                </AppRouterProvider>
            </ThemeProvider>
        </StoreProvider>
    );
};

const Main = () => {
    const location = useAppLocation();
    const { t } = useTranslation();
    const option = useOption();
    const role = useObserver(AuthStore, s => s.loginInfo?.role);
    const navigate = useAppNavigate();
    const routeMatch = useMatch("/app/:route/*");

    const router = useMemo(() => routes({
        t: t as any,
        pathPrefix: option.pathPrefix,
    }), [role]);

    const getPath = () => {
        console.log(routeMatch?.route);
        return routeMatch?.route;
    };

    const pressed = (route: Route) => {
        navigate(route.to);
    };

    return <Frame
        commandBox={isOpene => <NavigationHeader
            open={isOpene}
        />}
        logo={open => <div css={css`
                font-size: 2.2rem;
                font-family: emoji;
                letter-spacing: 0.54rem;
                color: #54686d;
            `}>Maccha</div>}
        navigation={() => <NavigationList
            menus={[
                ...router
                    .routes
                    .filter(x => x.roles?.includes(role as any))
            ]}
            selectedPath={getPath()}
            routePressed={pressed}
        />}
    >
        <Grow key={location.key} in>
            <Box sx={{ height: "100%" }}>
                <AppRoutes
                    routes={router.routes}
                    css={css({
                        height: `100%`
                    })}
                />
            </Box>
        </Grow>
    </Frame >;
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
    const { t } = useTranslation();

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