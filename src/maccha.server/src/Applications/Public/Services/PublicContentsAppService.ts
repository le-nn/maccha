import { ContentsService, TaxonomiesService } from "@/Models/Contents";
import { Content } from "@/Models/Contents/Entities/Content";
import { ISearchContentParams } from "@/Models/Contents/Params";
import { WebSitesService } from "@/Models/WebSites/web-sites.service";
import { BadRequestException, Inject, NotFoundException } from "@nestjs/common";
import { createDecipher } from "crypto";
import { PublicContentResponse } from "../Responses/PublicContentResponse";

/**
 * Provides public contents without authentication.
 */
export class PublicContentsAppService {
    constructor(
        @Inject(WebSitesService) private readonly webSitesService: WebSitesService,
        @Inject(ContentsService) private readonly contentsService: ContentsService,
        @Inject(TaxonomiesService) private readonly taxonomiesService: TaxonomiesService
    ) { }

    public async getAsync(
        identifier: string,
        taxonomy: string,
        contentId: string
    ): Promise<PublicContentResponse> {
        const webSiteId = await this.webSitesService.getWebSiteIdAsync(identifier);
        if (!webSiteId) {
            throw new NotFoundException(`identifier "${identifier}" is not found.`);
        }

        const taxonomyId = await this.taxonomiesService.getIdByNameAsync(taxonomy, webSiteId);
        if (!taxonomyId) {
            throw new BadRequestException("Taxonomy is not found.");
        }
        const c = await this.contentsService.getAsync(contentId);
        if (!c) {
            throw new NotFoundException(`Content: taxonomy ${taxonomy}, ${contentId} is not found.`);
        }

        return new PublicContentResponse({
            contentId: c.contentId,
            title: c.title,
            description: c.description,
            metadata: c.metadata,
            publishIn: c.publishIn?.toJSON() ?? c.createdAt.toJSON(),
            fields: c.fields.reduce((x, y) => ({ ...x, [y.name]: y.value }), {} as any),
            thumbnail: c.thumbnail
        });
    }

    /**
     * Search contents async from specified taxonomy blongs to.
     * @param user Login user info.
     * @param taxonomy Specifies which taxonomy it belongs to.
     * @param params Search options.
     * @returns Search result counts and contents.
     */
    public async searchAsync(
        identifier: string,
        taxonomy: string,
        params: ISearchContentParams
    ): Promise<[PublicContentResponse[], number]> {
        const webSiteId = await this.webSitesService.getWebSiteIdAsync(identifier);
        if (!webSiteId) {
            throw new NotFoundException(`identifier "${identifier}" is not found.`);
        }

        const taxonomyId = await this.taxonomiesService.getIdByNameAsync(taxonomy, webSiteId);
        if (taxonomyId === null) {
            throw new BadRequestException(`taxonomy ${taxonomy} is not found`);
        }

        const [collection, count] = await this.contentsService.searchAsync(taxonomyId, params);

        return [
            collection.map(c => new PublicContentResponse({
                contentId: c.contentId,
                title: c.title,
                description: c.description,
                metadata: c.metadata,
                publishIn: c.publishIn?.toJSON() ?? c.createdAt.toJSON(),
                fields: c.fields.reduce((x, y) => ({ ...x, [y.name]: y.value }), {} as any),
                thumbnail: c.thumbnail
            })),
            count
        ];
    }
}