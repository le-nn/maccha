import React from "react";
import { PreloadableComponent } from "../../Commons/lazyWithPreload";
import { Route as RouteInfo, ChildRoute } from "../../Models";
import { LoginUser } from "../../Models/auth/login-user";
interface FrameProp {
    menus: (LazyRoute & RouteInfo)[];
    settings: (LazyRoute & RouteInfo)[];
    user: LoginUser;
    logo: (isOpen: boolean) => JSX.Element;
    toolbarContent: React.ReactElement;
}
export default function Frame(props: FrameProp): JSX.Element;
export interface LazyRoute {
    lazyComponent: PreloadableComponent<any>;
    lazyChildren?: (LazyRoute & ChildRoute)[];
}
export {};
