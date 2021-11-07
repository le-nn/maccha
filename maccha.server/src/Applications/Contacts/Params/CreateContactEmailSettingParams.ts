import { ICreateContactEmailSetting, ICreateContactSettingParams } from "@/Models/Contacts/params/ICreateContactSettingParams";
import { IsArray, IsString, MinLength, ValidateNested } from "class-validator";

export class CreateContactEmailSettingParams implements ICreateContactEmailSetting {
    @IsString()
    to!: string;

    @IsString()
    from!: string;

    @IsString()
    header!: string;

    @IsString()
    titleTemplate!: string;

    @IsString()
    bodyTemplate!: string;
}