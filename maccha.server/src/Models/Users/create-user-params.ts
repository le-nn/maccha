import { RoleType } from "./role.enum";

/**
 * Express to create user parameters
 */
export interface ICreateUserParams {
    name: string;
    email: string;
    password: string;
    role: RoleType;
    isActive: boolean;
    identifiers: string[]
}