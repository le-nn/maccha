export declare class MediaService {
    private mediaRepository;
    private _files;
    private _selected;
    constructor();
    get selected(): string[];
    get files(): string[];
    setSelected(selected: string[]): void;
    removeSelectedAsync(): Promise<void>;
    fetchAllFilesAsync(): Promise<void>;
    postAsync(file: File): Promise<string | undefined>;
}
