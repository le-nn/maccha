import { Controller, Body, Post, Param, Get, UseGuards, SetMetadata, Query, Put, BadRequestException, UnauthorizedException, UseInterceptors, UploadedFile, NotFoundException } from "@nestjs/common";
import { ApiTags, ApiBody, ApiOperation, ApiCreatedResponse, ApiNoContentResponse } from "@nestjs/swagger";
import { UsersService } from "@/Models/Users/users.service";
import { UserResponse } from "./user.response";
import { CreateUserParams } from "./create-user-params";
import { FailedResponse } from "../Commons/failed-response";
import { AuthGuard } from "../Commons/auth-guard";
import { RoleType } from "@/Models/Users/role.enum";
import { AddWebSiteParams } from "./add-website.params";
import { Claim } from "../Commons/user.decorator";
import { LoginUser } from "@/Models/Authentications/login-user";
import { UpdateUserParams } from "./update-user-params";
import { FileInterceptor } from "@nestjs/platform-express";

/**
 * provide users endpoints.
 */
@ApiTags("Users")
@Controller({ path: "api/users" })
export class UsersController {
    /**
     * constructor
     * @param usersService users service
     */
    constructor(private readonly usersService: UsersService) { }

    /**
     * get one user
     * @param id user id
     */
    @ApiOperation({ summary: "ユーザ情報を1件取得します.", description: "auth" })
    @ApiCreatedResponse({ type: UserResponse })
    @UseGuards(AuthGuard)
    @Get(":id")
    public async getUser(@Param("id") id: string): Promise<UserResponse | FailedResponse> {
        const user = await this.usersService.findByIdAsync(id);
        if (!user) {
            throw new NotFoundException(`User ${id} is not found.`);
        }

        return new UserResponse({
            email: user.email,
            name: user.name,
            role: user.role,
            userId: user.userId,
            isActive: user.isActive,
            identifiers: user.identifiers,
            avatar: user.avatar
        });
    }

    /**
     * Get users. Required role is over subscribe
     * @param user Login info
     * @param identifier identifier
     */
    @ApiOperation({ summary: "ユーザ情報一覧を取得します.", description: "許可するサイトに含まれるユーザー情報一覧を取得します. 管理者の場合はすべて取得します." })
    @ApiBody({ type: () => CreateUserParams, description: "取得するユーザーのユーザーID" })
    @ApiCreatedResponse({ type: [UserResponse] })
    @UseGuards(AuthGuard)
    @SetMetadata("role", RoleType.Subscribe)
    @Get()
    public async getAllUsers(
        @Claim() loginUser: LoginUser,
        @Query("all") all: any,
        @Query("identifiers") identifiers?: string[]
    ): Promise<UserResponse[] | FailedResponse> {
        const user = await this.usersService.findByIdAsync(loginUser.userId);
        if (!user) {
            throw new NotFoundException(`User ${loginUser.userId} i not found. `);
        }

        const users = await (async () => {
            if (user.role >= RoleType.Edit && all) {
                return await this.usersService.getAll(identifiers);
            }
            return await this.usersService.getAll(
                [loginUser.identifier]
            );
        })();
        return users.map(user => new UserResponse({
            email: user.email,
            name: user.name,
            role: user.role,
            userId: user.userId,
            isActive: user.isActive,
            identifiers: user.identifiers,
            avatar: user.avatar
        }));
    }

    /**
     * create new user
     * @param params to create user info
     */
    @ApiOperation({ summary: "ユーザがログイン可能なWebサイトを追加します.", description: "auth :管理者" })
    @ApiBody({ type: () => CreateUserParams, description: "ユーザーIDとWEBサイトID" })
    @ApiNoContentResponse()
    @UseGuards(AuthGuard)
    @SetMetadata("role", RoleType.Admin)
    @Post("web-sites")
    public async addWebSite(@Body() params: AddWebSiteParams): Promise<void> {
        await this.usersService.addWebSiteAsync(params.userId, params.identifier);
    }

