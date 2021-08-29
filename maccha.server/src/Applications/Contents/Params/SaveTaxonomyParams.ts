import { i18n } from "@/Applications/Commons/i18n";
import { ICreateTaxonomyParams, ISaveTaxonomyParams } from "@/Models/Contents/Params";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString, MinLength, ValidateNested } from "class-validator";
import { CreateSchemeParams } from "./CreateSchemeParams";
import { SaveSchemeParams } from "./SaveSchemeParams";

/**
 * Params to create taxonomy.
 */
export class SaveTaxonomyParams implements ISaveTaxonomyParams {
    @ApiProperty({
        name: i18n({
            en: "Taxonomy ID.",
            ja: "タクソノミーID."
        })
    })
    @IsString()
    @MinLength(1)
    taxonomyId!: string;

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
    schemes!: SaveSchemeParams[];
}