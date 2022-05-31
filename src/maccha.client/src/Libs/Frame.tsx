import React, { useState, useRef, useEffect } from "react";
import { useTheme, Theme, css } from "@mui/material";
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
import { Route } from "./Routing/RouterConfig";
import { Spacer } from "./Components";

const closeWidth = 60;
const drawerWidth = 360;
const AUTO_CLOSE_WIDTH = 1280;

interface FrameProps {
    logo?: (isOpen: boolean) => React.ReactNode;
    commandBox?: (isOpen: boolean) => React.ReactNode;
    toolbarContent?: () => React.ReactNode;
    children: React.ReactNode;
    navigation: (isOpen: boolean) => React.ReactNode;
}

const _window: Window | any = typeof window === "undefined" ? {} : window;

export const Frame = (props: FrameProps) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [mobileOpen, setMobileOpen] = React.useState(AUTO_CLOSE_WIDTH <= _window.innerWidth);
    const [t] = useTranslation();


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

    return (
        <div css={classes.root}>
            <Hidden xsUp implementation="js">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    css={classes.drawerPaperOpen}
                    elevation={5}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    <nav css={classes.drawer}>
                        <div style={{ width: drawerWidth }}>
                            <div css={classes.toolbar} />
                            {/* Navigation */}
                            {props.navigation && props.navigation(mobileOpen)}
                        </div>
                    </nav>
                </Drawer>
            </Hidden>
            <Hidden xsDown lgUp implementation="js">
                <nav css={classes.mdDrawer}
                >
                    <Drawer
                        css={mobileOpen ? classes.mdDrawerPaperOpen : classes.mdDrawerPaperClose}
                        variant={mobileOpen ? "temporary" : "persistent"}
                        open
                        elevation={5}
                        onClose={() => setMobileOpen(false)}
                    >
                        <Box sx={{ width: drawerWidth, height: "100%", display: "flex", flexDirection: "column" }}>
                            <Box>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={handleDrawerToggle}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Box>

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
                                {props.commandBox && props.commandBox(mobileOpen)}
                            </Box>

                            {/* Navigation */}
                            {props.navigation(mobileOpen)}
                        </Box>
                    </Drawer>
                </nav>
            </Hidden>
            <Hidden mdDown implementation="js">
                <nav css={classes.drawer}
                    style={{ width: mobileOpen ? drawerWidth : closeWidth }}
                    aria-label="mailbox folders">
                    <Drawer
                        css={mobileOpen ? classes.drawerPaperOpen : classes.drawerPaperClose}
                        variant="permanent"
                        open
                        elevation={5}
                    >
                        <Box sx={{ width: drawerWidth, height: "100%", display: "flex", flexDirection: "column" }}>
                            <Box>
                                <IconButton
                                    onClick={handleDrawerToggle}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Box>

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
                                {props.commandBox && props.commandBox(mobileOpen)}
                            </Box>
                            {/* Navigation */}
                            {props.navigation(mobileOpen)}
                        </Box>
                    </Drawer>
                </nav>
            </Hidden>
            <main css={classes.content} >
                {props.children}
            </main>
        </div >
    );
};

type DrawerPropos = {
    menus: Route[];
    routePressed: (route: Route) => void | Promise<void>;
    selectedPath?: string;
    isOpen?: boolean;
}

