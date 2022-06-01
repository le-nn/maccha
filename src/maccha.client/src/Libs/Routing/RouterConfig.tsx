import React, { ReactNode, useContext, useEffect, CSSProperties, useState, useRef } from "react";
import { Router, useLocation, navigate, Redirect, } from "@reach/router";
import loadable from "@loadable/component";
import { css } from "@emotion/react";

export {
    Route,
    ChildRoute,
    RouterConfig,
    useAppLocation,
    useAppNavigate,
    AppRouterProvider,
    AppRoutes
};

const useAppLocation = () => useLocation();
const useAppNavigate = () => navigate;

const RouterConfigContext = React.createContext<ChildRoute[] | undefined>([]);

type LazyComponent = Promise<{ default: React.ComponentType<any>; }> | ReactNode;

interface ChildRoute {
    path: string;
    component: () => LazyComponent;
    exact?: boolean;
    children?: ChildRoute[];
}

interface Route extends ChildRoute {
    path: string;
    to: string;
    name: string;
    title: string;
    icon: () => React.ReactNode;
    roles?: number[];
    children?: ChildRoute[];
    group?: string;
}

interface RouterConfig {
    basepath: string;
    homepath: string;
    routes: Route[];
}

interface AppRouterProps {
    basepath: string;
    homepath: string;
    children?: ReactNode;
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

const AppRouterProvider = (config: AppRouterProps) => {
    const { basepath, homepath, children } = config;
    const navigate = useAppNavigate();
    // useEffect(() => {
    //     navigate(homepath);
    // }, []);

    return (
        <Router
            basepath={basepath}
            style={{ height: "100%" }}
        >
            <Child path="/*" c={children} />
        </Router >
    );
};

const Child = ({ path, c }: { path: string, c: ReactNode }) => <>{c}</>;

const AppRoutes = ({
    routes,
    className,
    style
}: {
    routes: Route[],
    className?: string,
    style?: CSSProperties,
}) => {
    return (
        <Router
            className={className}
            style={style}
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
        </Router>
    );
};

interface PageLazyProps {
    page: any;
    path: string;
    routes?: ChildRoute[];
}

const ProjectRouteLazy = (props: PageLazyProps) => {
    return (
        <RouterConfigContext.Provider value={props.routes}>
            <props.page />
        </RouterConfigContext.Provider >
    );
};

interface ChildRouterProps {
    additionalRoutes?: ChildRoute[];
    className?: string;
    style?: CSSProperties;
}

export const ChildRouter = (props: ChildRouterProps) => {
    const context = useContext(RouterConfigContext);
    const children = context ?? [];

    const routes = [...children, ...(props.additionalRoutes ?? [])];

    if (!routes.length) {
        return <></>;
    }

    return (
        <RouterConfigContext.Provider value={routes}>
            <Router
                className={props.className}
                style={props.style}
            >
                {routes.map(route =>
                    <ChildRoute
                        key={route.path}
                        path={route.path}
                        page={route.component}
                    />
                )}
            </Router>
        </RouterConfigContext.Provider>
    );
};

interface ChildRouteProps {
    page: any;
    path: string;
}

const ChildRoute = (props: ChildRouteProps) => {
    const [component, setComponent] = useState(null);
    const isMount = useRef(true);

    useEffect(() => {
        const page = props.page;
        if (typeof page === "function") {
            const componentOrPromise = page();
            if (componentOrPromise instanceof Promise) {
                componentOrPromise.then(p => {
                    const PPP = p?.default;
                    if (isMount.current && PPP)
                        setComponent(<PPP /> as any);
                });
            }
            else {
                setComponent(componentOrPromise);
            }
        }

        return () => {
            isMount.current = false;
            setComponent(null);
        };
    }, []);

    return (
        <>
            {component}
        </>
    );
};