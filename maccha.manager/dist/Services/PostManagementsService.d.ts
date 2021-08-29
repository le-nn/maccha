import { PostType } from "../Models/posts/entities/PostType";
import { ICreatePostTypeParams } from "../Models/posts/params/ICreatePostTypeParams";
import { ISavePostTypeParams } from "../Models/posts/params/ISavePostTypeParams";
/**
 * Users serive.
 */
export declare class PostManagementsService {
    private readonly repository;
    private _postTypes;
    private _selectedIndex;
    get postTypes(): PostType[];
    get selectedIndex(): number;
    get selected(): PostType | null;
    constructor();
    /**
     * clear current selected user.
     * @param selectTaxonomy Taxonomy name if select.
     */
    fetchPostTypes(selectTaxonomy?: string): Promise<void>;
    /**
     * clear current selected user.
     */
    createPostTypeAsync(postType: ICreatePostTypeParams): Promise<void>;
    /**
     * select post type.
     * @param index post types index
     */
    selectFromIndex(index: number): void;
    removeAsync(postTypeId: string): Promise<void>;
    savePostTypeAsync(params: ISavePostTypeParams): Promise<void>;
    /**
     * select post type.
     * @param index post types index
     */
    selectFromName(name: string): void;
}
