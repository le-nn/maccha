import { RoleType } from "./role";

export interface LoginUser {
    email: string;
    role: RoleType;
    name: string;
    iat: number;
    exp: number;
    avatar: string;
}
