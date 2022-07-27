import { CategoryMeta } from "@/Models/Contents/Entities/CategoryMeta";
import { ICategorySchemeRepository } from "@/Models/Contents/Repositories/ICategorySchemeRepository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm/repository/Repository";
import { CategorySchemeEntity } from "../Database/Entities/CategorySchemeEntity";

export class CategorySchemeRepository implements ICategorySchemeRepository {

    constructor(@InjectRepository(CategorySchemeEntity) private readonly taxonomies: Repository<CategorySchemeEntity>) { }

    removeAsync(taxomomyId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async fetchAllAsync(taxonomyId: string): Promise<CategoryMeta[]> {
        return [
            {
                id:13,
                name:"sefsefs",
                order: 2,
                parentId:234,
                slug:"sesef"
            }
        ];
    }
    saveAsync(taxomomyId: string, categories: CategoryMeta[]): Promise<CategoryMeta[]> {
        throw new Error("Method not implemented.");
    }
}