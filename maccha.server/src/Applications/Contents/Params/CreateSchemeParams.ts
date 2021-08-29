import { i18n } from "@/Applications/Commons/i18n";
import { ICreateSchemeParams } from "@/Models/Contents/Params/ICreateSchemeParams";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateSchemeParams implements ICreateSchemeParams {
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