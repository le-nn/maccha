import { ISaveTaxonomyParams } from "@/Models/Contents/Params";

export interface ISavePostTypeParams {
    postTypeId: string;
    displayFormat: string;
    taxonomy: ISaveTaxonomyParams;
}