    /**
     * create new user
     * @param params to create user info
     */
    @ApiOperation({ summary: "ユーザを新規作成します.", description: "auth :編集者" })
    @ApiBody({ type: () => CreateUserParams, description: "作成するユーザー情報" })
    @ApiCreatedResponse({ type: UserResponse })
    @UseGuards(AuthGuard)
    @SetMetadata("role", RoleType.Edit)
    @Post()
    public async createNewUser(
        @Body() params: CreateUserParams,
        @Claim() loginUser: LoginUser
    ): Promise<UserResponse | FailedResponse> {
        const user = await this.usersService.findByIdAsync(loginUser.userId);
        if (!user) {
            throw new NotFoundException(`${loginUser.userId} is not found.`);
        }

        if ((user.role === RoleType.Admin) || user.identifiers.filter(x => params.identifiers.filter(y => y === x).length)) {
            const created = await this.usersService.createAsync(params);
            return new UserResponse({
                email: created.email,
                name: created.name,
                role: created.role,
                userId: created.userId,
                isActive: created.isActive,
                identifiers: created.identifiers,
                avatar: created.avatar
            });
        }

        throw new UnauthorizedException("User role is Edit. Edit role user cannot create user that doesn't belong user web sites.");
    }

    /**
     * create new user
     * @param params to create user info
     */
    @ApiOperation({ summary: "管理者ユーザを新規作成します.", description: "auth :管理者" })
    @ApiBody({ type: () => CreateUserParams, description: "作成するユーザー情報" })
    @ApiCreatedResponse({ type: UserResponse })
    @UseGuards(AuthGuard)
    @SetMetadata("role", RoleType.Admin)
    @Post("admin")
    public async createAdminUser(@Body() params: CreateUserParams): Promise<UserResponse | FailedResponse> {
        const created = await this.usersService.createAsync(params);
        return new UserResponse({
            email: created.email,
            name: created.name,
            role: created.role,
            userId: created.userId,
            isActive: created.isActive,
            identifiers: created.identifiers,
            avatar: created.avatar
        });
    }

    /**
     * create new user
     * @param params to create user info
     */
    @ApiOperation({ summary: "ユーザー情報を更新します.", description: "auth :編集者" })
    @ApiBody({ type: () => CreateUserParams, description: "更新するユーザー情報" })
    @ApiCreatedResponse({ type: UserResponse })
    @UseGuards(AuthGuard)
    @SetMetadata("role", RoleType.Edit)
    @Put()
    public async updateUser(
        @Body() params: UpdateUserParams,
        @Claim() loginUser: LoginUser
    ): Promise<UserResponse | FailedResponse> {
        const user = await this.usersService.findByIdAsync(loginUser.userId);
        const changeUser = await this.usersService.findByIdAsync(params.userId);
        if (!changeUser || !user) {
            throw new NotFoundException();
        }

        if (
            (loginUser.role === RoleType.Admin) ||
            changeUser.identifiers.filter(x => user.identifiers.filter(y => y === x).length).length
        ) {
            const created = await this.usersService.UpdateAsync(params);

            if (created) {
                return new UserResponse({
                    email: created.email,
                    name: created.name,
                    role: created.role,
                    userId: created.userId,
                    isActive: created.isActive,
                    identifiers: created.identifiers,
                    avatar: created.avatar
                });
            }
        }

        throw new UnauthorizedException("User role is Edit. Edit role user cannot update user that doesn't belong user web sites.");
    }

    /**
     * Upload user avatar image.
     * @param params to create user info
     */
    @ApiOperation({ summary: "アバター画像を設定します.", description: "auth :購読者" })
    @ApiBody({ type: () => ({ file: Object }), description: "ファイル" })
    @ApiCreatedResponse({ type: UserResponse })
    @UseGuards(AuthGuard)
    @SetMetadata("role", RoleType.Subscribe)
    @UseInterceptors(FileInterceptor("file"))
    @Post("avatar")
    public async uploadavatar(
        @Claim() loginUser: LoginUser,
        @UploadedFile() file: any
    ): Promise<UserResponse | FailedResponse> {
        const user = await this.usersService.saveAvatarAsync(loginUser.userId, file);
        if (!user) {
            throw new NotFoundException();
        }

        return new UserResponse({
            email: user.email,
            name: user.name,
            role: user.role,
            userId: user.userId,
            isActive: user.isActive,
            identifiers: user.identifiers,
            avatar: user.avatar
        });
    }
}
