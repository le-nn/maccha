import { RoleType } from "./role.enum";

/**
 * Express user entity.
 */
export class User {
    /**
     * user id
     */
    public readonly userId: string;

    /**
     * Avater Image URL.
     */
    public readonly avatar: string;

    /**
     * is active user
     */
    public readonly isActive: boolean;

    /**
     * user name
     */
    public readonly name: string;

    /**
     * email
     */
    public readonly email: string;

    /**
     * password
     */
    public readonly password: string;

    /**
     * user role
     */
    public readonly role: RoleType;

    /**
     * identifiers
     */
    public readonly identifiers: string[];

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
        password: string,
        role: RoleType,
        isActive: boolean,
        identifiers: string[],
        avatar: string
    ) {
        this.userId = userId;
        this.isActive = isActive;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.identifiers = identifiers;
        this.avatar = avatar;
    }
}