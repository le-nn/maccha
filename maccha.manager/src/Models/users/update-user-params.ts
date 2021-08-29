import { RoleType } from "../auth/role";

export interface IUpdateUserParams {
    identifiers: string[];
    userId: string;
    name: string;
    email: string;
    role: RoleType;
    isActive: boolean;
}
