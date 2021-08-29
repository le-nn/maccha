import { LoginUser } from "@/Models/Authentications/login-user";
import { Taxonomy } from "@/Models/Contents/Entities/Taxonomy";
import { ICreateTaxonomyParams } from "@/Models/Contents/Params";
import { TaxonomiesService } from "@/Models/Contents/Services";

/**
 * Provice Taxonomies Application Service.
 */
export class TaxonomiesAppService {
    constructor(
        private readonly taxonomiesSeervice: TaxonomiesService
    ) {

    }

    /**
     * Get all taxonomies in current logined web site.
     * @param loginUser Login user.
     */
    public async getAll(loginUser: LoginUser): Promise<Taxonomy[]> {
        return await this.taxonomiesSeervice.getListAsync(undefined, loginUser.identifier);
    }

    /**
     * Create new taxonomy async.
     * @param loginUser Login user.
     * @param params Params to create taxonomy.
     */
    public async createAsync(loginUser: LoginUser, params: ICreateTaxonomyParams): Promise<Taxonomy> {
        return await this.taxonomiesSeervice.createAsync(loginUser.identifier, params);
    }
}