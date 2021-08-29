import { RoleType } from "@/Models/Users/role.enum";
import { ICreateUserParams } from "@/Models/Users/create-user-params";
import { IsString, Contains, IsNumber, MinLength, ArrayMinSize, IsBoolean, Matches } from "class-validator";

/**
 * Express to create user parameters
 */
export class CreateUserParams implements ICreateUserParams {
    @IsBoolean()
    isActive!: boolean;

    @IsString()
    @MinLength(1)
    name!: string;

    @Matches(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/, { message: "invalid email adress" })
    email!: string;

    @IsString()
    password!: string;

    @ArrayMinSize(0)
    identifiers!: string[];

    @IsNumber()
    role!: RoleType;
}