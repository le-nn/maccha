import { LoginUser } from "./login-user";
import { Token } from "./token";
import { RoleType } from "./role";
export declare class LoginInfo implements LoginUser, Token {
    readonly token = "";
    readonly refreshToken = "";
    readonly email = "";
    readonly role: RoleType;
    readonly identifier: string;
    readonly name = "";
    readonly iat = 0;
    readonly exp: number;
    readonly userId = "";
    readonly avatar = "";
    constructor(params?: LoginInfo);
}
