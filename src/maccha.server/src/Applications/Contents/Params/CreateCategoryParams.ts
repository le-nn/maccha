import { i18n } from "@/Applications/Commons/i18n";
import { ICreateSchemeParams } from "@/Models/Contents/Params/ICreateSchemeParams";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateCategoryParams  {
    @ApiProperty({
        name: i18n({
            en: "id.",
            ja: "ID."
        })
    })
    @IsNumber()
    readonly id!: number;

    @ApiProperty({
        name: i18n({
            en: "name.",
            ja: "カテゴリ名."
        })
    })
    @IsString()
    readonly name!: string;

    @ApiProperty({
        name: i18n({
            en: "Display name.",
            ja: "スラッグ."
        })
    })
    @IsString()
    readonly slug!: string;

    @ApiProperty({
        name: i18n({
            en: "Order.",
            ja: "順序."
        })
    })
    order!: number;

    @ApiProperty({
        name: i18n({
            en: "The parent category id.",
            ja: "親カテゴリID."
        })
    })
    parentId!: number | null;
}