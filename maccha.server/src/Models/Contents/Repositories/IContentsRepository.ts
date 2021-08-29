import { Content } from "../Entities/Content";
import { ICreateContentParams } from "../Params/ICreateContentParams";
import { ISaveContentParams } from "../Params/ISaveContentParams";
import { ISearchContentParams } from "../Params/ISearchContentParams";

/**
 * Provides mechanism to implements ContentRepository.
 */
export interface IContentsRepository {
    /**
     * find a post by id async.
     * @param postId user id
     */
    findByIdAsync(contentId: string): Promise<Content | null>;

    /**
     * get all posts.
     */
    searchAsync(
        taxonomyId: string,
        params?: ISearchContentParams
    ): Promise<[Content[], number]>;

    /**
     * Save content async.
     * @param params to create params.
     */
    saveAsync(
        identifier: string,
        params: ISaveContentParams
    ): Promise<Content>;

    /**
     * Create new content.
     * @param params to create post info async.
     */
    createAsync(
        identifier: string,
        params: ICreateContentParams
    ): Promise<Content>;

    /**
     * Delete content by id async.
     * @param postId post id
     */
    deleteAsync(
        contentId: string
    ): Promise<void>;
}