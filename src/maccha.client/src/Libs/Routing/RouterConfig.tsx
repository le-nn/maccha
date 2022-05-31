import React, { ReactNode, Suspense, useContext, useEffect, useState } from "react";
import { Router, useLocation, navigate, NavigateFn, NavigateOptions } from "@reach/router";
import loadable, { LoadableComponent } from "@loadable/component";
import { css } from "@mui/styled-engine";

export {
    Route,
    ChildRoute,
    RouterConfig,
    useAppLocation,
    useAppNavigate,
    AppRouterProvider
};

const useAppLocation = () => useLocation();
const useAppNavigate = (): NavigateFn => {
    const option = useContext(RouterConfigContext);
    if (option) {
        // eslint-disable-next-line @typescript-eslint/ban-types
        const n = async (to: string, options?: NavigateOptions<{}>) => {
            const path = option.basepath + (to[0] === "/" ? to : "/" + to);
            navigate(path.replace("*", ""), options);
        };
        return n as any;
    }

    const n = async (to: string, options?: NavigateOptions<{}>) => {
        navigate(to.replace("*", ""), options);
    };
    return n as any;
};

const RouterConfigContext = React.createContext<RouterConfig | null>(null);


const ChildRouteContext = React.createContext<ChildRoute[] | undefined>([]);

type LazyComponent = Promise<{ default: React.ComponentType<any>; }> | ReactNode;

interface ChildRoute {
    path: string;
    component: () => LazyComponent;
    exact?: boolean;
    children?: ChildRoute[];
}

interface Route extends ChildRoute {
    path: string;
    title: string;
    icon: () => React.ReactNode;
    roles?: any[];
    children?: ChildRoute[];
    group?: string;
}

interface RouterConfig {
    basepath: string;
    homepath: string;
    routes: Route[];
}

interface AppRouterProps {
    config: RouterConfig;
}

const getLoadableOrNode = (c: () => LazyComponent) => {
    const d = c();
    if (d instanceof Promise) {
        return loadable(() => d);
    }
    else {
        return d;
    }
};

const AppRouterProvider = ({ config }: AppRouterProps) => {
    const { basepath, routes } = config;
    return (
        <RouterConfigContext.Provider value={config}>
            <Router
                basepath={basepath}
                css={css({
                    height: "100%",
                    width: "100%"
                })}
            >
                {
                    routes
                        .map(route =>
                            <ProjectRouteLazy
                                routes={route.children}
                                key={route.path}
                                path={route.path}
                                page={getLoadableOrNode(route.component)}
                            />
                        )
                }
            </Router >
        </RouterConfigContext.Provider>
    );
};

interface PageLazyProps {
    page: any;
    path: string;
    routes?: ChildRoute[];
}

const ProjectRouteLazy = (props: PageLazyProps) => {
    return (
        <ChildRouteContext.Provider value={props.routes}>
            <props.page />
        </ChildRouteContext.Provider >
    );
};

interface ChildRouterProps {
    additionalRoutes?: ChildRoute[];
}

export const ChildRouter = (props: ChildRouterProps) => {
    const context = useContext(ChildRouteContext);
    const children = context ?? [];
    const routes = [...children, ...(props.additionalRoutes ?? [])];
    if (!routes.length) {
        return <></>;
    }

    return (
        <ChildRouteContext.Provider value={routes}>
            <Router css={css({
                height: "100%",
                width: "100%"
            })}>
                {routes.map(route =>
                    <ChildRoute
                        key={route.path}
                        path={route.path}
                        page={<ChildRouteRenderer page={route.component} />}
                    />
                )}
            </Router>
        </ChildRouteContext.Provider>
    );
};

interface ChildRouteProps {
    page: any;
    path: string;
}

const ChildRoute = (props: ChildRouteProps) => {
    return (
        < >
            {props.page}
        </>
    );
};

const getAsyncNodeOrNode = (c: () => LazyComponent) => {
    const d = c();
    if (d instanceof Promise) {
        return d.then(p => <p.default />);
    }
    else {
        return Promise.resolve(d);
    }
};

const ChildRouteRenderer = (route: { page: () => LazyComponent }) => {
    const [component, setComponent] = useState<any>(<></>);

    useEffect(() => {
        getAsyncNodeOrNode(route.page).then(c => {
            setComponent(c);
        });
    }, []);

    return <>{component}</>;
};