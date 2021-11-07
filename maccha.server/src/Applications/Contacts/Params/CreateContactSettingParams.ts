import { i18n } from "@/Applications/Commons/i18n";
import { ICreateContactSettingParams } from "@/Models/Contacts/params/ICreateContactSettingParams";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString, MinLength, ValidateNested } from "class-validator";
import { CreateContactEmailSettingParams } from "./CreateContactEmailSettingParams";

export class CreateContactSettingParams implements ICreateContactSettingParams{
    @IsArray()
    @ValidateNested({ each: true })
    emailSettings!: CreateContactEmailSettingParams[];

    @IsString()
    @MinLength(1)
    name!: string;

    @IsArray()
    schemes!: string[];

    @ApiProperty({
        name: i18n({
            en: "name.",
            ja: "スキーム名."
        })
    })
    @IsString()
    identifier!: string;
}