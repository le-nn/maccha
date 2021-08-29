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
            const user = await this.usersService.validateUser(email, password);

            const identifier = await (async () => {
                if (user.role === RoleType.Admin) {
                    const [webSite] = await this.webSitesService.getAllAsync();
                    return webSite.webSiteId;
                }
                else {
                    return user.identifiers[0] ?? "";
                }
            })();

            const token = await this.generateAccessTokenAsync(
                user.userId,
                user.role,
                user.email,
                user.name,
                identifier
            );
            const refreshToken = await this.generateRefreshTokenAsync(user.userId);

            const tokenInfo = await this.validateAsync<(LoginUser & Token)>(token);
            if (tokenInfo) {
                return {
                    token,
                    refreshToken,
                    userId: user.userId,
                    role: Number(user.role),
                    email: user.email,
                    name: user.name,
                    identifier,
                    exp: tokenInfo.exp,
                    iat: tokenInfo.iat,
                    avatar: user.avatar
                };
            }
            else {
                throw new InternalServerErrorException();
            }
        }
        catch (ex) {
            throw new BadRequestException(ex.message);
        }
    }

    /**
     * generate refresh token.
     * @param token token
     * @param identifier identifier
     */
    public async refresh(token: string, identifier: string): Promise<Token & LoginUser> {
        try {
            const user = await this.validateAsync<{ userId: string }>(token);
            if (user) {
                const newUser = await this.usersService.findByIdAsync(user.userId);
                if (!newUser) throw new Error("useid not found");

                const newIdentifier = await (async () => {
                    if (newUser.role === RoleType.Admin) {
                        const webSite = await this.webSitesService.getAsync(identifier);
                        if (!webSite) {
                            throw new Error(`Web site ${identifier} is not found.`);
                        }

                        return webSite.webSiteId;
                    }
                    else {
                        // if include identifier that user can login.
                        if (newUser.identifiers.includes(identifier)) {
                            const webSite = await this.webSitesService.getAsync(identifier);
                            if (!webSite) {
                                throw new Error(`Web site ${identifier} is not found.`);
                            }

                            return webSite.webSiteId;
                        }
                    }
                    throw new Error("identifier is not found or user has no role.");
                })();

                const newToken = await this.generateAccessTokenAsync(
                    newUser.userId,
                    newUser.role,
                    newUser.email,
                    newUser.name,
                    newIdentifier
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
                        identifier: newIdentifier,
                        exp: tokenInfo.exp,
                        iat: tokenInfo.iat,
                        avatar: newUser.avatar
                    };
                }
            }
        }
        catch (ex) {
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
        catch (ex) {
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