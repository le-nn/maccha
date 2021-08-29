import React, { Suspense, useState, useRef, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, useTheme, Theme, createStyles } from "@material-ui/core/styles";
import { fromEvent, timer, from } from "rxjs";
import { pairwise, map, concatMap } from "rxjs/operators";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { PreloadableComponent } from "../../Commons/lazyWithPreload";
import { Route as RouteInfo, ChildRoute } from "../../Models";
import MenuIcon from "@material-ui/icons/Menu";
import {
    Box,
    ListItemText,
    ListItemIcon,
    ListItem,
    List,
    Icon,
    IconButton,
    Typography,
    Hidden,
    Drawer,
    Toolbar,
    Divider, Avatar, Grow
} from "@material-ui/core";
import { LoginUser } from "../../Models/auth/login-user";
import { axios } from "../../Repositories/config";

const closeWidth = 52;
const drawerWidth = 320;
const AUTO_CLOSE_WIDTH = 960;

interface FrameProp {
    menus: (LazyRoute & RouteInfo)[];
    settings: (LazyRoute & RouteInfo)[];
    user: LoginUser;
    logo: (isOpen: boolean) => JSX.Element;
    toolbarContent: React.ReactElement;
}

type FramwRoute = (LazyRoute & ChildRoute);

function flatten<T extends (ChildRoute | RouteInfo)>(route: (LazyRoute & T)): (LazyRoute & T)[] {
    if (route.lazyChildren && route.lazyChildren.length) {
        const c = route.lazyChildren.reduce(
            (dst, route) => [...flatten<ChildRoute>(route), ...dst],
            [] as (LazyRoute & ChildRoute)[]
        ) as any;
        return [route, ...c];
    }
    return [route];
};

