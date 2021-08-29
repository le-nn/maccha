import { RoleType } from "./auth/role";

export interface Route {
    path: string;
    to?: string;
    title: string;
    icon: string;
    component: () => Promise<any>;
    role: RoleType;
    exact?: boolean;
    children?: ChildRoute[];
}

export interface ChildRoute {
    path: string;
    component: () => Promise<any>;
    exact?: boolean;
    children?: ChildRoute[];
}