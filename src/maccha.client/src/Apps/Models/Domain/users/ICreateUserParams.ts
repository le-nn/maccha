import { RoleType } from "../auth/role";

export interface ICreateUserParams {
    webSiteIds: string[];
    name: string;
    email: string;
    role: RoleType;
    isActive: boolean;
    password: string;
}