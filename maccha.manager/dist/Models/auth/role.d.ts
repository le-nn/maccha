/**
 * Express user type bit flags.
 */
export declare enum RoleType {
    None = 0,
    Subscribe = 1,
    Post = 2,
    Edit = 4,
    Admin
}
export declare const displayRoles: {
    [key: string]: string;
};
