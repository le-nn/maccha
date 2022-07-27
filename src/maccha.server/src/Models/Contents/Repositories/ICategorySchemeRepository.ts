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
        taxomomyId: string,
        categories: ICreateCategoryParams[]
    ): Promise<CategoryMeta[]>;

    /**
     * Remove all categories that related in taxonomy.
     * @param taxomomyId The taxonomy id to remove.
     */
    removeAsync(taxomomyId: string): Promise<void>;
}