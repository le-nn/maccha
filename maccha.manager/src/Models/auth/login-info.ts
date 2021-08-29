import { LoginUser } from "./login-user";
import { Token } from "./token";
import { RoleType } from "./role";

export class LoginInfo implements LoginUser, Token {
    public readonly token = "";
    public readonly refreshToken = "";
    public readonly email = "";
    public readonly role: RoleType = 0;
    public readonly identifier: string = "";
    public readonly name = "";
    public readonly iat = 0;
    public readonly exp = Number.MAX_SAFE_INTEGER;
    public readonly userId = "";
    public readonly avatar = "";
    constructor(params?: LoginInfo) {
        Object.assign(this, params);
    }
}
