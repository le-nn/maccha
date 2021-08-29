import { Taxonomy } from "../Entities/Taxonomy";
import { ICreateTaxonomyParams, ISaveTaxonomyParams } from "../Params";

export interface ITaxonomiesRepository {
    findAsync(
        taxonomyId: string
    ): Promise<Taxonomy | null>;

    findIdByNameAsync(
        name: string
    ): Promise<string | null>;

    findAllAsync(
        taxonomyIds?: string[],
        identifier?: string
    ): Promise<Taxonomy[]>;

    createAsync(
        identifier: string,
        params: ICreateTaxonomyParams
    ): Promise<Taxonomy>;

    deleteAsync(taxonomyId: string): Promise<void>;

    saveAsync(params: ISaveTaxonomyParams): Promise<Taxonomy>;
}