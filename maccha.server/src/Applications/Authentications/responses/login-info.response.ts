import { RoleType } from "@/Models/Users/role.enum";
import { LoginUser } from "@/Models/Authentications/login-user";

export class LoginInfoResponse implements LoginUser {
    public readonly email: string = "";
    public readonly role: RoleType = RoleType.None;
    public readonly name: string = "";
    public readonly userId: string = "";
    public readonly iat: number = 0;
    public readonly exp: number = 0;
    public readonly identifier: string = "";
    public readonly avatar: string = "";
    constructor(params: LoginUser) {
        Object.assign(this, params);
    }
}