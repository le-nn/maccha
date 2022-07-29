import { CategoryMeta } from "../Entities/CategoryMeta";
import { ICreateCategoryParams } from "../Params/ICreateCategoryParams";

export interface ICategorySchemeRepository {
    /**
     * get all categories.
     */
    fetchAllAsync(
        taxonomyId: string
    ): Promise<CategoryMeta[]>;

    /**
     * Save categories async.
     * @param params to create params.
     */
    saveAsync(
        taxonomyId: string,
        categories: ICreateCategoryParams[]
    ): Promise<CategoryMeta[]>;

    /**
     * Remove all categories that related in taxonomy.
     * @param taxonomyId The taxonomy id to remove.
     */
    removeAsync(taxonomyId: string): Promise<void>;
}