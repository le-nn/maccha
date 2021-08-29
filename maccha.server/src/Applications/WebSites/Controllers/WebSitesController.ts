import { Controller, Body, Post, Param, Get, UseGuards, SetMetadata, Delete, Put, BadRequestException, NotFoundException } from "@nestjs/common";
import { ApiTags, ApiBody, ApiOperation, ApiCreatedResponse } from "@nestjs/swagger";
import { CreteWebSiteParams } from "../Params/CreateWebSiteParams";
import { FailedResponse } from "../../Commons/failed-response";
import { WebSiteResponse } from "../Responses/WebSiteResponse";
import { WebSitesService } from "@/Models/WebSites/web-sites.service";
import { AuthGuard } from "../../Commons/auth-guard";
import { RoleType } from "@/Models/Users/role.enum";
import { UpdateWebSiteParams } from "../Params/UpdateWebSiteParams";
import { Claim } from "../../Commons/user.decorator";
import { LoginUser } from "@/Models/Authentications/login-user";
import { UsersService } from "@/Models/Users/users.service";

/**
 * provide users endpoints.
 */
@ApiTags("Web Sites")
@Controller({ path: "api/web-sites" })
@UseGuards(AuthGuard)
export class WebSitesController {
    constructor(
        private readonly webSitesService: WebSitesService,
        private readonly usersService: UsersService
    ) { }

    /**
     * get one web-sites
     * @param identifieridentifier
     */
    @ApiOperation({ summary: "WEBサイト情報を1件取得します.", description: "auth: upper than Post" })
    @ApiBody({ type: String, description: "取得するWEBサイトのWEBサイトID" })
    @ApiCreatedResponse({ type: WebSiteResponse })
    @SetMetadata("role", RoleType.Subscribe)
    @UseGuards(AuthGuard)
    @Get(":identifier")
    public async getWebSite(@Param("identifier") identifier: string): Promise<WebSiteResponse | FailedResponse> {
        const site = await this.webSitesService.getAsync(identifier);
        if (site) {
            return new WebSiteResponse({
                webSiteId: site.webSiteId,
                name: site.name,
                displayName: site.displayName,
                description: site.description,
                host: site.host
            });
        }

        throw new NotFoundException();
    }

    /**
     * get all web-sites
     * @param id web-sites id
     * @returns web sites
     */
    @ApiOperation({ summary: "WEBサイト情報を全件取得します.", description: "auth: upper than Edit" })
    @ApiBody({ type: () => CreteWebSiteParams, description: "取得するWEBサイトのWEBサイトID" })
    @ApiCreatedResponse({ type: WebSiteResponse })
    @SetMetadata("role", RoleType.Subscribe)
    @UseGuards(AuthGuard)
    @Get()
    public async getAllWebSites(
        @Claim() user: LoginUser
    ): Promise<WebSiteResponse[] | FailedResponse> {
        const sites = await this.webSitesService.getAllAsync(user);
        return sites.map(site => new WebSiteResponse({
            webSiteId: site.webSiteId,
            name: site.name,
            displayName: site.displayName,
            description: site.description,
            host: site.host
        }));
    }

    /**
     * create new web-sites
     * @param params to create web-sites info
     */
    @ApiOperation({ summary: "WEBサイトを新規作成します.", description: "auth: 管理者" })
    @ApiBody({ type: () => CreteWebSiteParams, description: "作成するWEBサイト情報" })
    @ApiCreatedResponse({ type: WebSiteResponse })
    @SetMetadata("role", RoleType.Admin)
    @UseGuards(AuthGuard)
    @Post()
    public async createNewWebSite(@Body() params: CreteWebSiteParams): Promise<WebSiteResponse | FailedResponse> {
        const site = await this.webSitesService.createAsync(params);
        return new WebSiteResponse({
            webSiteId: site.webSiteId,
            name: site.name,
            displayName: site.displayName,
            description: site.description,
            host: site.host
        });
    }

    /**
     * update web-sites
     * @param params to create web-sites info
     */
    @ApiOperation({ summary: "WEBサイトを更新します.", description: "auth: 編集者" })
    @ApiCreatedResponse({ type: WebSiteResponse })
    @UseGuards(AuthGuard)
    @SetMetadata("role", RoleType.Edit)
    @Put()
    public async updateWebSite(
        @Claim() loginUser: LoginUser,
        @Body() webSite: UpdateWebSiteParams): Promise<WebSiteResponse | FailedResponse> {
        const user = await this.usersService.findByIdAsync(loginUser.userId);
        if (!user) throw new NotFoundException();

        if (user.role === RoleType.Admin || (user.role === RoleType.Edit && user?.identifiers.includes(webSite.webSiteId))) {
            const site = await this.webSitesService.updateAsync(webSite);
            return new WebSiteResponse({
                webSiteId: site.webSiteId,
                name: site.name,
                displayName: site.displayName,
                description: site.description,
                host: site.host
            });
        }
        throw new BadRequestException("You do not have a role than can change website. ");
    }

    /**
     * create new web-sites
     * @param params to create web-sites info
     */
    @ApiOperation({ summary: "WEBサイトを新規作成します.", description: "auth: 管理者" })
    @ApiCreatedResponse({ type: WebSiteResponse })
    @SetMetadata("role", RoleType.Admin)
    @UseGuards(AuthGuard)
    @Delete(":identifier")
    public async deleteWebSite(@Param("identifier") identifier: string): Promise<void | FailedResponse> {
        await this.webSitesService.deleteAsync(identifier);
    }
}
