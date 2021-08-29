/**
 * Media repository.
 */
export declare class MediaRepositry {
    fetchAllFilesAsync(): Promise<string[]>;
    postAsync(file: File): Promise<string>;
    removeAsync(urls: string[]): Promise<void>;
}
