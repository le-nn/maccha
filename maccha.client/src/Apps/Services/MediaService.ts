import { observable, computed, action, makeAutoObservable } from "mobx";
import { MediaRepositry } from "../Repositories/MediaRepository";

export class MediaService {
    private mediaRepository = new MediaRepositry();
    private _files: string[] = [];
    private _selected: string[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    public get selected() {
        return this._selected;
    }

    public get files() {
        return this._files;
    }

    public setSelected(selected: string[]) {
        this._selected = [...selected];
    }

    public async removeSelectedAsync() {
        try {
            await this.mediaRepository.removeAsync(this.selected);
            await this.fetchAllFilesAsync();
        }
        catch {
            throw new Error("Failed to remove files. Files: "+ this.selected.join(","));
        }
    }

    public async fetchAllFilesAsync(): Promise<void> {
        try {
            this._files = await this.mediaRepository.fetchAllFilesAsync();
        }
        catch {
            throw new Error("Failed to fetch files.");
        }
    }

    public async postAsync(file: File): Promise<string | undefined> {
        try {
            const path = await this.mediaRepository.postAsync(file);
            await this.fetchAllFilesAsync();
            return path;
        }
        catch {
            throw new Error("Failed to fetch files.");
        }
    }
}