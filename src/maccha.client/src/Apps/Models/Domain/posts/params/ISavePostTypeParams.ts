import { Category } from "../../Contents/Entities/Category";
import { ISaveTaxonomyParams } from "../../Contents/Params";

export interface ISavePostTypeParams {
    postTypeId: string;
    displayFormat: string;
    taxonomy: ISaveTaxonomyParams;
    categories: Category[];
}