import { ICreateCategoryParams } from "./ICreateCategoryParams";
import { ICreateSchemeParams } from "./ICreateSchemeParams";

export interface ICreateTaxonomyParams {
    name: string;
    description: string;
    displayName: string;
    schemes: ICreateSchemeParams[];
    categorySchemes: ICreateCategoryParams[];
}