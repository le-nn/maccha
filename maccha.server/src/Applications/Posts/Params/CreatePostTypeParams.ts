import { IsDate, IsString, IsNumber, IsArray, ValidateNested } from "class-validator";
import { ICreatePostTypeParams } from "@/Models/Posts/Params/ICreatePostTypeParams";
import { CreateTaxonomyParams } from "@/Applications/Contents/Params/CreateTaxonomyParams";

export class CreatePostTypeParams implements ICreatePostTypeParams {
    @IsString()
    displayFormat = "table";

    @ValidateNested()
    taxonomy!: CreateTaxonomyParams;
}