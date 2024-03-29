import { SearchResultResponse } from "@/Applications/Commons/search-result-response";
import { Claim } from "@/Applications/Commons/user.decorator";
import { SearchContentParams } from "@/Applications/Contents/Params/SearchContentParams";
import { LoginUser } from "@/Models/Authentications/login-user";
import { Controller, Body, Post, Param, Get, NotFoundException, Headers, Query } from "@nestjs/common";
import { ApiTags, ApiBody, ApiOperation, ApiCreatedResponse, ApiHeader, ApiParam } from "@nestjs/swagger";
import { i18n } from "../../Commons/i18n";
import { PublicContentResponse } from "../Responses/PublicContentResponse";
import { PublicContentsAppService } from "../Services/PublicContentsAppService";

/**
 * provide users endpoints.
 */
@ApiTags("Public Contents")
@Controller({ path: "public/:identifier/contents" })
export class PublicContentsController {
    constructor(private readonly contentsService: PublicContentsAppService) { }

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
    @ApiOperation({
        summary: i18n({
            en: "Get a content that specified taxonomy belong to.",
            ja: "タクソノミーに属するコンテンツを1件取得します."
        })
    })
    public async find(
        @Param("taxonomy") taxonomy: string,
        @Param("contentId") contentId: string,
        @Param("identifier") identifier: string,
    ): Promise<PublicContentResponse> {
        const content = await this.contentsService.getAsync(identifier, taxonomy, contentId);
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
        @Query() params: SearchContentParams,
        @Param("identifier") identifier: string,
    ): Promise<SearchResultResponse<PublicContentResponse>> {
        const [collection, hitCount] = await this.contentsService.searchAsync(
            identifier,
            taxonomy,
            {
                fetch: Number(params.fetch ?? 30),
                filter: params.filter ?? "",
                offset: Number(params.offset ?? 0),
                orders: params.orders ?? "",
                search: params.search ?? "",
                fields: params.fields ?? "",
            });

        return {
            collection,
            hitCount
        };
    }
}
