import { RoleType } from "../auth/role";
import { WebSite } from "../sites/web-site";
import { IUser } from "./user.interface";

/**
 * Express user entity.
 */
export class User implements IUser {
    /**
     * user id
     */
    public userId: string;

    /**
     * is active user
     */
    public isActive: boolean;

    /**
     * user name
     */
    public name: string;

    /**
     * email
     */
    public email: string;

    /**
     * user role
     */
    public role: RoleType;

    /**
     * web sites
     */
    public identifiers: string[];

    /**
     * avatar image url.
     */
    public avatar: string;

    /**
     * constructor
     * @param userId user id
     * @param name name
     * @param email user email
     * @param password user password
     * @param role user role
     * @param isActive is active user
     * @param identifiers web sites that user can login
     */
    constructor(
        userId: string,
        name: string,
        email: string,
        role: RoleType,
        isActive: boolean,
        identifiers: string[],
        avatar: string
    ) {
        this.userId = userId;
        this.isActive = isActive;
        this.name = name;
        this.email = email;
        this.role = role;
        this.identifiers = identifiers;
        this.avatar = avatar;
    }

    /**
     * clone this instance
     */
    public clone(): User {
        return new User(this.userId, this.name, this.email, this.role, this.isActive, this.identifiers, this.avatar);
    }

    public with(params: Partial<User>) {
        const user = this.clone();
        Object.assign(user, params);
        return user;
    }
}
