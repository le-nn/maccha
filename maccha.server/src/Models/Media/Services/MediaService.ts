import { IMediaRepository } from "../Repositories/IMediaRepository";
import { Inject } from "@nestjs/common";

/**
 * Provides media service.
 */
export class MediaService {
    /**
     * constructor.
     * @param mediaRepository media repository
     */
    constructor(
        @Inject("MediaRepository") private readonly mediaRepository: IMediaRepository
    ) {

    }

    /**
     * Get all file paths async.
     */
    public async getAllPathsAsync(userId: string): Promise<string[]> {
        return await this.mediaRepository.getAllPathsAsync(userId);
    }

    /**
     * Get file async.
     * @param path File path
     */
    public async getAsync(path: string): Promise<File | null> {
        return await this.mediaRepository.getAsync(path);
    }

    /**
     * Post new file async.
     */
    public async postAsync(userId: string, file: any): Promise<string> {
        return await this.mediaRepository.postAsync(userId, file);
    }

    /**
     * Save avatar image async.
     */
    public async saveAvatarAsync(userId: string, file: any): Promise<string> {
        return await this.mediaRepository.saveAvatarAsync(userId, file);
    }

    public async deleteAsync(userId: string, files: string[]) {
        if (files.map(f => f.startsWith(`/uploads/${userId}`)).reduce((x, y) => x && y, true)) {
            return await this.mediaRepository.deleteAsync(files);
        }
        else {
            throw new Error("Failed to delete files. unauthorized.");
        }
    }
}