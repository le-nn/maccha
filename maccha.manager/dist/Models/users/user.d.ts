import { RoleType } from "../auth/role";
import { IUser } from "./user.interface";
/**
 * Express user entity.
 */
export declare class User implements IUser {
    /**
     * user id
     */
    userId: string;
    /**
     * is active user
     */
    isActive: boolean;
    /**
     * user name
     */
    name: string;
    /**
     * email
     */
    email: string;
    /**
     * user role
     */
    role: RoleType;
    /**
     * web sites
     */
    identifiers: string[];
    /**
     * avatar image url.
     */
    avatar: string;
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
    constructor(userId: string, name: string, email: string, role: RoleType, isActive: boolean, identifiers: string[], avatar: string);
    /**
     * clone this instance
     */
    clone(): User;
    with(params: Partial<User>): User;
}
