import { Taxonomy } from "../Entities/Taxonomy";
import { ICreateTaxonomyParams, ISaveTaxonomyParams } from "../Params";

export interface ITaxonomiesRepository {
    findAsync(
        taxonomyId: string
    ): Promise<Taxonomy | null>;

    findIdByNameAsync(
        name: string,
        webSiteId: string,
    ): Promise<string | null>;

    findAllAsync(
        taxonomyIds?: string[],
        webSiteId?: string
    ): Promise<Taxonomy[]>;

    createAsync(
        webSiteId: string,
        params: ICreateTaxonomyParams
    ): Promise<Taxonomy>;

    deleteAsync(taxonomyId: string): Promise<void>;

    saveAsync(params: ISaveTaxonomyParams): Promise<Taxonomy>;
}