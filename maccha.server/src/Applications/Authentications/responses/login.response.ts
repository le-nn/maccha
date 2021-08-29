import { Token } from "@/Models/Authentications/token";
import { LoginUser } from "@/Models/Authentications/login-user";
import { RoleType } from "@/Models/Users/role.enum";

export class LoginResponse implements Token, LoginUser {
    readonly token: string = "";
    readonly refreshToken: string = "";
    readonly iat: number = 0;
    readonly userId: string = "";
    readonly exp: number = 0;
    readonly email: string = "";
    readonly role: RoleType = RoleType.None;
    readonly name: string = "";
    readonly identifier: string = "";
    readonly avatar: string = "";

    constructor(params: (Token & LoginUser)) {
        Object.assign(this, params);
    }
}