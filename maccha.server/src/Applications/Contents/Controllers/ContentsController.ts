import { Controller, Body, Post, Param, Get, UseGuards, SetMetadata, Delete, Put, Query, NotFoundException, Headers } from "@nestjs/common";
import { ApiTags, ApiBody, ApiOperation, ApiCreatedResponse, ApiHeader, ApiParam, ApiResponse, ApiNoContentResponse } from "@nestjs/swagger";
import { AuthGuard } from "../../Commons/auth-guard";
import { Claim } from "../../Commons/user.decorator";
import { LoginUser } from "@/Models/Authentications/login-user";
import { i18n } from "../../Commons/i18n";
import { ContentsAppService } from "../Services/ContentsAppService";
import { CreateContentParams } from "../Params/CreateContentParams";
import { ContentResponse } from "../Responses/ContentResponse";
import { DateTime } from "luxon";
import { SearchResultResponse } from "@/Applications/Commons/search-result-response";
import { SaveContentParams } from "../Params/SaveContentParams";

/**
 * provide users endpoints.
 */
@ApiTags("Contents")
@Controller({ path: "api/contents" })
export class ContentsController {
    constructor(private readonly contentsService: ContentsAppService) { }

    @Get(":taxonomy/:contentId")
    @ApiParam({
        name: "taxonomy",
        description: i18n({
            en: "taxonomy name.",
            ja: "タクソノミー."
        }),
    })
    @ApiParam({
        name: "contentId",
        description: i18n({
            en: "content ID.",
            ja: "コンテンツID."
        }),
    })
    @ApiHeader({
        name: "X-Identifier",
        description: i18n({
            en: "Identifier.",
            ja: "WEBサイト識別子."
        }),
    })
    @ApiOperation({
        summary: i18n({
            en: "Get a content that specified taxonomy belong to.",
            ja: "タクソノミーに属するコンテンツを1件取得します."
        }),
        description: i18n({
            en: "Role: None. ",
            ja: "権限: なし"
        }),
    })
    public async find(
        @Param("taxonomy") taxonomy: string,
        @Param("contentId") contentId: string,
        @Headers("X-Identifier") indentifier: string
    ): Promise<ContentResponse> {
        const content = await this.contentsService.getAsync(indentifier, taxonomy, contentId);
        if (!content) {
            throw new NotFoundException(`Content ${contentId} is not found.`);
        }

        return content;
    }

    @Get(":taxonomy")
    @ApiParam({
        name: "taxonomy",
        description: i18n({
            en: "taxonomy name.",
            ja: "タクソノミー."
        }),
    })
    @ApiHeader({
        name: "X-Identifier",
        description: i18n({
            en: "Identifier.",
            ja: "WEBサイト識別子."
        }),
    })
    @ApiOperation({
        summary: i18n({
            en: "Search contents that specified taxonomy belong to.",
            ja: "タクソノミーに属するコンテンツを検索します."
        }),
        description: i18n({
            en: "Role: None. ",
            ja: "権限: なし"
        }),
    })
    public async search(
        @Param("taxonomy") taxonomy: string,
        @Query() params: any,
        @Headers("X-Identifier") indentifier: string
    ): Promise<SearchResultResponse<ContentResponse>> {
        const [collection, hitCount] = await this.contentsService.searchAsync(indentifier, taxonomy, params);
        return {
            collection,
            hitCount
        };
    }

    @Post(":taxonomy")
    @ApiOperation({
        summary: i18n({
            en: "Create new content in taxonomy.",
            ja: "コンテンツを新規作成します."
        }),
        description: i18n({
            en: "Role: over Post role. ",
            ja: "権限: 投稿者以上"
        }),
    })
    public async create(
        @Param("taxonomy") taxonomy: string,
        @Body() params: CreateContentParams,
        @Claim() loginUser: LoginUser
    ): Promise<ContentResponse> {
        return await this.contentsService.createAsync(loginUser, taxonomy, params);
    }

    @Put(":taxonomy")
    @ApiOperation({
        summary: i18n({
            en: "Save content in taxonomy.",
            ja: "コンテンツを更新します."
        }),
        description: i18n({
            en: "Role: over Post role. ",
            ja: "権限: 投稿者以上"
        }),
    })
    @UseGuards(AuthGuard)
    public async save(
        @Param("taxonomy") taxonomy: string,
        @Body() params: SaveContentParams,
        @Claim() loginUser: LoginUser
    ): Promise<ContentResponse> {
        return await this.contentsService.saveAsync(loginUser, taxonomy, params);
    }

    @Delete(":taxonomy/:contentId")
    @ApiParam({
        name: "taxonomy",
        description: i18n({
            en: "taxonomy name.",
            ja: "タクソノミー."
        }),
    })
    @ApiParam({
        name: "contentId",
        description: i18n({
            en: "content ID.",
            ja: "コンテンツID."
        }),
    })
    @ApiOperation({
        summary: i18n({
            en: "Remove a content that specified taxonomy belong to.",
            ja: "タクソノミーに属するコンテンツを1件削除します."
        }),
        description: i18n({
            en: "Role: None. ",
            ja: "権限: なし"
        }),
    })
    @ApiNoContentResponse()
    @UseGuards(AuthGuard)
    public async delete(
        @Param("taxonomy") taxonomy: string,
        @Param("contentId") contentId: string,
        @Claim() loginUser: LoginUser
    ): Promise<void> {
        await this.contentsService.removeAsync(loginUser, taxonomy, contentId);
    }
}
