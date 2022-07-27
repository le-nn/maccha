import { IsString, MinLength, IsUUID, ValidateNested } from "class-validator";
import { ISavePostTypeParams } from "@/Models/Posts/Params/ISavePostTypeParams";
import { ApiProperty } from "@nestjs/swagger";
import { SaveTaxonomyParams } from "@/Applications/Contents/Params/SaveTaxonomyParams";
import { i18n } from "@/Applications/Commons/i18n";

/**
 * Api params to save post type.
 */
export class SavePostTypeParams implements ISavePostTypeParams {
    @ApiProperty({
        title: i18n({
            en: "Display format.",
            ja: "表示形式."
        })
    })
    @IsString()
    displayFormat!: string;

    @ApiProperty({
        title: i18n({
            en: "PostType ID.",
            ja: "投稿タイプID."
        })
    })
    @IsUUID()
    postTypeId!: string;

    @ApiProperty({
        title: i18n({
            en: "Taxonomy Params.",
            ja: "タクソノミーパラメータ."
        })
    })
    @ValidateNested()
    taxonomy!: SaveTaxonomyParams;
}