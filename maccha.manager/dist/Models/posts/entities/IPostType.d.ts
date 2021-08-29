import { Taxonomy } from "../../Contents/Entities/Taxonomy";
export interface IPostType {
    postTypeId: string;
    displayFormat: string;
    taxonomy: Taxonomy;
}
