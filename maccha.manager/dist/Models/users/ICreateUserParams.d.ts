import { RoleType } from "..";
export interface ICreateUserParams {
    identifiers: string[];
    name: string;
    email: string;
    role: RoleType;
    isActive: boolean;
    password: string;
}
