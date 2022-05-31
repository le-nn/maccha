import { RoleType } from "../auth/role";

export interface IUpdateUserParams {
    webSiteIds: string[];
    userId: string;
    name: string;
    email: string;
    role: RoleType;
    isActive: boolean;
}
