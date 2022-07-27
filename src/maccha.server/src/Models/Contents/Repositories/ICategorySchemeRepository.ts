import { CategoryMeta } from "../Entities/CategoryMeta";

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
        categories: CategoryMeta[]
    ): Promise<CategoryMeta[]>;
}