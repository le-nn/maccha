import { i18n } from "@/Applications/Commons/i18n";
import { StatusType } from "@/Models/Contents/Enumes/StatusType";
import { ISaveContentParams } from "@/Models/Contents/Params";
import { ICreateFieldParams } from "@/Models/Contents/Params/ICreateFieldParams";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDateString, IsEnum, IsString, MinLength } from "class-validator";
import { DateTime } from "luxon";
import { CreateContentParams } from "./CreateContentParams";
import { CreateFieldParams } from "./CreateFieldParams";

export class SaveContentParams {
    @ApiProperty({
        name: i18n({
            en: "Content ID.",
            ja: "コンテンツID."
        })
    })
    @IsString()
    @MinLength(1)
    contentId!: string;

    @ApiProperty({
        name: i18n({
            en: "Content title.",
            ja: "コンテンツタイトル."
        })
    })
    @IsString()
    title!: string;

    @ApiProperty({
        name: i18n({
            en: "Description.",
            ja: "概要."
        })
    })
    @IsString()
    description!: string;

    @ApiProperty({
        name: i18n({
            en: "Content title.",
            ja: "コンテンツタイトル."
        })
    })
    @IsEnum(StatusType)
    status!: StatusType;

    @ApiProperty({
        name: i18n({
            en: "Thumbnail url.",
            ja: "サムネイル画像のURL."
        })
    })
    @IsString()
    thumbnail!: string;

    @ApiProperty({
        name: i18n({
            en: "metadata.",
            ja: "メタデータ."
        })
    })
    @IsString()
    metadata!: string;

    @ApiProperty({
        name: i18n({
            en: "Publish date time.",
            ja: "公開日."
        })
    })
    publishIn!: string;

    @ApiProperty({
        name: i18n({
            en: "Fields",
            ja: "フィールド"
        })
    })
    @IsArray()
    fields!: CreateFieldParams[];
}