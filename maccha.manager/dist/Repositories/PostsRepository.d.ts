import { ISearchResultResponse } from "../Models/commons/ISearchResultResponse";
import { Content } from "../Models/Contents/Entities/Content";
import { ISearchContentParams } from "../Models/Contents/Params";
export declare class PostsRepository {
    fetchPostAsync(taxonomy: string, contentId: string): Promise<Content>;
    /**
     * fetch posts.
     */
    searchPostsAsync(postTypeName: string, serchOption: ISearchContentParams): Promise<ISearchResultResponse<Content>>;
    /**
     * save user.
     * @param user user
     */
    saveAsync(identifier: string, post: Content): Promise<Content>;
    /**
     * save user.
     * @param user user
     */
    createPostAsync(taxonomy: string, content: Content): Promise<Content>;
    /**
     * Delete a post.
     * @param postId post id.
     */
    deletePostAsync(taxonomy: string, postId: string): Promise<void>;
    /**
     * convert IUser to User instance.
     * @param user user interface
     */
    private toDomain;
}
