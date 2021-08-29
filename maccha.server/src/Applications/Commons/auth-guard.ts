import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject } from "@nestjs/common";
import { AuthService } from "@/Models/Authentications/auth.service";
import { Reflector } from "@nestjs/core";
import { RoleType } from "@/Models/Users/role.enum";
import { LoginUser } from "@/Models/Authentications/login-user";

export class AuthGuard implements CanActivate {
    constructor(
        @Inject(AuthService) private readonly authService: AuthService,
        private reflector: Reflector
    ) {
    }
    public async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const header = request.headers.authorization;
        const loginInfo = await this.authService.validateAsync<LoginUser>(header);
        const metaDataRole = Number(this.reflector.get<string[]>("role", context.getHandler()));
        if (loginInfo) {
            if (!metaDataRole || metaDataRole <= loginInfo.role) {
                return true;
            }
            throw new UnauthorizedException(`role is invalid. you need over ${RoleType[metaDataRole]}, but your role is ${RoleType[loginInfo.role]}.`);
        }
        throw new UnauthorizedException("Unauthorized token");
    }
}