export default function Frame(props: FrameProp) {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = React.useState(AUTO_CLOSE_WIDTH <= window.innerWidth);
    const [isLoading, setIsLoading] = useState(false);
    const theme = useTheme();

    const menus = props.menus.reduce(
        (dst, route) => [...flatten<RouteInfo>(route), ...dst],
        [] as (FramwRoute)[]
    );
    const settings = props.settings.reduce(
        (dst, route) => [...flatten<RouteInfo>(route), ...dst],
        [] as (FramwRoute)[]
    );

    const routes = [...menus, ...settings];

    const [animationKey, setAnimationKey] = useState("");
    const isAnimating = useRef(false);

    useEffect(() => {
        if (isAnimating.current) {
            return;
        }

        isAnimating.current = true;
        setAnimationKey(location.key ?? "");
        setTimeout(() => {
            isAnimating.current = false;
        }, 600);
    }, [location.key]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    fromEvent(window, "resize").pipe(
        map(e => window.innerWidth),
        pairwise(),
    ).subscribe(e => {
        const [beforeWidth, currentWidth] = e;

        if (AUTO_CLOSE_WIDTH < currentWidth) {
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

    const routePressed = async (route: FramwRoute) => {
        const timeout = timer(1000).subscribe(() => setIsLoading(true));
        await from(route.lazyComponent.preload())
            .pipe(
                concatMap(_ => timer(300))
            ).toPromise();
        timeout.unsubscribe();
        queueMicrotask(() => {
            if (isLoading) setIsLoading(false);
        });
        history.push(route.path);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
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
                    <nav className={classes.drawer}
                        aria-label="mailbox folders">
                        <div style={{ width: drawerWidth }}>
                            <div className={classes.toolbar} />
                            <NavigationList
                                menus={props.menus}
                                settings={props.settings}
                                routePressed={routePressed} />
                        </div>
                    </nav>
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="js">
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

                            <Box ml={mobileOpen ? 4 : 1} display="flex" alignItems="center">
                                {props.logo(mobileOpen)}
                            </Box>

                            {/* Profile */}
                            <Box display="flex"
                                alignItems="center"
                                padding={mobileOpen ? "8px" : "0px"}
                                mt={2}>
                                <Box padding={"8px"}>
                                    <Avatar src={`${axios.defaults.baseURL}${props.user.avatar}`}
                                        alt={props.user.name}
                                        style={{
                                            width: mobileOpen ? "72px" : "36px",
                                            height: mobileOpen ? "72px" : "36px",
                                            background: theme.palette.primary.main
                                        }}
                                    />
                                </Box>
                                <Box flex="1 1 auto" marginLeft="8px" width="calc(100% - 94px)">
                                    <Typography
                                        variant="h6"
                                        style={{ fontWeight: "bold" }}>
                                        {props.user.name}
                                    </Typography>
                                    <Typography variant="caption" style={{ color: "rgb(168,168,168)" }} >
                                        {props.user.email}
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Navigation */}
                            <NavigationList
                                menus={props.menus}
                                settings={props.settings}
                                routePressed={routePressed} />
                        </div>
                    </Drawer>
                </nav>
            </Hidden>
            <Grow key={animationKey} timeout={600} in={true}>
                <main className={classes.content} >
                    <Toolbar className={classes.toolbar}
                        style={{ marginRight: "0px", paddingRight: "4px" }}>
                        <Hidden smUp implementation="js">
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerToggle}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Hidden>
                        <Box
                            display="flex"
                            alignItems="center"
                            width="100%">
                            {props.toolbarContent}
                        </Box>
                    </Toolbar>

                    <Divider style={{ marginLeft: "8px", marginRight: "8px" }} />

                    <div className={classes.mainContainer}>
                        <Suspense fallback={
                            !isLoading && <div style={{ display: "none" }}></div>
                        }>
                            <Switch>
                                {routes.map((route, index) => (
                                    <Route key={index} exact={!!route.exact} path={route.path} component={route.lazyComponent} ></Route>
                                ))}
                            </Switch>
                        </Suspense>
                    </div>
                </main>
            </Grow>
        </div >
    );
}

export interface LazyRoute {
    lazyComponent: PreloadableComponent<any>;
    lazyChildren?: (LazyRoute & ChildRoute)[];
}

type DrawerPropos<T extends RouteInfo> = {
    menus: T[];
    settings: T[];
    routePressed: (route: T) => void | Promise<void>;
}

function NavigationList<T extends RouteInfo>(props: DrawerPropos<T>) {
    const location = useLocation();
    const theme = useTheme();
    const parent = useRef<HTMLDivElement>(null);
    const rectElement = useRef<HTMLDivElement>(null);

    const [lastPeressed, setLastPressed] = useState(location.pathname);
    const [lastTop, setLastTop] = useState(-1);
    const [currentElement, setCurrentElement] = useState<HTMLDivElement | null>(null);

    const isCurrentRoute = (path: string) => path.includes(lastPeressed) || lastPeressed.includes(path);

    const routePressed = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, route: T) => {
        props.routePressed(route);
        setLastPressed(route.path);
    };

    useEffect(() => {
        if (currentElement) {
            moveCaretPosition(currentElement, 6);
        }
    });

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

    return (
        <div ref={parent}>
            <List>
                <Typography
                    style={{ marginLeft: "12px", marginBottom: "0px", color: theme.palette.grey[500] }}
                    variant="caption"
                >
                    Menu
                </Typography>
                {props.menus.map((route, index) => (
                    <Box
                        key={index}
                        margin="auto"
                        height="44px"
                        display="flex"
                        bgcolor={isCurrentRoute(route.path) ? "rgba(127,127,127,0.08)" : ""}
                    >
                        <ListItem button
                            ref={elem => isCurrentRoute(route.path) && setCurrentElement(elem)}
                            onClick={e => routePressed(e, route)}>
                            <ListItemIcon >
                                <Icon>{route.icon}</Icon>
                            </ListItemIcon>
                            <ListItemText primary={route.title} />
                        </ListItem>
                    </Box>
                ))}
            </List>

            <List component="nav">
                {!!props.settings.length && <Typography
                    style={{ marginLeft: "12px", marginBottom: "0px", color: theme.palette.grey[500] }}
                    variant="caption"
                >
                    Admin
                </Typography>}
                {props.settings.map(route => (
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
                                <Icon>{route.icon}</Icon>
                            </ListItemIcon>
                            <ListItemText primary={route.title} />
                        </ListItem>
                    </Box>
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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            overflow: "hidden"
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
            }),
        },
        drawerPaperClose: {
            overflow: "auto",
            width: closeWidth,
            border: 0,
            transition: theme.transitions.create(["width"], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
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