import React, { useEffect, useRef } from "react";
import { setUrl } from "./Repositories/config";
import { services } from "./Services";
import { config as routeConfig } from "./Routes";
import { createBrowserHistory } from "history";
import MacchaMain from "./Components/main/MacchaMain";
import { Route } from "./Models/route";
import { Theme } from "@material-ui/core";
import ReactDOM from "react-dom";

import "./styles/style.scss";

interface MacchaAppContext {
    theme: Theme;
}

export interface MacchaCofig {
    host: string,
    plugins: Route[];
    logo?: (isOpen: boolean) => JSX.Element;
}

const macchaConfig = {
    host: "",
};

function setConfig(config?: Partial<MacchaCofig>) {
    Object.assign(macchaConfig, config);
    setUrl(macchaConfig.host === "/" ? "" : macchaConfig.host);
}

async function bootstrap() {
    await (async () => {
        await services.authService.refreshAsync();
        await services.webSiteManagementsService.fetchWebsitesAsync();
        await services.pluginsService.fetchAsync();
    })();

    services.usersService.fetchUesrsAsync();
}

/**
 * entry pont.
 * @param config config option params.
 */
export async function MacchaManager(config?: Partial<MacchaCofig>) {
    services.authService.initialize();
    setConfig(config);

    const history = createBrowserHistory();

    const loadPageTask = Promise.all(
        routeConfig.hiddenRoutes.map(async route => ({ ...route, loadedComponent: (await route.component()).default })),
    );

    try {
        if (!services.authService.isLogin) {
            history.push("/login");
        }
        else if (history.location.pathname === "/") {
            history.push("/posts");
            await bootstrap();
        }
        else {
            await bootstrap();
        }
    }
    catch {
        history.push("/login");
    }

    const hiddenLazyRoutes = await loadPageTask;

    // AuthGuard
    const filteredMenus = [
        ...routeConfig.displayRoutes,// standard routes
        ...(config?.plugins ?? []) // option specified
    ];
    const filteredSettings = routeConfig.footerRoutes;

    return () => (
        <MacchaMain
            hiddenLazyRoutes={hiddenLazyRoutes}
            menus={filteredMenus}
            settings={filteredSettings}
            history={history}
            logo={config?.logo}
        />
    );
}

// (async () => {
//     const App = await MacchaManager({
//         host: "/",
//         plugins: [
//         ]
//     });
//     ReactDOM.render(
//         <App />,
//         document.getElementById("root")
//     );
// })();