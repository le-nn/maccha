import { ApiProperty } from "@nestjs/swagger";
import { i18n } from "@/Applications/Commons/i18n";
import { IsEnum, IsString } from "class-validator";
import { StatusType } from "@/Models/Contents/Enumes/StatusType";
import { CreateFieldParams } from "./CreateFieldParams";

export class CreateContentParams {
    @ApiProperty({
        name: i18n({
            en: "Content title.",
            ja: "コンテンツタイトル."
        })
    })
    @IsEnum(StatusType)
    readonly status!: StatusType;

    @ApiProperty({
        name: i18n({
            en: "Description.",
            ja: "概要."
        })
    })
    @IsString()
    readonly description!: string;


    @ApiProperty({
        name: i18n({
            en: "Content title.",
            ja: "コンテンツタイトル."
        })
    })
    @IsString()
    readonly title!: string;


    @ApiProperty({
        name: i18n({
            en: "Thumbnail url.",
            ja: "サムネイル画像のURL."
        })
    })
    @IsString()
    readonly thumbnail!: string;

    @ApiProperty({
        name: i18n({
            en: "Publish date time.",
            ja: "公開日."
        })
    })
    readonly publishIn!: string;

    @ApiProperty({
        name: i18n({
            en: "metadata.",
            ja: "メタデータ."
        })
    })
    @IsString()
    readonly metadata!: string;

    @ApiProperty({
        type: () => [CreateFieldParams],
        name: i18n({
            en: "Fields",
            ja: "フィールド一覧"
        })
    })
    readonly fields!: CreateFieldParams[];
}