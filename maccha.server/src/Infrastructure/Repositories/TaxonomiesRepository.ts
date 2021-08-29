import { Scheme } from "@/Models/Contents/Entities/Scheme";
import { Taxonomy } from "@/Models/Contents/Entities/Taxonomy";
import { ISaveTaxonomyParams } from "@/Models/Contents/Params";
import { ICreateTaxonomyParams } from "@/Models/Contents/Params/ICreateTaxonomyParams";
import { ITaxonomiesRepository } from "@/Models/Contents/Repositories";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TaxonomyEntity } from "../Database/Entities";

/**
 * Implements for TaxonomiesRepository.
 */
export class TaxonomiesRepository implements ITaxonomiesRepository {
    constructor(
        @InjectRepository(TaxonomyEntity) private readonly taxonomies: Repository<TaxonomyEntity>
    ) {

    }

    public async findIdByNameAsync(name: string): Promise<string | null> {
        try {
            const taxonomy = await this.taxonomies.findOne({
                name
            });
            if (!taxonomy || taxonomy.isDeleted) {
                return null;
            }

            return taxonomy.taxonomyId!;
        }
        catch (ex) {
            console.error("Error occured when getting taxonomy from id.", ex.message);
            throw new Error("Error occured when getting taxonomy from id. ");
        }
    }

    public async findAsync(
        taxonomyId?: string
    ): Promise<Taxonomy | null> {
        try {
            const taxonomy = await this.taxonomies.findOne(taxonomyId);
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
                    })
                ) ?? []
            });
        }
        catch (ex) {
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
                identifier,
                isDeleted: false
            });
            return taxonomies.map(taxonomy => new Taxonomy({
                description: taxonomy.description,
                displayName: taxonomy.displayName,
                taxonomyId: taxonomy.taxonomyId!,
                name: taxonomy.name,
                identifier: taxonomy.identifier
            }));
        }
        catch (ex) {
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
                ) ?? []
            });
        }
        catch (ex) {
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
        }
        catch (ex) {
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
            return new Taxonomy({
                taxonomyId: taxonomy.raw.taxonomyId,
                displayName: taxonomy.raw.displayName,
                name: taxonomy.raw.name,
                description: taxonomy.raw.description,
                identifier: taxonomy.raw.identifier,
            });
        }
        catch (ex) {
            console.error("Failed to data access.", ex.message);
            throw new Error(ex.message);
        }
    }
}