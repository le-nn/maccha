import { Category } from "../Entities/Category";
import { Scheme } from "../Entities/Scheme";

export interface ISaveTaxonomyParams {
    taxonomyId: string;
    name: string;
    displayName: string;
    description: string;
    categorySchemes: Category[];
    schemes: Scheme[];
}