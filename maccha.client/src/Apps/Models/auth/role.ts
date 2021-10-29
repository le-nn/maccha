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
    Admin = toUInt(-1),
}

export const displayRoles: { [key: string]: string } = {
    0: "ゲスト",
    1: "購読者",
    2: "投稿者",
    4: "編集者",
    4294967295: "管理者"
};
