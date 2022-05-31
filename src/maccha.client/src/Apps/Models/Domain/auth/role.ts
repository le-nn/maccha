/**
 * Express user type bit flags.
 */
export enum RoleType {
    None = 0,
    Subscribe = 1,
    Post = 2,
    Edit = 4,
    Admin = 4294967295 ,
}

export const displayRoles: { [key: string]: string } = {
    0: "ゲスト",
    1: "購読者",
    2: "投稿者",
    4: "編集者",
    4294967295: "管理者"
};
