import { IUpdateWebSiteParams } from "@/Models/WebSites/update-web-site.params";
import { IsString, IsUrl, Matches, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateWebSiteParams implements IUpdateWebSiteParams {
    @ApiProperty({ description: "WEBサイトID" })
    @IsString()
    @MinLength(1)
    webSiteId!: string;

    @ApiProperty({ description: "WEBサイト識別名" })
    @IsString()
    @MinLength(1)
    name!: string;

    @ApiProperty({ description: "WEBサイト名" })
    @IsString()
    @MinLength(1)
    public readonly displayName!: string;

    @ApiProperty({ description: "ホストURL" })
    @IsString()
    @MinLength(1)
    @IsUrl()
    public readonly host!: string;

    @ApiProperty({ description: "説明" })
    @IsString()
    public readonly description!: string;
}