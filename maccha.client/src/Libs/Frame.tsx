import React, { useState, useRef, useEffect } from "react";
import { useTheme, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { fromEvent } from "rxjs";
import { pairwise, map } from "rxjs/operators";
import { Menu as MenuIcon } from "@mui/icons-material";
import {
    Box,
    ListItemText,
    ListItemIcon,
    ListItem,
    List,
    IconButton,
    Typography,
    Hidden,
    Drawer,
} from "@mui/material";
import { useLocation } from "@reach/router";
import { useTranslation } from "react-i18next";
import { Route, RouterConfig } from "./Routing/RouterConfig";
import { useOption } from "Apps/Hooks/useOption";
import { keys } from "@mui/system";

const closeWidth = 52;
const drawerWidth = 320;
const AUTO_CLOSE_WIDTH = 1280;

interface FrameProps {
    menus?: Route[];
    routePressed?: (route: Route) => void | Promise<void>;
    logo?: (isOpen: boolean) => React.ReactNode;
    commandBox?: (isOpen: boolean) => React.ReactNode;
    toolbarContent?: () => React.ReactNode;
    children: React.ReactNode;
}

const _window: Window | any = typeof window === "undefined" ? {} : window;

export const Frame = (props: FrameProps) => {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(AUTO_CLOSE_WIDTH <= _window.innerWidth);
    const [t] = useTranslation();

    const theme = useTheme();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    typeof window !== "undefined" && fromEvent(_window, "resize").pipe(
        map(() => _window.innerWidth),
        pairwise(),
    ).subscribe(e => {
        const [beforeWidth, currentWidth] = e;

        if (theme.breakpoints.values["lg"] < currentWidth) {
            if (beforeWidth < currentWidth) {
                setMobileOpen(true);
            }
        }
        else {
            if (beforeWidth >= currentWidth) {
                setMobileOpen(false);
            }
        }
    });

    const routePressed = (route: Route) => {
        props.routePressed && props.routePressed(route);
    };

    return (
        <div className={classes.root}>
            <Hidden xsUp implementation="js">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaperOpen,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    <nav className={classes.drawer}>
                        <div style={{ width: drawerWidth }}>
                            <div className={classes.toolbar} />
                            <NavigationList
                                menus={props.menus ?? []}
                                routePressed={e => {
                                    routePressed(e);
                                }} />
                        </div>
                    </nav>
                </Drawer>
            </Hidden>
            <Hidden xsDown lgUp implementation="js">
                <nav className={classes.mdDrawer}
                >
                    <Drawer
                        classes={{
                            paper: mobileOpen ? classes.mdDrawerPaperOpen : classes.mdDrawerPaperClose,
                        }}
                        variant={mobileOpen ? "temporary" : "persistent"}
                        open
                        onClose={() => setMobileOpen(false)}
                    >
                        <div style={{ width: drawerWidth }}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerToggle}
                            >
                                <MenuIcon />
                            </IconButton>

                            <Box display="flex"
                                alignItems="center"
                                justifyContent={mobileOpen ? "center" : "start"}
                                p={1}>
                                {props.logo && props.logo(mobileOpen)}
                            </Box>

                            {/* Profile */}
                            {/* <Box flex="1 1 auto" marginLeft="28px" width="calc(100% - 94px)">
                                <Typography variant="caption" style={{ color: "rgb(168,168,168)" }} >
                                    {mobileOpen ? t("管理者ツール") : ""}
                                </Typography>
                            </Box> */}

                            <Box display="flex"
                                alignItems="center"
                                justifyContent="center"
                                padding={mobileOpen ? "8px" : "0px"}
                                mt={2}>
                                {props.commandBox}
                            </Box>

                            {/* Navigation */}
                            <NavigationList
                                menus={props.menus ?? []}
                                routePressed={e => {
                                    setMobileOpen(false);
                                    routePressed(e);
                                }} />
                        </div>
                    </Drawer>
                </nav>
            </Hidden>
            <Hidden mdDown implementation="js">
                <nav className={classes.drawer}
                    style={{ width: mobileOpen ? drawerWidth : closeWidth }}
                    aria-label="mailbox folders">
                    <Drawer
                        classes={{
                            paper: mobileOpen ? classes.drawerPaperOpen : classes.drawerPaperClose
                        }}
                        variant="permanent"
                        open
                    >
                        <div style={{ width: drawerWidth }}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerToggle}
                            >
                                <MenuIcon />
                            </IconButton>

                            <Box display="flex"
                                alignItems="center"
                                justifyContent={mobileOpen ? "center" : "start"}
                                p={1}>
                                {props.logo && props.logo(mobileOpen)}
                            </Box>

                            {/* Profile */}
                            {/* <Box flex="1 1 auto" marginLeft="28px" width="calc(100% - 94px)">
                                <Typography variant="caption" style={{ color: "rgb(168,168,168)" }} >
                                    {mobileOpen ? t("管理者ツール") : ""}
                                </Typography>
                            </Box> */}

                            <Box display="flex"
                                alignItems="center"
                                justifyContent="center"
                                padding={mobileOpen ? "8px" : "0px"}
                                mt={2}>
                                {props.commandBox}
                            </Box>

                            {/* Navigation */}
                            <NavigationList
                                menus={props.menus ?? []}
                                routePressed={routePressed} />
                        </div>
                    </Drawer>
                </nav>
            </Hidden>
            <main className={classes.content} >
                {props.children}
            </main>
        </div >
    );
};

