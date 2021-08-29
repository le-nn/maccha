import { Taxonomy } from "@/Models/Contents/Entities/Taxonomy";

export interface IPostType {
    postTypeId: string;
    identifier: string;
    taxonomy: Taxonomy;
    displayFormat: string;
}