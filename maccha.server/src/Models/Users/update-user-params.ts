import { RoleType } from "./role.enum";

/**
 * Express to create user parameters
 */
export interface IUpdateUserParams {
    userId: string;
    name: string;
    email: string;
    role: RoleType;
    isActive: boolean;
    identifiers: string[];
}