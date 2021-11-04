import { DateTime } from "luxon";
import { PostType } from "./PostType";
import { PostStatusType } from "./PostStatusType";
import { ICreatedUser } from "./ICreatedUser";

/**
 * express post.
 */
export interface IPost {
    readonly postId: string;
    readonly title: string;
    readonly content: string;
    readonly thumbnail: string;
    readonly media: string[];
    readonly postType: PostType;
    readonly status: PostStatusType;
    readonly publishIn: DateTime;
    readonly updatedAt: DateTime;
    readonly createdAt: DateTime;
    readonly createdBy: ICreatedUser;
    readonly metadata: string;
}
