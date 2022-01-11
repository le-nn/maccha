import { ICreateWebSiteParams } from "@/Models/WebSites/create-werb-site.params";
import { IsString, MinLength, Contains, Matches, IsUrl } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreteWebSiteParams implements ICreateWebSiteParams {
    @ApiProperty({ description: "WEBサイト識別名" })
    @IsString()
    @MinLength(1)
    @Matches(/^[a-z0-9|_|\-]*$/, { message: "only lower case alphabet or number" })
    name!: string;

    @ApiProperty({ description: "WEBサイト名" })
    @IsString()
    @MinLength(1)
    displayName!: string;

    @ApiProperty({ description: "ホストURL" })
    @IsString()
    @MinLength(1)
    @IsUrl()
    host!: string;

    @ApiProperty({ description: "説明" })
    @IsString()
    description!: string;
}