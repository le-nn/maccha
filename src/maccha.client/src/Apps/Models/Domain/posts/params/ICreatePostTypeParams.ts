import { Category } from "../../Contents/Entities/Category";
import { ICreateTaxonomyParams } from "../../Contents/Params";

export interface ICreatePostTypeParams {
    taxonomy: ICreateTaxonomyParams;
    displayFormat: string;
}