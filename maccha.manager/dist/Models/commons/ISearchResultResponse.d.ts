export interface ISearchResultResponse<T> {
    hitCount: number;
    collection: T[];
}
