import { ICreateCategoryParams } from "./ICreateCategoryParams";
import { ISaveSchemeParams } from "./ISaveSchemeParams";

export interface ISaveTaxonomyParams {
    taxonomyId: string;
    name: string;
    displayName: string;
    description: string;
    schemes: ISaveSchemeParams[];
    categorySchemes: ICreateCategoryParams[];
}