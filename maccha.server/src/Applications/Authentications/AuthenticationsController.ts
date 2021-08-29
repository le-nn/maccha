import { Controller, Body, Post, Get, UseGuards, Inject, Put } from "@nestjs/common";
import { ApiTags, ApiBody, ApiOperation, ApiCreatedResponse, ApiResponse } from "@nestjs/swagger";
import { LoginParams } from "./params/login.params";
import { FailedResponse } from "../Commons/failed-response";
import { AuthService } from "@/Models/Authentications/auth.service";
import { AuthGuard } from "../Commons/auth-guard";
import { Claim } from "../Commons/user.decorator";
import { LoginResponse } from "./responses/login.response";
import { LoginInfoResponse } from "./responses/login-info.response";
import { LoginUser } from "@/Models/Authentications/login-user";
import { RefreshParams } from "./params/RefreshParams";

/**
 * provide users endpoints.
 */
@ApiTags("Authentications")
@Controller({ path: "api/auth" })
export class AuthenticationsController {
    constructor(@Inject("AuthService") private readonly authService: AuthService) { }

    /**
     * login
     * @param id web-sites id
     */
    @ApiOperation({ summary: "トークンを検証します.", description: "auth" })
    @ApiResponse({ type: () => LoginInfoResponse })
    @UseGuards(AuthGuard)
    @Get()
    public validate(@Claim() info: LoginUser): LoginInfoResponse {
        return new LoginInfoResponse(info);
    }

    /**
     * login
     * @param id web-sites id
     */
    @ApiOperation({ summary: "ログインします.", description: "public" })
    @ApiBody({ type: () => LoginParams, description: "取得するWEBサイトのWEBサイトID" })
    @ApiCreatedResponse({ type: LoginResponse })
    @Post()
    public async login(@Body() loginInfo: LoginParams): Promise<(LoginResponse) | FailedResponse> {
        const login = await this.authService.loginAsync(loginInfo.email, loginInfo.password);
        return new LoginResponse({
            userId: login.userId,
            refreshToken: login.refreshToken,
            token: login.token,
            email: login.email,
            name: login.name,
            role: login.role,
            exp: login.exp,
            iat: login.iat,
            identifier: login.identifier,
            avatar: login.avatar
        });
    }

    /**
     * login
     * @param id web-sites id
     */
    @ApiOperation({ summary: "トークンをリフレッシュします..", description: "public" })
    @ApiBody({ type: () => LoginParams, description: "ログイン情報" })
    @ApiCreatedResponse({ type: LoginResponse })
    @Put()
    public async refresh(@Body() params: RefreshParams): Promise<(LoginResponse) | FailedResponse> {
        const login = await this.authService.refresh(params.refreshToken, params.identifier);
        return new LoginResponse({
            userId: login.userId,
            refreshToken: login.refreshToken,
            token: login.token,
            email: login.email,
            name: login.name,
            role: login.role,
            exp: login.exp,
            iat: login.iat,
            identifier: login.identifier,
            avatar: login.avatar
        });
    }
}
