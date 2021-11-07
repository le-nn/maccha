import React, { ReactNode, useEffect, useState } from "react";
import { Box, Grow, ThemeProvider } from "@mui/material";
import { lightTheme } from "./theme";
import { useTranslation } from "react-i18next";
import { AppRouterProvider, Route, useAppLocation, useAppNavigate } from "Libs/Routing/RouterConfig";
import "./i18n";
import { routes } from "Apps/routes";
import { services } from "./Services";
import { setUrl } from "./Repositories/config";
import { Frame } from "Libs/Frame";
import LoginPage from "Apps/Components/login/LoginPage";
import { MacchaConfig, OptionProvider } from "./Hooks/useOption";
import { DialogProvider } from "Libs/Dialogs/DialogProvider";
import { build } from "./Models/Stores";
import { StoreProvider } from "react-relux";

const bootstrap = async () => {
    await services.authService.refreshAsync();
    await services.webSiteManagementsService.fetchWebsitesAsync();
    await services.pluginsService.fetchAsync();
    await services.usersService.fetchUesrsAsync();
};

const defaults: MacchaConfig = {
    apiServerHost: "",
    pathPrefix: "",
};

interface MacchaManagerProps {
    option: MacchaConfig;
}

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
        t,
        pathPrefix: option.pathPrefix,
    });
    const [storeProvider] = useState(build());

    const resolvePathPrefix = (path: string) => {
        if (path[0] !== "/") {
            return "/" + path;
        }
        return path;
    };

    const routePressed = async (e: Route) => {
        history(router.basepath + e.path);
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
    ]);

    const init = async (option: MacchaConfig) => {
        try {
            services.authService.initialize();
            if (!services.authService.isLogin) {
                setLoginPage(<LoginPage />);
                return;
            }

            if (location.pathname === option?.pathPrefix) {
                history(option?.pathPrefix + "/posts");
            }

            await bootstrap();
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
                            <Frame menus={router.routes}
                                routePressed={routePressed}>
                                <Grow key={location.key} in>
                                    <Box sx={{ height: "100%" }}>
                                        <AppRouterProvider config={router} />
                                    </Box>
                                </Grow>
                            </Frame>}
                    </OptionProvider>
                </DialogProvider>
            </ThemeProvider>
        </StoreProvider>
    );
};
