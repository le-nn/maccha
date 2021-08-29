import { LoginUser } from "@/Models/Authentications/login-user";
import { Content } from "@/Models/Contents/Entities/Content";
import { ICreateContentParams, ISaveContentParams, ISearchContentParams } from "@/Models/Contents/Params";
import { ContentsService, TaxonomiesService } from "@/Models/Contents/Services";
import { BadRequestException, Inject, InternalServerErrorException } from "@nestjs/common";
import { DateTime } from "luxon";
import { title } from "process";
import { CreateContentParams } from "../Params/CreateContentParams";
import { SaveContentParams } from "../Params/SaveContentParams";

export class ContentsAppService {
    constructor(
        @Inject(ContentsService) private readonly contentsService: ContentsService,
        @Inject(TaxonomiesService) private readonly taxonomiesService: TaxonomiesService
    ) { }

    /**
     * Get a content from contentId.
     * @param user Login user.
     * @param taxonomyName Taxonomy name.
     * @param contentId contentid.
     * @returns Content.
     */
    public async getAsync(
        identifier: string,
        taxonomyName: string,
        contentId: string
    ) {
        const taxonomyId = await this.taxonomiesService.getIdByNameAsync(taxonomyName);
        if (!taxonomyId) {
            throw new BadRequestException("Taxonomy is not found.");
        }
        return this.contentsService.getAsync(contentId);
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
    ): Promise<[Content[], number]> {
        const taxonomyId = await this.taxonomiesService.getIdByNameAsync(taxonomy);
        if (taxonomyId === null) {
            throw new BadRequestException(`taxonomy ${taxonomy} is not found`);
        }

        return await this.contentsService.searchAsync(taxonomyId, params);
    }

    /**
     * Create new content async.
     * @param loginUser Login user info.
     * @param params Params to create content.
     */
    public async createAsync(
        loginUser: LoginUser,
        taxonomyName: string,
        params: CreateContentParams
    ): Promise<Content> {
        const taxonomyId = await this.taxonomiesService.getIdByNameAsync(taxonomyName);
        if (!taxonomyId) {
            throw new BadRequestException("Taxonomy is not found.");
        }

        const taxonomy = await this.taxonomiesService.getByIdAsync(taxonomyId);

        if (taxonomy) {
            return await this.contentsService.createAsync(
                loginUser.identifier,
                {
                    fields: params.fields,
                    description: params.description,
                    metadata: params.metadata,
                    publishIn: DateTime.fromISO(params.publishIn),
                    thumbnail: params.thumbnail,
                    status: params.status,
                    title: params.title,
                    taxonomyId,
                    userId: loginUser.userId,
                });
        }

        throw new InternalServerErrorException("Unhandled error occured.");
    }

    /**
     * Create new content async.
     * @param loginUser Login user info.
     * @param params Params to create content.
     */
    public async saveAsync(
        loginUser: LoginUser,
        taxonomyName: string,
        params: SaveContentParams
    ): Promise<Content> {
        const taxonomyId = await this.taxonomiesService.getIdByNameAsync(taxonomyName);
        if (!taxonomyId) {
            throw new BadRequestException("Taxonomy is not found.");
        }

        const taxonomy = await this.taxonomiesService.getByIdAsync(taxonomyId);

        if (taxonomy) {
            return await this.contentsService.saveAsync(
                loginUser.identifier,
                {
                    fields: params.fields,
                    description: params.description,
                    metadata: params.metadata,
                    publishIn: DateTime.fromISO(params.publishIn),
                    thumbnail: params.thumbnail,
                    status: params.status,
                    title: params.title,
                    contentId: params.contentId
                });
        }

        throw new InternalServerErrorException("Unhandled error occured.");
    }

    /**
     * Create new content async.
     * @param loginUser Login user info.
     * @param params Params to create content.
     */
    public async removeAsync(
        loginUser: LoginUser,
        taxonomyName: string,
        contentId: string
    ): Promise<Content> {
        const taxonomyId = await this.taxonomiesService.getIdByNameAsync(taxonomyName);
        if (!taxonomyId) {
            throw new BadRequestException("Taxonomy is not found.");
        }

        const taxonomy = await this.taxonomiesService.getByIdAsync(taxonomyId);

        if (taxonomy) {
            await this.contentsService.delete(contentId);
        }

        throw new InternalServerErrorException("Unhandled error occured.");
    }
}