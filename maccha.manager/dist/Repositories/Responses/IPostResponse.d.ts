import { PostType } from "../../Models/posts/entities/PostType";
import { PostStatusType } from "../../Models/posts/entities/PostStatusType";
import { ICreatedUser } from "../../Models/posts/entities/ICreatedUser";
/**
 * express post.
 */
export interface IPostResponse {
    readonly postId: string;
    readonly title: string;
    readonly content: string;
    readonly thumbnail: string;
    readonly media: string[];
    readonly postType: PostType;
    readonly status: PostStatusType;
    readonly publishIn: string;
    readonly updatedAt: string;
    readonly createdAt: string;
    readonly createdBy: ICreatedUser;
    readonly metadata: string;
}
