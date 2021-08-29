import { Taxonomy } from "@/Models/Contents/Entities/Taxonomy";
import { IPostType } from "./IPostType";

/**
 * Post type entity.
 */
export class PostType implements IPostType {
    readonly postTypeId: string = "";
    readonly taxonomy: Taxonomy = new Taxonomy();
    readonly identifier: string = "";
    readonly displayFormat: string = "";

    constructor(value: IPostType) {
        Object.assign(this, value);
    }
}