function toUInt(value: number) {
    return value >>> 0;
}

/**
 * Express user type bit flags.
 */
export enum RoleType {
    None = 0,
    Subscribe = 1,
    Post = 1 << 1,
    Edit = 1 << 2,
    Admin = 4294967295
}
