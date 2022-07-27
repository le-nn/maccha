import { CategoryTree } from "../../Contents/Entities/CategoryTree";
import { Taxonomy } from "../../Contents/Entities/Taxonomy";
import { IPostType } from "./IPostType";

/**
 * post type entity.
 */
export class PostType implements IPostType {
    readonly postTypeId: string = "";
    readonly taxonomy: Taxonomy = new Taxonomy();
    readonly displayFormat: string = "card";

    constructor(value?: Partial<PostType>) {
        Object.assign(this, value);
    }

    clone(params?: Partial<PostType>): PostType {
        return new PostType({ ...this, ...params });
    }
}