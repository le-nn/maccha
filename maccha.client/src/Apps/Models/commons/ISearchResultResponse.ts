import { IPost } from "../posts/entities/IPost";

export interface ISearchResultResponse<T> {
    hitCount: number;
    collection: T[];
}