import { RoleType } from "../Users/role.enum";
import { WebSite } from "../WebSites/web-site";

export interface LoginUser {
    userId: string;
    email: string;
    role: RoleType;
    name: string;
    iat: number;
    exp: number;
    identifier: string;
    webSiteId: string;
    avatar: string;
}