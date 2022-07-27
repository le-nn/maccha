import { Category } from "../Entities/Category";

export interface ISaveTaxonomyParams {
    taxonomyId: string;
    name: string;
    displayName: string;
    description: string;
    categories: Category[];
}