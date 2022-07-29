import { CategoryMeta } from "@/Models/Contents/Entities/CategoryMeta";
import { Scheme } from "@/Models/Contents/Entities/Scheme";
import { Taxonomy } from "@/Models/Contents/Entities/Taxonomy";
import { ISaveTaxonomyParams } from "@/Models/Contents/Params";
import { ICreateTaxonomyParams } from "@/Models/Contents/Params/ICreateTaxonomyParams";
import { ITaxonomiesRepository } from "@/Models/Contents/Repositories";
import { ICategorySchemeRepository } from "@/Models/Contents/Repositories/ICategorySchemeRepository";
import { Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TaxonomyEntity } from "../Database/Entities";


/****************************************************
 * this file is not wors !!!!!!!!!!!!!!!!!!!!!!!!
 ****************************************************/

/**
 * Implements for TaxonomiesRepository.
 */
export class TaxonomiesRepository implements ITaxonomiesRepository {
    constructor(
        @InjectRepository(TaxonomyEntity) private readonly taxonomies: Repository<TaxonomyEntity>,
        @Inject("CategorySchemeRepository") private readonly categorySchemeRepository: ICategorySchemeRepository,
    ) {

    }

    public async findIdByNameAsync(name: string, identifier: string): Promise<string | null> {
        try {
            const taxonomy = await this.taxonomies.findOne({
                where: {
                    identifier: identifier,
                    name,
                }
            });
            if (!taxonomy || taxonomy.isDeleted) {
                return null;
            }

            return taxonomy.taxonomyId!;
        }
        catch (ex: any) {
            console.error("Error occured when getting taxonomy from id.", ex.message);
            throw new Error("Error occured when getting taxonomy from id. ");
        }
    }

    public async findAsync(
        taxonomyId?: string
    ): Promise<Taxonomy | null> {
        try {
            const taxonomy = await this.taxonomies.findOne({ where: { taxonomyId } });
            if (!taxonomy || taxonomy.isDeleted) {
                return null;
            }

            return new Taxonomy({
                taxonomyId: taxonomy.taxonomyId!,
                displayName: taxonomy.displayName,
                name: taxonomy.name,
                description: taxonomy.description,
                identifier: taxonomy.identifier,
                schemes: taxonomy.schemes?.sort((a, b) => a.sort > b.sort ? -1 : 1).map(
                    s => new Scheme({
                        description: s.description,
                        displayName: s.description,
                        name: s.name,
                        schemeId: s.schemeId ?? "",
                        type: s.type,
                        metadata: s.metadata
                    }),
                ) ?? [],
                categorySchemes: await this.categorySchemeRepository.fetchAllAsync(taxonomy.taxonomyId)
            });
        }
        catch (ex: any) {
            console.error("Error occured when getting taxonomy from id.", ex.message);
            throw new Error("Error occured when getting taxonomy from id. ");
        }
    }

    public async findAllAsync(
        taxonomyIds?: string[],
        identifier?: string
    ): Promise<Taxonomy[]> {
        try {
            const taxonomies = await this.taxonomies.find({
                where: {
                    identifier,
                    isDeleted: false
                }
            });

            const taxonomyAndCategoryMap = new Map<string, CategoryMeta[]>();
            for (const t of taxonomies) {
                const categories = await this.categorySchemeRepository.fetchAllAsync(t.taxonomyId);
                taxonomyAndCategoryMap.set(t.taxonomyId, categories);
            }

            return taxonomies.map(taxonomy => new Taxonomy({
                description: taxonomy.description,
                displayName: taxonomy.displayName,
                taxonomyId: taxonomy.taxonomyId!,
                name: taxonomy.name,
                identifier: taxonomy.identifier,
                categorySchemes: taxonomyAndCategoryMap.get(taxonomy.taxonomyId) ?? [],
                schemes: []
            }));
        }
        catch (ex: any) {
            console.error("Failed to data access.", ex.message);
        }
        throw new Error("Error occured when getting taxonomies.");
    }

    public async createAsync(identifier: string, params: ICreateTaxonomyParams): Promise<Taxonomy> {
        try {
            const taxonomy = await this.taxonomies.save(
                new TaxonomyEntity({
                    taxonomyId: "",
                    description: params.description,
                    name: params.name,
                    displayName: params.displayName,
                    identifier,
                    isDeleted: false
                })
            );

            await this.categorySchemeRepository.saveAsync(
                taxonomy.taxonomyId,
                params.categorySchemes
            );

            return new Taxonomy({
                description: taxonomy.description,
                taxonomyId: taxonomy.taxonomyId,
                displayName: taxonomy.displayName,
                name: taxonomy.name,
                identifier: taxonomy.identifier,
                schemes: taxonomy.schemes?.sort((a, b) => a.sort < b.sort ? -1 : 1).map(
                    s => new Scheme({
                        description: s.description,
                        displayName: s.description,
                        name: s.name,
                        schemeId: s.schemeId ?? "",
                        type: s.type,
                        metadata: s.type
                    })
                ) ?? [],
                categorySchemes: []
            });
        }
        catch (ex: any) {
            console.error("Failed to data access.", ex.message);
            throw new Error(ex.message);
        }
    }

    async deleteAsync(taxonomyId: string): Promise<void> {
        try {
            const taxonomy = await this.taxonomies.update(
                {
                    taxonomyId
                },
                {
                    isDeleted: true
                }
            );

            this.categorySchemeRepository.removeAsync(taxonomyId);
        }
        catch (ex: any) {
            console.error("Failed to data access.", ex.message);
            throw new Error(ex.message);
        }
    }

    /**
     * save post type.
     * @param params params to save post type.
     */
    public async saveAsync(params: ISaveTaxonomyParams): Promise<Taxonomy> {
        try {
            const taxonomy = await this.taxonomies.update(
                {
                    taxonomyId: params.taxonomyId
                },
                {
                    displayName: params.displayName,
                    name: params.name,
                    description: params.description,
                }
            );
            await this.categorySchemeRepository.saveAsync(params.taxonomyId, params.categorySchemes);

            return new Taxonomy({
                taxonomyId: taxonomy.raw.taxonomyId,
                displayName: taxonomy.raw.displayName,
                name: taxonomy.raw.name,
                description: taxonomy.raw.description,
                identifier: taxonomy.raw.identifier,
                categorySchemes: [],
                schemes: []
            });
        }
        catch (ex: any) {
            console.error("Failed to data access.", ex.message);
            throw new Error(ex.message);
        }
    }
}