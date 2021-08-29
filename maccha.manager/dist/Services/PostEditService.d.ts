import { Content } from "../Models/Contents/Entities/Content";
import { Taxonomy } from "../Models/Contents/Entities/Taxonomy";
/**
 * Users serive.
 */
export declare class PostsEditServic {
    private readonly repository;
    private _content;
    private isNew;
    private _taxonomy;
    constructor();
    get content(): Content | null;
    get taxonomy(): string | null;
    setContent(content: Content): void;
    initializeAsNewPost(taxonomy: Taxonomy): void;
    clear(): void;
    fetchAsync(taxonomy: string, contentId: string): Promise<void>;
    saveAsync(): Promise<void>;
    deleteAsync(): Promise<void>;
}
