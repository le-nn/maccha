import { axios } from "./config";

/**
 * Media repository.
 */
export class MediaRepositry {
    public async fetchAllFilesAsync(): Promise<string[]> {
        const response = await axios.get<string[]>("/api/media");
        return response.data ?? [];
    }

    public async postAsync(file: File): Promise<string> {
        var params = new FormData();
        params.append("file", file);
        const response = await axios.post<string>("/api/media", params);
        return response.data;
    }

    public async removeAsync(urls: string[]): Promise<void> {
        await axios.delete("/api/media", {
            params: {
                file: urls
            }
        });
    }
}