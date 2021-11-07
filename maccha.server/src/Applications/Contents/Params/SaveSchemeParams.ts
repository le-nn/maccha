import { i18n } from "@/Applications/Commons/i18n";
import { ISaveSchemeParams } from "@/Models/Contents/Params/ISaveSchemeParams";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SaveSchemeParams implements ISaveSchemeParams {
    @ApiProperty({
        name: i18n({
            en: "Scheme ID.",
            ja: "スキームID."
        })
    })
    @IsString()
    readonly schemeId!: string;

    @ApiProperty({
        name: i18n({
            en: "Scheme type.",
            ja: "スキーム種別."
        })
    })
    @IsString()
    readonly type!: string;

    @ApiProperty({
        name: i18n({
            en: "name.",
            ja: "スキーム名."
        })
    })
    @IsString()
    readonly name!: string;

    @ApiProperty({
        name: i18n({
            en: "Display name.",
            ja: "表示名."
        })
    })
    @IsString()
    readonly displayName!: string;

    @ApiProperty({
        name: i18n({
            en: "Description.",
            ja: "備考."
        })
    })
    @IsString()
    readonly description!: string;

    @ApiProperty({
        name: i18n({
            en: "Metadata.",
            ja: "メタ情報."
        })
    })
    @IsString()
    metadata!: string;
}