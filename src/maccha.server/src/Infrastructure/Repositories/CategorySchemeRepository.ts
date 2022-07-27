import { CategoryMeta } from "@/Models/Contents/Entities/CategoryMeta";
import { ICategorySchemeRepository } from "@/Models/Contents/Repositories/ICategorySchemeRepository";

export class CategorySchemeRepository implements ICategorySchemeRepository{
    fetchAllAsync(taxonomyId: string): Promise<CategoryMeta[]> {
        throw new Error("Method not implemented.");
    }
    saveAsync(taxomomyId: string, categories: CategoryMeta[]): Promise<CategoryMeta[]> {
        throw new Error("Method not implemented.");
    }
}