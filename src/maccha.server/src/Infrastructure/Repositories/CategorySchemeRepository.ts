import { CategoryMeta } from "@/Models/Contents/Entities/CategoryMeta";
import { ICategorySchemeRepository } from "@/Models/Contents/Repositories/ICategorySchemeRepository";
import { InjectRepository } from "@nestjs/typeorm";
import { In } from "typeorm";
import { Repository } from "typeorm/repository/Repository";
import { CategorySchemeEntity } from "../Database/Entities/CategorySchemeEntity";

export class CategorySchemeRepository implements ICategorySchemeRepository {
    constructor(
        @InjectRepository(CategorySchemeEntity)
        private readonly categrySchemes: Repository<CategorySchemeEntity>
    ) { }

    async removeAsync(taxonomyId: string): Promise<void> {
        try {
            await this.categrySchemes.delete({
                taxonomyId: taxonomyId,
            });
        }
        catch {
            throw expect;
        }
    }

    async fetchAllAsync(taxonomyId: string): Promise<CategoryMeta[]> {
        try {
            const categorySchemes = await this.categrySchemes.findBy({ taxonomyId, });

            return categorySchemes.map(c => ({
                id: c.id,
                name: c.name,
                order: c.order,
                parentId: c.parentId,
                slug: c.slug
            }));
        }
        catch (expect) {
            throw expect;
        }
    }

    async saveAsync(taxonomyId: string, categories: CategoryMeta[]): Promise<CategoryMeta[]> {
        try {
            await this.categrySchemes.delete({
                taxonomyId: taxonomyId,
            });

            const items = await this.categrySchemes.insert(
                categories.map(x => ({
                    id: x.id,
                    name: x.name,
                    order: x.order,
                    slug: x.slug,
                    taxonomyId: taxonomyId,
                    parentId: x.parentId,
                }))
            );

            return [];
        }
        catch (expect) {
            throw expect;
        }
    }

    async slugsToIds(taxonomyId: string, slugs: string[]): Promise<number[]> {
        const categorySchemes = await this.categrySchemes.find({
            where: {
                taxonomyId,
                slug: In(slugs),
            },
            select: ["id"]
        });

        return categorySchemes.map(e => e.id);
    }
}