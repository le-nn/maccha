import { Controller, Body, Post, Param, Get, UseGuards, SetMetadata, Delete, Put, Query } from "@nestjs/common";
import { ApiTags, ApiBody, ApiOperation, ApiCreatedResponse, ApiParam } from "@nestjs/swagger";
import { AuthGuard } from "../../Commons/auth-guard";
import { Claim } from "../../Commons/user.decorator";
import { LoginUser } from "@/Models/Authentications/login-user";
import { i18n } from "../../Commons/i18n";
import { TaxonomiesAppService } from "../Services/TaxonomiesAppService";
import { CreateTaxonomyParams } from "../Params/CreateTaxonomyParams";
import { TaxonomyReponse } from "../Responses/TaxonomyResponse";

/**
 * provide users endpoints.
 */
@ApiTags("Taxonomies")
@Controller({ path: "api/taxonomies" })
@UseGuards(AuthGuard)
export class TaxonomiesController {
    constructor(private readonly taxonomiesAppService: TaxonomiesAppService) { }

    @Get()
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
    public async getList(
        @Claim() loginUser: LoginUser
    ): Promise<TaxonomyReponse[]> {
        return await this.taxonomiesAppService.getAll(loginUser);
    }

    @Post()
    @ApiOperation({
        summary: i18n({
            en: "Create new taxonomy in taxonomy.",
            ja: "タクソノミーを新規作成します."
        }),
        description: i18n({
            en: "Role: over Edit role. ",
            ja: "権限: 編集者以上"
        }),
    })
    public async post(
        @Param("taxonomy") taxonomy: string,
        @Body() params: CreateTaxonomyParams,
        @Claim() loginUser: LoginUser
    ): Promise<TaxonomyReponse> {
        return await this.taxonomiesAppService.createAsync(loginUser, params);
    }
}
