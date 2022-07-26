import { Category } from "../../Contents/Entities/Category";
import { Taxonomy } from "../../Contents/Entities/Taxonomy";

export interface IPostType {
    postTypeId: string;
    displayFormat: string;
    taxonomy: Taxonomy;
}