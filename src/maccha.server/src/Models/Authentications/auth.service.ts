import { Injectable, BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { UsersService } from "../Users/users.service";
import { JwtService } from "@nestjs/jwt";
import { Token } from "./token";
import { RoleType } from "../Users/role.enum";
import { IAuthService } from "./auth.service.interface";
import { LoginUser } from "./login-user";
import { WebSite } from "../WebSites/web-site";
import { WebSitesService } from "../WebSites/web-sites.service";
import { identity } from "rxjs";


@Injectable()
export class AuthService implements IAuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly webSitesService: WebSitesService,
        private readonly jwtService: JwtService
    ) { }

    /**
     * login and get login info async.
     * @param email user email
     * @param password password
     */
    public async loginAsync(email: string, password: string): Promise<Token & LoginUser> {
        try {
            console.log("---------------0");
            for (const item of await this.usersService.getAll()) {
                console.log(item);
            }

            const user = await this.usersService.validateUser(email, password);
            const [webSiteId, identifier] = await (async (): Promise<[string, string] | [null, null]> => {
                if (user.role === RoleType.Admin) {
                    const [webSite] = await this.webSitesService.getAllAsync();
                    return [webSite.webSiteId, webSite.name];
                }
                else {
                    const webSiteId = user.webSiteIds[0];
                    if (!webSiteId) {
                        return [null, null];
                    }

                    const website = await this.webSitesService.getAsync(webSiteId);
                    if (!website?.name) {
                        return [null, null];
                    }

                    return [webSiteId, website.name];
                }
            })();

            if (!webSiteId || !identifier) {
                throw new Error("Login failed.");
            }

            const token = await this.generateAccessTokenAsync(
                user.userId,
                user.role,
                user.email,
                user.name,
                webSiteId);
            const refreshToken = await this.generateRefreshTokenAsync(user.userId);

            const tokenInfo = await this.validateAsync<(LoginUser & Token)>(token);
            if (tokenInfo) {
                return {
                    token,
                    refreshToken,
                    userId: user.userId,
                    identifier,
                    role: Number(user.role),
                    email: user.email,
                    name: user.name,
                    webSiteId,
                    exp: tokenInfo.exp,
                    iat: tokenInfo.iat,
                    avatar: user.avatar
                };
            }
            else {
                throw new InternalServerErrorException();
            }
        }
        catch (ex: any) {
            throw new BadRequestException(ex.message);
        }
    }

    /**
     * generate refresh token.
     * @param token token
     * @param identifier identifier
     */
    public async refresh(token: string, webSiteId: string): Promise<Token & LoginUser> {
        try {
            const user = await this.validateAsync<{ userId: string }>(token);
            if (user) {
                const newUser = await this.usersService.findByIdAsync(user.userId);
                if (!newUser) throw new Error("useid not found");

                const [newWebSiteId, newIdentifier] = await (async () => {
                    if (newUser.role === RoleType.Admin) {
                        const webSite = await this.webSitesService.getAsync(webSiteId);
                        if (!webSite) {
                            throw new Error(`Web site ${webSiteId} is not found.`);
                        }
                        return [webSite.webSiteId, webSite.name];
                    }
                    else {
                        // if include identifier that user can login.
                        if (newUser.webSiteIds.includes(webSiteId)) {
                            const webSite = await this.webSitesService.getAsync(webSiteId);
                            if (!webSite) {
                                throw new Error(`Web site ${webSiteId} is not found.`);
                            }

                            return [webSite.webSiteId, webSite.name];
                        }
                    }
                    throw new Error("identifier is not found or user has no role.");
                })();

                const newToken = await this.generateAccessTokenAsync(
                    newUser.userId,
                    newUser.role,
                    newUser.email,
                    newUser.name,
                    newWebSiteId
                );
                const tokenInfo = await this.validateAsync<(LoginUser & Token)>(newToken);
                const refreshToken = await this.generateRefreshTokenAsync(user.userId);
                if (tokenInfo) {
                    return {
                        token: newToken,
                        refreshToken,
                        userId: newUser.userId,
                        role: Number(newUser.role),
                        email: newUser.email,
                        name: newUser.name,
                        webSiteId: newWebSiteId,
                        identifier: newIdentifier,
                        exp: tokenInfo.exp,
                        iat: tokenInfo.iat,
                        avatar: newUser.avatar
                    };
                }
            }
        }
        catch (ex: any) {
            console.error(ex);
            throw new Error("Failed to refresh token.");
        }

        throw new Error("Unhandled error occured while refreshing token.");
    }

    /**
     * validate token and get login info from claim.
     * @param token target token
     * @returns login user info
     */
    public async validateAsync<T>(token: string): Promise<T | undefined> {
        try {
            const result = this.jwtService.verify(token);
            return result;
        }
        catch (ex: any) {
            return undefined;
        }
    }

    /**
     * generate access token
     * @param loginInfo includes login info in claim
     */
    private async generateAccessTokenAsync(
        userId: string,
        role: RoleType,
        email: string,
        name: string,
        identifier: string
    ): Promise<string> {
        return await this.jwtService.signAsync({
            userId,
            role,
            email,
            name,
            identifier
        });
    }

    /**
     * generate access token
     * @param loginInfo includes login info in claim
     */
    private async generateRefreshTokenAsync(
        userId: string
    ): Promise<string> {
        return await this.jwtService.signAsync({
            userId,
        }, {
            expiresIn: "100d"
        });
    }
}