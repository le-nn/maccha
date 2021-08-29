interface SearchResponse<T> {
    hitCount: number;
    collection: T[];
}