type DrawerPropos = {
    menus: Route[];
    routePressed: (route: Route) => void | Promise<void>;
}

function NavigationList(props: DrawerPropos) {
    const location = useLocation();
    const theme = useTheme();
    const parent = useRef<HTMLDivElement>(null);
    const rectElement = useRef<HTMLDivElement>(null);
    const routerOption = useOption();

    const [lastPeressed, setLastPressed] = useState(location.pathname);
    const [lastTop, setLastTop] = useState(-1);
    const [currentElement, setCurrentElement] = useState<HTMLDivElement | null>(null);

    const isCurrentRoute = (path: string) => {
        return lastPeressed === path.replace("*", "");
    };

    const [menus, setMenus] = useState<{
        group: string;
        routes: Route[];
    }[]>([]);

    const routePressed = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, route: Route) => {
        props.routePressed(route);
    };

    useEffect(() => {
        setLastPressed(location.pathname.replace(routerOption.pathPrefix, ""));
    }, [location.pathname]);

    useEffect(() => {
        if (currentElement) {
            moveCaretPosition(currentElement, 6);
        }
    });

    useEffect(() => {
        if (currentElement) {
            moveCaretPosition(currentElement, 6);
        }
    }, []);

    const moveCaretPosition = (targetElement: Element, margin: number) => {
        const parentRect = parent.current?.getBoundingClientRect();
        const rect = targetElement.getBoundingClientRect();
        const style = rectElement.current?.style;

        if (!parentRect || !rectElement.current || !style || rect.top === lastTop) return;

        if (lastTop < rect.top) {
            setTimeout(() => (style.top = `${rect.top + margin}px`), 150);
            style.bottom = `calc(100% - ${rect.bottom - margin}px`;
        }
        else {
            setTimeout(() => (style.bottom = `calc(100% - ${rect.bottom - margin}px`), 150);
            style.top = `${rect.top + margin}px`;
        }

        setLastTop(rect.top);
    };

    useEffect(() => {
        const group = props.menus
            .map(x => ({ ...x, group: x.group ?? "Menu" }))
            .reduce((x, y) => ({
                ...x,
                [y.group]: [...(x[y.group] ?? []), y]
            }) as any as { [key: string]: Route[] },
                {} as { [key: string]: Route[] });

        const m = Object.keys(group).map(k => ({
            group: k,
            routes: group[k],
        }));
        setMenus(m);
    }, [props.menus]);

    return (
        <div ref={parent}>
            <List>
                {menus.map(r => (
                    <React.Fragment key={r.group}>
                        <Typography
                            style={{ marginLeft: "12px", marginBottom: "0", color: theme.palette.grey[500] }}
                            variant="caption"
                        >
                            {r.group}
                        </Typography>
                        {
                            r.routes.map(route => (
                                <Box
                                    key={route.path}
                                    margin="auto"
                                    height="44px"
                                    display="flex"
                                    bgcolor={isCurrentRoute(route.path) ? "rgba(127,127,127,0.08)" : ""}
                                >
                                    <ListItem button
                                        ref={elem => isCurrentRoute(route.path) && setCurrentElement(elem)}
                                        onClick={e => routePressed(e, route)}>
                                        <ListItemIcon >
                                            {route.icon()}
                                        </ListItemIcon>
                                        <ListItemText primary={route.title} />
                                    </ListItem>
                                </Box>
                            ))
                        }
                    </React.Fragment>
                ))}
            </List>
            <div ref={rectElement} style={{
                background: theme.palette.primary.main,
                width: "6px",
                transition: "all 0.3s",
                position: "absolute"
            }}></div>
        </div >
    );
}

const useStyles = makeStyles(
    (theme: Theme) => ({
        root: {
            display: "flex",
            overflow: "hidden",
            width: "100%",
            height: "100%"
        },
        drawer: {
            [theme.breakpoints.up("sm")]: {
                width: drawerWidth,
                flexShrink: 0,
            },
            transition: theme.transitions.create(["width"], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        mdDrawer: {
            width: "52px",
        },
        mdDrawerPaperOpen: {
            overflow: "auto",
            width: drawerWidth,
            border: 0,
        },
        mdDrawerPaperClose: {
            overflow: "auto",
            width: "52px",
            border: 0,
        },
        appBar: {
            zIndex: 9999,
        },
        toolbar: {
            marginRight: "12px",
            marginLeft: "12px",
            height: 60
        },
        drawerPaperOpen: {
            overflow: "auto",
            width: drawerWidth,
            border: 0,
            transition: theme.transitions.create(["width"], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.enteringScreen,
            }) + "!important",
        },
        drawerPaperClose: {
            overflow: "auto",
            width: closeWidth,
            border: 0,
            transition: theme.transitions.create(
                ["width"],
                {
                    easing: theme.transitions.easing.easeInOut,
                    duration: theme.transitions.duration.enteringScreen,
                }) + "!important",
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(0),
            width: `calc(100vw - ${drawerWidth}px)`,
        },
        mainContainer: {
            height: "calc(100vh - 64px)",
            overflow: "hidden"
        }
    }),
);