import { DateTime } from "luxon";
import { IPost } from "./IPost";
import { PostType } from "./PostType";
import { PostStatusType } from "./PostStatusType";
import { ICreatedUser } from "./ICreatedUser";

/**
 * express post.
 */
export class Post implements IPost {
    readonly postId = "";
    readonly media: string[] = [];
    readonly postType: PostType = new PostType();
    readonly status: PostStatusType = PostStatusType.Public;
    readonly title = "";
    readonly content = "";
    readonly thumbnail = "";
    readonly publishIn = DateTime.local();
    readonly updatedAt = DateTime.local();
    readonly createdAt = DateTime.local();
    readonly createdBy: ICreatedUser = {
        name: "",
        thumbnail: ""
    };
    readonly metadata = "";

    /**
     * constructor
     * @param value initial value
     */
    constructor(value?: IPost) {
        Object.assign(this, value);
    }

    public with(params: Partial<IPost>) {
        return new Post({ ...this, ...params });
    }

    public clone() {
        return new Post(this);
    }
}
