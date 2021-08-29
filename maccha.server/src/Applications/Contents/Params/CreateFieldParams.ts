import { i18n } from "@/Applications/Commons/i18n";
import { ICreateFieldParams } from "@/Models/Contents/Params/ICreateFieldParams";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateFieldParams implements ICreateFieldParams {
    @ApiProperty({
        name: i18n({
            ja: "フィールドID",
            en: "Field ID"
        })
    })
    @IsString()
    fieldId!: string;

    @ApiProperty({
        name: i18n({
            ja: "名称",
            en: "name"
        })
    })
    @IsString()
    name!: string;

    @ApiProperty({
        name: i18n({
            ja: "スキームID",
            en: "Scheme ID"
        })
    })
    @IsString()
    schemeId!: string;

    @ApiProperty({
        name: i18n({
            ja: "値",
            en: "Value"
        })
    })
    @IsString()
    value!: string;
}