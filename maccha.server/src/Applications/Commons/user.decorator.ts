import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

const jwtService = new JwtService({});

export const Claim = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();

        const headers = request.headers.authorization;
        if (!headers) return undefined;
        const loginInfo = jwtService.decode(headers) as any;
        if (loginInfo) {
            return {
                userId: loginInfo.userId,
                role: Number(loginInfo.role),
                email: loginInfo.email,
                name: loginInfo.name,
                identifier: loginInfo.identifier,
                exp: loginInfo.exp,
                iat: loginInfo.iat
            };
        }
    },
);
