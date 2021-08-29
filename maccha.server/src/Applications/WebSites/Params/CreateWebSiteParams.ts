import { ICreateWebSiteParams } from "@/Models/WebSites/create-werb-site.params";
import { IsString, MinLength, Contains, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreteWebSiteParams implements ICreateWebSiteParams {
    @ApiProperty({ description: "サイト識別名" })
    @IsString()
    @MinLength(1)
    @Matches(/^[a-z0-9]*$/, { message: "only lower case alphabet or number" })
    name!: string;

    @ApiProperty({ description: "サイト名" })
    @IsString()
    @MinLength(1)
    displayName!: string;

    @ApiProperty({ description: "サイトのURL" })
    @IsString()
    @MinLength(1)
    @Matches(/(http[s]?):\/\/[^\/\.]+?\..+\w$/i, { message: "invalid url" })
    host!: string;

    @ApiProperty({ description: "サイト説明" })
    @IsString()
    description!: string;
}