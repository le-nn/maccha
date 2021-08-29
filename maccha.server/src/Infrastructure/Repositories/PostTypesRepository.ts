import { PostTypeEntity } from "../Database/Entities/PostTypeEntity";
import { Repository } from "typeorm";
import { IPostTypesRepository } from "@/Models/Posts/Repositories/IPostTypeRepository";
import { ICreatePostTypeParams } from "@/Models/Posts/Params/ICreatePostTypeParams";
import { InjectRepository } from "@nestjs/typeorm";
import { PostType } from "@/Models/Posts/Entities/PostType";
import { InternalServerErrorException } from "@nestjs/common";
import { ISavePostTypeParams } from "@/Models/Posts/Params/ISavePostTypeParams";
import { SchemeEntity, TaxonomyEntity } from "../Database/Entities";
import { Taxonomy } from "@/Models/Contents/Entities/Taxonomy";
import { from } from "rxjs";
import { concatMap, filter, map, mergeMap, toArray } from "rxjs/operators";
import { Scheme } from "@/Models/Contents/Entities/Scheme";

export class PostTypesRepository implements IPostTypesRepository {
    constructor(
        @InjectRepository(PostTypeEntity) private readonly postTypes: Repository<PostTypeEntity>,
        @InjectRepository(TaxonomyEntity) private readonly taxonomies: Repository<TaxonomyEntity>,
        @InjectRepository(SchemeEntity) private readonly schemes: Repository<SchemeEntity>
    ) {

    }

    public async getAllAsync(identifier: string): Promise<PostType[]> {
        try {
            const postTypes = await from(
                await this.postTypes.find({
                    where: {
                        identifier,
                        isDeleted: false,
                    },
                    relations: ["taxonomy"]
                })
            ).pipe(
                mergeMap(m => from(this.schemes.find({ taxonomyId: m.taxonomyId })).pipe(
                    map(
                        schemes => new PostType({
                            identifier,
                            postTypeId: m.postTypeId ?? "",
                            taxonomy: new Taxonomy({
                                description: m.taxonomy.description,
                                displayName: m.taxonomy.displayName,
                                identifier,
                                name: m.taxonomy.name,
                                taxonomyId: m.taxonomy.taxonomyId,
                                schemes: schemes.sort((a, b) => a.sort < b.sort ? -1 : 1).map(s => new Scheme({
                                    description: s.description,
                                    displayName: s.displayName,
                                    metadata: s.metadata,
                                    name: s.name,
                                    schemeId: s.schemeId ?? "",
                                    type: s.type
                                }))
                            }),
                            displayFormat: m.displayFormat
                        })
                    ),
                )),
                filter(s => !!s),
                toArray()
            ).toPromise();

            return postTypes.sort((a, b) => a.taxonomy.name < b.taxonomy.name ? -1 : 1);
        }
        catch (ex) {
            console.error("Failed to data access.", ex.message);
            throw new Error("Failed to get posttype.");
        }
    }

    public async createAsync(identifier: string, params: ICreatePostTypeParams): Promise<PostType> {
        try {
            if (await this.taxonomies.findOne({ name: params.taxonomy.name })) {
                throw new Error(`taxonomy ${params.taxonomy.name} is already exists.`);
            }

            const createdTaxonomy = await this.taxonomies.save(new TaxonomyEntity({
                description: params.taxonomy.description,
                displayName: params.taxonomy.displayName,
                identifier,
                name: params.taxonomy.name,
                taxonomyId: undefined as any,
                isDeleted: false
            }));

            const postType = await this.postTypes.save(new PostTypeEntity({
                taxonomyId: createdTaxonomy.taxonomyId,
                identifier,
                displayFormat: params.displayFormat,
                isDeleted: false,
                taxonomy: undefined as any,
            }));

            const _ = await from(params.taxonomy.schemes.map((s, i) => ({ ...s, sort: i }))).pipe(
                mergeMap(
                    s => from(
                        this.schemes.save(
                            new SchemeEntity({
                                metadata: s.metadata,
                                description: s.description,
                                displayName: s.displayName,
                                type: s.type,
                                name: s.name,
                                taxonomyId: createdTaxonomy.taxonomyId,
                                sort: s.sort
                            })
                        )
                    )
                ),
            ).toPromise();
            if (postType.postTypeId) {
                const c = await this.findAsync(postType.postTypeId);
                if (c) {
                    return c;
                }
            }

            throw new Error("Cannot to create PostType");
        }
        catch (ex) {
            console.error("Failed to data access.", ex.message);
            throw new Error(ex.message);
        }
    }

