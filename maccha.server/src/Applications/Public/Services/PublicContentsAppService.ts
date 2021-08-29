import { ContentsService, TaxonomiesService } from "@/Models/Contents";
import { Content } from "@/Models/Contents/Entities/Content";
import { ISearchContentParams } from "@/Models/Contents/Params";
import { BadRequestException, Inject, NotFoundException } from "@nestjs/common";
import { createDecipher } from "crypto";
import { PublicContentResponse } from "../Responses/PublicContentResponse";

/**
 * Provides public contents without authentication.
 */
export class PublicContentsAppService {
    constructor(
        @Inject(ContentsService) private readonly contentsService: ContentsService,
        @Inject(TaxonomiesService) private readonly taxonomiesService: TaxonomiesService
    ) { }

    public async getAsync(
        indentifier: string,
        taxonomy: string,
        contentId: string
    ): Promise<PublicContentResponse> {
        const taxonomyId = await this.taxonomiesService.getIdByNameAsync(taxonomy);
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
            createdBy: {
                name: c.createdBy.name,
                thumbnail: c.createdBy.thumbnail
            },
            description: c.description,
            identifier: c.identifier,
            metadata: c.metadata,
            publishIn: c.publishIn?.toJSON() ?? c.createdAt.toJSON(),
            fields: c.fields.reduce((x, y) => ({ ...x, [y.name]: y.value }), {} as any),
            status: c.status,
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
        const taxonomyId = await this.taxonomiesService.getIdByNameAsync(taxonomy);

        if (taxonomyId === null) {
            throw new BadRequestException(`taxonomy ${taxonomy} is not found`);
        }

        const [collection, count] = await this.contentsService.searchAsync(taxonomyId, params);

        return [
            collection.map(c => new PublicContentResponse({
                contentId: c.contentId,
                title: c.title,
                createdBy: {
                    name: c.createdBy.name,
                    thumbnail: c.createdBy.thumbnail
                },
                description: c.description,
                identifier: c.identifier,
                metadata: c.metadata,
                publishIn: c.publishIn?.toJSON() ?? c.createdAt.toJSON(),
                fields: c.fields.reduce((x, y) => ({ ...x, [y.name]: y.value }), {} as any),
                status: c.status,
                thumbnail: c.thumbnail
            })),
            count
        ];
    }
}