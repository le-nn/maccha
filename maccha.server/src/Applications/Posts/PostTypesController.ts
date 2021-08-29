import { Controller, Post, Get, UseGuards, Query, Body, SetMetadata, Put, Param, Delete } from "@nestjs/common";
import { ApiTags, ApiExcludeEndpoint,ApiBody, ApiOperation, ApiCreatedResponse, ApiResponse, ApiNoContentResponse, ApiParam } from "@nestjs/swagger";
import { FailedResponse } from "../Commons/failed-response";
import { AuthGuard } from "../Commons/auth-guard";
import { PostTypesService } from "@/Models/Posts/Services/PostTypesService";
import { PostTypeResponse } from "./Responses/PostTypeResponse";
import { ICreatePostTypeParams } from "@/Models/Posts/Params/ICreatePostTypeParams";
import { RoleType } from "@/Models/Users/role.enum";
import { Claim } from "../Commons/user.decorator";
import { LoginUser } from "@/Models/Authentications/login-user";
import { SavePostTypeParams } from "./Params/SavePostTypeParams";
import { TaxonomyReponse } from "../Contents/Responses/TaxonomyResponse";

/**
 * provide post types endpoints.
 */
@ApiTags("Post Types")
@Controller({ path: "api/post-types" })
@UseGuards(AuthGuard)
export class PostTypesController {
    constructor(private readonly postTypesService: PostTypesService) { }

    /**
     * get one web-sites
     * @param identifieridentifier
     */
    @ApiOperation({
        summary: "投稿を検索します.",
        description: "auth",
    })
    @ApiCreatedResponse({
        type: () => [PostTypeResponse]
    })
    @SetMetadata("role", RoleType.Subscribe)
    @UseGuards(AuthGuard)
    @Get()
    public async getAll(
        @Claim() loginUser: LoginUser
    ): Promise<PostTypeResponse[] | FailedResponse> {
        const types = await this.postTypesService.getAllAsync(loginUser.identifier);
        return types.map(
            p => new PostTypeResponse({
                taxonomy: new TaxonomyReponse({
                    description: p.taxonomy.description,
                    taxonomyId: p.taxonomy.taxonomyId,
                    name: p.taxonomy.name,
                    identifier: p.taxonomy.identifier,
                    displayName: p.taxonomy.displayName,
                    schemes: p.taxonomy.schemes
                }),
                postTypeId: p.postTypeId,
                identifier: p.identifier,
                displayFormat: p.displayFormat
            })
        );
    }

    /**
     * create post
     * @param identifieridentifier
     */
    @ApiOperation({ summary: "投稿を検索します.", description: "auth" })
    @ApiBody({ type: () => PostTypeResponse, description: "検索パラメータ" })
    @ApiCreatedResponse({
        type: () => PostTypeResponse
    })
    @SetMetadata("role", RoleType.Edit)
    @UseGuards(AuthGuard)
    @Post()
    public async createPostType(
        @Body() params: ICreatePostTypeParams,
        @Claim() loginUser: LoginUser
    ): Promise<PostTypeResponse> {
        const p = await this.postTypesService.createAsync(loginUser.identifier, params);
        return new PostTypeResponse({
            taxonomy: new TaxonomyReponse({
                description: p.taxonomy.description,
                taxonomyId: p.taxonomy.taxonomyId,
                name: p.taxonomy.name,
                identifier: p.taxonomy.identifier,
            }),
            postTypeId: p.postTypeId,
            identifier: p.identifier,
            displayFormat: p.displayFormat
        });
    }

    /**
     * save post
     * @param identifieridentifier
     */
    @ApiOperation({ summary: "投稿タイプを保存します.", description: "auth" })
    @ApiBody({ type: () => SavePostTypeParams, description: "保存パラメータ" })
    @ApiResponse({
        type: () => PostTypeResponse
    })
    @SetMetadata("role", RoleType.Edit)
    @UseGuards(AuthGuard)
    @Put()
    public async saveAsync(
        @Body() params: SavePostTypeParams,
        @Claim() loginUser: LoginUser
    ): Promise<PostTypeResponse> {
        const p = await this.postTypesService.saveAsync(loginUser, params);
        return new PostTypeResponse({
            taxonomy: new TaxonomyReponse({
                description: p.taxonomy.description,
                taxonomyId: p.taxonomy.taxonomyId,
                name: p.taxonomy.name,
                identifier: p.taxonomy.identifier,
            }),
            postTypeId: p.postTypeId,
            identifier: p.identifier,
            displayFormat: p.displayFormat
        });
    }

    /**
 * save post
 * @param identifieridentifier
 */
    @ApiOperation({ summary: "投稿タイプを削除します.", description: "auth" })
    @ApiParam({ name: "postTypeId", description: "投稿タイプID", required: true })
    @ApiNoContentResponse({})
    @SetMetadata("role", RoleType.Edit)
    @UseGuards(AuthGuard)
    @Delete(":postTypeId")
    public async removeAsync(
        @Param("postTypeId") params: string,
        @Claim() loginUser: LoginUser
    ): Promise<void> {
        await this.postTypesService.removeAsync(loginUser, params);
    }
}
