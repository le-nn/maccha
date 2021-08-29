import { i18n } from "@/Applications/Commons/i18n";
import { ICreateTaxonomyParams, ISaveTaxonomyParams, ISearchContentParams } from "@/Models/Contents/Params";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsString,MinLength, ValidateNested } from "class-validator";
import { CreateSchemeParams } from "./CreateSchemeParams";
import { SaveSchemeParams } from "./SaveSchemeParams";

/**
 * Params to search contents.
 */
export class SearchContentParams implements ISearchContentParams {
    @ApiProperty({
        name: i18n({
            en: "filter query of field.",
            ja: "フィールドの検索クエリー."
        })
    })
    filter = "";

    @ApiProperty({
        name: i18n({
            en: "Limit query of field value size.",
            ja: "取得するフィールドのコンテンツのサイズ制限クエリー."
        })
    })
    limit = "";

    @ApiProperty({
        name: i18n({
            en: "Num of fetch.",
            ja: "並べ替えクエリ."
        })
    })
    order = "";

    @ApiProperty({
        name: i18n({
            en: "Offset of fetch.",
            ja: "何件目から取得するか."
        })
    })
    offset = 0;

    @ApiProperty({
        name: i18n({
            en: "Num of fetch.",
            ja: "何件取得するか."
        })
    })
    fetch = 30;
}