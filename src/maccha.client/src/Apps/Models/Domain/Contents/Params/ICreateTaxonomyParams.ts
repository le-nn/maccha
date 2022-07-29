import { Category } from "../Entities/Category";
import { ICreateSchemeParams } from "./ICreateSchemeParams";

export interface ICreateTaxonomyParams {
    name: string;
    description: string;
    displayName: string;
    schemes: ICreateSchemeParams[];
    categorySchemes: Category[];
}