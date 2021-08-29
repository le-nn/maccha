import { Taxonomy } from "../../Contents/Entities/Taxonomy";
import { IPostType } from "./IPostType";
/**
 * post type entity.
 */
export declare class PostType implements IPostType {
    readonly postTypeId: string;
    readonly taxonomy: Taxonomy;
    readonly displayFormat: string;
    constructor(value?: Partial<PostType>);
    clone(params?: Partial<PostType>): PostType;
}
