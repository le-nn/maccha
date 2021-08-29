import { PostStatusType } from "../entities/PostStatusType";
export interface ISavePostParams {
    readonly postId: string;
    readonly media: string[];
    readonly status: PostStatusType;
    readonly title: string;
    readonly content: string;
    readonly thumbnail: string;
    readonly publishIn: string;
    readonly metadata: string;
}
