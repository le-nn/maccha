import { ICreateTaxonomyParams } from "@/Models/Contents/Params";

export interface ICreatePostTypeParams {
    taxonomy: ICreateTaxonomyParams;
    displayFormat: string;
}