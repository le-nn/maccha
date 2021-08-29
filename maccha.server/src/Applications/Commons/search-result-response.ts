export interface SearchResultResponse<T> {
    hitCount: number;
    collection: T[];
}