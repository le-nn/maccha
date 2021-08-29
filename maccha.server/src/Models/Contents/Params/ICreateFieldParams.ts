import { i18n } from "@/Applications/Commons/i18n";
import { ApiProperty } from "@nestjs/swagger";

export interface ICreateFieldParams {
    fieldId: string;
    value: string;
    schemeId: string;
    name: string;
}