    async deleteAsync(postTypeId: string): Promise<void> {
        try {
            const postType = await this.postTypes.update(
                {
                    postTypeId
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

    async findAsync(postTypeId: string): Promise<PostType | null> {
        try {
            const [postType] = await from(
                await this.postTypes.find({
                    where: {
                        postTypeId,
                        isDeleted: false,
                    },
                    relations: ["taxonomy"]
                })
            ).pipe(
                mergeMap(m => from(this.schemes.find({ taxonomyId: m.taxonomyId })).pipe(
                    map(
                        schemes => new PostType({
                            identifier: m.identifier,
                            postTypeId: m.postTypeId ?? "",
                            taxonomy: new Taxonomy({
                                description: m.taxonomy.description,
                                displayName: m.taxonomy.displayName,
                                identifier: m.identifier,
                                name: m.taxonomy.name,
                                taxonomyId: m.taxonomy.taxonomyId,
                                schemes: schemes.sort((a, b) => a.sort < b.sort ? -1 : 1).map(s => new Scheme({
                                    description: s.description,
                                    displayName: s.displayName,
                                    name: s.name,
                                    schemeId: s.schemeId ?? "",
                                    type: s.type,
                                    metadata: s.metadata
                                }))
                            }),
                            displayFormat: m.displayFormat
                        })
                    ),
                )),
                filter(s => !!s),
                toArray()
            ).toPromise();

            return postType ?? null;
        }
        catch (ex) {
            console.error("Failed to data access.", ex.message);
            throw new Error("Failed to get posttype.");
        }
    }

    /**
     * save post type.
     * @param params params to save post type.
     */
    public async saveAsync(params: ISavePostTypeParams): Promise<PostType> {
        try {

            await this.postTypes.update(
                {
                    postTypeId: params.postTypeId
                },
                {
                    displayFormat: params.displayFormat
                }
            );
            await this.taxonomies.update(
                {
                    taxonomyId: params.taxonomy.taxonomyId
                },
                {
                    description: params.taxonomy.description,
                    displayName: params.taxonomy.displayName,
                    name: params.taxonomy.name,
                    isDeleted: false,
                }
            );

            // await this.schemes.delete({
            //     taxonomyId: params.taxonomy.taxonomyId
            // });

            const _ = await from(params.taxonomy.schemes.map((s, i) => ({ ...s, sort: i }))).pipe(
                concatMap(
                    s => from(
                        this.schemes.save(
                            new SchemeEntity({
                                schemeId: s.schemeId,
                                sort: s.sort,
                                description: s.description,
                                displayName: s.displayName,
                                type: s.type,
                                name: s.name,
                                taxonomyId: params.taxonomy.taxonomyId,
                                metadata: s.metadata
                            })
                        )
                    )
                ),
            ).toPromise();

            return new PostType({
                taxonomy: new Taxonomy({
                    description: params.taxonomy.description,
                    displayName: params.taxonomy.displayName,
                    identifier: "identifier",
                    name: params.taxonomy.name,
                    taxonomyId: params.taxonomy.taxonomyId,
                    schemes: []
                }),
                postTypeId: params.postTypeId ?? "",
                identifier: "",
                displayFormat: params.displayFormat
            });
        }
        catch (ex) {
            console.error("Failed to data access.", ex.message);
            throw new Error(ex.message);
        }
    }
}