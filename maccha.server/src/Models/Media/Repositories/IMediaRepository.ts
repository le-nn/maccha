export interface IMediaRepository {
    getAllPathsAsync(userId: string): Promise<string[]>;
    postAsync(userId: string, file: any): Promise<string>;
    saveAvatarAsync(userId: string, file: any): Promise<string>;
    getAsync(path: string): Promise<File | null>;
    deleteAsync(files: string[]): Promise<void>;
}