export const NavigationList = (props: DrawerPropos) => {
    const location = useLocation();
    const theme = useTheme();
    const parent = useRef<HTMLDivElement>(null);
    const rectElement = useRef<HTMLDivElement>(null);

    const [lastPeressed, setLastPressed] = useState(location.pathname);
    const [lastTop, setLastTop] = useState(-1);
    const [currentElement, setCurrentElement] = useState<HTMLDivElement | null>(null);

    const { selectedPath } = props;

    const isCurrentRoute = (path: string) => {

        return path === selectedPath;
    };

    const routePressed = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, route: Route) => {
        props.routePressed(route);
    };

    useEffect(() => {
        setLastPressed(location.pathname);
    }, [location.pathname]);

    useEffect(() => {
        if (currentElement) {
            moveCaretPosition(currentElement, 10);
        }
    });

    useEffect(() => {
        if (currentElement) {
            moveCaretPosition(currentElement, 10);
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

    const router = props.menus.reduce((x, y) => ({
        ...x,
        [y.group ?? "menu||-1"]: [...(x[y.group ?? "-1|menu"] ?? []), y]
    }), {} as { [key: string]: Route[] });
    const routes = Object.keys(router).map(key => {
        const [menu, spacer, sort] = key.split("|");
        return ({
            menu: menu,
            order: Number(sort),
            spacer: !!Number(spacer),
            routes: router[key]
        });
    }).sort(x => x.order);

    return (
        <div
            ref={parent}
            css={css({
                flex: "1 1 auto",
            })}>
            <List sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%"
            }}>
                {routes.map(menu =>
                    <React.Fragment key={menu.menu}>
                        {menu.spacer && <Spacer />}
                        <Box key={menu.menu}>
                            <Typography
                                style={{ marginLeft: "12px", marginBottom: "0", color: theme.palette.grey[500] }}
                                variant="caption"
                                pl={props.isOpen ? 3 : 0}
                            >
                                {menu.menu}
                            </Typography>
                            {
                                menu.routes.map(route =>
                                    <React.Fragment key={route.path}>
                                        <Box
                                            key={route.path}
                                            margin="auto"
                                            height="58px"
                                            display="flex"
                                            bgcolor={isCurrentRoute(route.path) ? "rgba(127,127,127,0.04)" : ""}
                                        >
                                            <ListItem
                                                button
                                                ref={elem => isCurrentRoute(route.path) && setCurrentElement(elem)}
                                                onClick={e => routePressed(e, route)}>
                                                <Box
                                                    display={"flex"}
                                                    alignItems="center"
                                                    color={theme.palette.grey[700]}
                                                    pl={props.isOpen ? 3 : 0}
                                                >
                                                    {route.icon()}
                                                    <Box sx={{ fontSize: "0.9rem" }} ml={5}>
                                                        {route.title}
                                                    </Box>
                                                </Box>
                                            </ListItem>
                                        </Box>
                                    </React.Fragment>
                                )
                            }
                        </Box>
                    </React.Fragment>
                )}
            </List>
            <div ref={rectElement} style={{
                background: theme.palette.primary.main,
                width: "3px",
                transition: "all 0.7s cubic-bezier(1, 0.37, 0.16, 0.97)",
                position: "absolute",
                borderRadius: "4px"
            }}></div>
        </div >
    );
};

const useStyles =
    (theme: Theme) => ({
        root: css({
            display: "flex",
            overflow: "hidden"
        }),
        drawer: css({
            [theme.breakpoints.up("sm")]: {
                width: drawerWidth,
                flexShrink: 0,
            },
            transition: theme.transitions.create(["width"], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
        mdDrawer: css({
            width: "60px",
        }),
        mdDrawerPaperOpen: css({
            '& .MuiDrawer-paper': {
                overflow: "auto",
                width: drawerWidth,
                border: 0,
            }
        }),
        mdDrawerPaperClose: css({
            '& .MuiDrawer-paper': {
                overflow: "auto",
                width: "60px",
                border: 0,
            }
        }),
        appBar: css({
            zIndex: 9999,
        }),
        toolbar: css({
            marginRight: "12px",
            marginLeft: "12px",
            height: 60
        }),
        drawerPaperOpen: css({
            '& .MuiDrawer-paper': {
                overflow: "auto",
                overflowX: "hidden",
                width: drawerWidth,
                height: "100%",
                border: 0,
                transition: theme.transitions.create(["width"], {
                    easing: theme.transitions.easing.easeInOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                background: theme.palette.background.paper,
                boxShadow: theme.shadows[5]
            }
        }),
        drawerPaperClose: css({
            '& .MuiDrawer-paper': {
                overflow: "auto",
                overflowX: "hidden",
                width: closeWidth,
                height: "100%",
                border: 0,
                transition: theme.transitions.create(["width"], {
                    easing: theme.transitions.easing.easeInOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                background: theme.palette.background.paper,
                boxShadow: theme.shadows[5]
            },
        }),
        content: css({
            flexGrow: 1,
            padding: theme.spacing(0),
            width: `calc(100vw - ${drawerWidth}px)`,
        }),
        mainContainer: css({
            height: "calc(100vh - 64px)",
            overflow: "hidden"
        })
    });
