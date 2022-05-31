import { Inject } from "@nestjs/common";
import { Taxonomy } from "../Entities/Taxonomy";
import { ICreateTaxonomyParams, ISaveTaxonomyParams } from "../Params";
import { ITaxonomiesRepository } from "../Repositories";

/**
 * Provides Texonomy service usecases.
 */
export class TaxonomiesService {
    constructor(
        @Inject("TaxonomiesRepository") private readonly taxonomiesRepository: ITaxonomiesRepository
    ) { }

    /**
     * Get a taxonomy by id async.
     * @param taxonomyId taxonomyId.
     * @returns taxomony.
     */
    public async getByIdAsync(taxonomyId: string): Promise<Taxonomy | null> {
        return this.taxonomiesRepository.findAsync(taxonomyId);
    }

    /**
     * Get a taxonomy by name async.
     * @param taxonomyName taxonomy name.
     * @returns taxomony.
     */
    public async getIdByNameAsync(taxonomyName: string, webSiteId: string): Promise<string | null> {
        return await this.taxonomiesRepository.findIdByNameAsync(taxonomyName, webSiteId);
    }

    /**
     * Get taxonomies async.
     * @param taxomonyIds taxonomy ids.
     * @returns Taxonomies.
     */
    public async getListAsync(taxomonyIds?: string[], webSiteId?: string): Promise<Taxonomy[]> {
        try {
            return this.taxonomiesRepository.findAllAsync(taxomonyIds, webSiteId);
        }
        catch (ex: any) {
            throw new Error(ex.message);
        }
    }

    /**
     * Save taxonomy async.
     * @param params params to save taxonomy.
     */
    public async saveAsync(params: ISaveTaxonomyParams): Promise<Taxonomy> {
        return this.taxonomiesRepository.saveAsync(params);
    }

    /**
     * Create new taxonomy async.
     * @param params params to create taxonomy.
     */
    public async createAsync(webSiteId: string, params: ICreateTaxonomyParams): Promise<Taxonomy> {
        return this.taxonomiesRepository.createAsync(webSiteId, params);
    }

    /**
     * Delte a taxonomy async.
     * @param taxonomyId taxonomyid to delete.
     */
    public async deleteByIdAsync(taxonomyId: string): Promise<boolean> {
        try {
            this.taxonomiesRepository.deleteAsync(taxonomyId);
            return true;
        }
        catch (ex: any) {
            return false;
        }
    }
}