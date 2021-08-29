import { Inject } from "@nestjs/common";
import { Content } from "../Entities/Content";
import { ICreateContentParams } from "../Params/ICreateContentParams";
import { ISaveContentParams } from "../Params/ISaveContentParams";
import { ISearchContentParams } from "../Params/ISearchContentParams";
import { IContentsRepository } from "../Repositories";

/**
 * Provides Contents usecases.
 */
export class ContentsService {
    constructor(
        @Inject("ContentsRepository") private readonly contentsRepository: IContentsRepository,
    ) { }

    /**
     * Get content async.
     * @param contentId cotnentId.
     * @returns Content.
     */
    public async getAsync(contentId: string) {
        return await this.contentsRepository.findByIdAsync(
            contentId
        );
    }

    /**
     * Search contents async.
     * @param taxonomyId taxonomyId.
     * @param searchContentParams Options for seaching.
     * @returns Search results.
     */
    public async searchAsync(
        taxonomyId: string,
        searchContentParams?: ISearchContentParams
    ): Promise<[Content[], number]> {
        return await this.contentsRepository.searchAsync(
            taxonomyId,
            searchContentParams
        );
    }

    /**
     * Create new content async.
     * @param params Params to create.
     * @returns Created content.
     */
    public async createAsync(identifier: string, params: ICreateContentParams): Promise<Content> {
        return await this.contentsRepository.createAsync(
            identifier,
            params
        );
    }

    /**
     * Save content async.
     * @param params params to save.
     * @returns Saved content.
     */
    public async saveAsync(identifier: string, params: ISaveContentParams): Promise<Content> {
        return await this.contentsRepository.saveAsync(identifier, params);
    }

    /**
     * Delete content by id.
     * @param contentId contentId to delete.
     */
    public async delete(contentId: string): Promise<boolean> {
        try {
            await this.contentsRepository.deleteAsync(contentId);
            return true;
        }
        catch {
            return false;
        }
    }
}