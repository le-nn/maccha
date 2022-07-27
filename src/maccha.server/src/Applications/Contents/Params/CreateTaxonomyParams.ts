import { i18n } from "@/Applications/Commons/i18n";
import { ICreateTaxonomyParams } from "@/Models/Contents/Params";
import { ICreateCategoryParams } from "@/Models/Contents/Params/ICreateCategoryParams";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString, MinLength, ValidateNested } from "class-validator";
import { CreateCategoryParams } from "./CreateCategoryParams";
import { CreateSchemeParams } from "./CreateSchemeParams";

/**
 * Params to create taxonomy.
 */
export class CreateTaxonomyParams implements ICreateTaxonomyParams {
    @ApiProperty({
        name: i18n({
            en: "name.",
            ja: "タクソノミー名."
        })
    })
    @IsString()
    @MinLength(1)
    name!: string;

    @ApiProperty({
        name: i18n({
            en: "Description.",
            ja: "備考."
        })
    })
    @IsString()
    description!: string;

    @ApiProperty({
        name: i18n({
            en: "Display name.",
            ja: "表示名."
        })
    })
    @IsString()
    @MinLength(1)
    displayName!: string;

    @ApiProperty({
        name: i18n({
            en: "Schemes",
            ja: "スキーム一覧."
        }),
        type: () => [CreateSchemeParams]
    })
    @ValidateNested({ each: true })
    schemes!: CreateSchemeParams[];

    @ApiProperty({
        name: i18n({
            en: "Categories",
            ja: "カテゴリ一覧."
        }),
        type: () => [CreateCategoryParams]
    })
    @ValidateNested({ each: true })
    categorySchemes!: ICreateCategoryParams[];
}