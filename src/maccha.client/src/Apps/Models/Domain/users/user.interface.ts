import { RoleType } from "../auth/role";
import { IWebSite } from "../sites/web-site.interface";

export interface IUser {
    /**
     * user id
     */
    readonly userId: string;

    /**
     * is active user
     */
    readonly isActive: boolean;

    /**
     * user name
     */
    readonly name: string;

    /**
     * email
     */
    readonly email: string;

    /**
     * user role
     */
    readonly role: RoleType;

    /**
     * web sites
     */
    readonly webSiteIds: string[];

    /**
     * avata iamage url.
     */
    readonly avatar:string;
}
