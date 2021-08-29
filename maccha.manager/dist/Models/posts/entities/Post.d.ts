import { DateTime } from "luxon";
import { IPost } from "./IPost";
import { PostType } from "./PostType";
import { PostStatusType } from "./PostStatusType";
import { ICreatedUser } from "./ICreatedUser";
/**
 * express post.
 */
export declare class Post implements IPost {
    readonly postId = "";
    readonly media: string[];
    readonly postType: PostType;
    readonly status: PostStatusType;
    readonly title = "";
    readonly content = "";
    readonly thumbnail = "";
    readonly publishIn: DateTime;
    readonly updatedAt: DateTime;
    readonly createdAt: DateTime;
    readonly createdBy: ICreatedUser;
    readonly metadata = "";
    /**
     * constructor
     * @param value initial value
     */
    constructor(value?: IPost);
    with(params: Partial<IPost>): Post;
    clone(): Post;
}
