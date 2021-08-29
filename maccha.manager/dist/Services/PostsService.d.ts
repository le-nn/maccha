import { Content } from "../Models/Contents/Entities/Content";
import { ISearchContentParams } from "../Models/Contents/Params";
/**
 * Users serive.
 */
export declare class PostsService {
    private readonly repository;
    private _posts;
    private _hitCount;
    private _searchOption;
    constructor();
    get posts(): Content[];
    get hitCount(): number;
    get searchOption(): ISearchContentParams;
    /**
     * Set new search option.
     * @param option search option.
     */
    setSearchOption(option: ISearchContentParams): void;
    /**
     * clear current selected user.
     */
    searchPostsAsync(postTypeName: string): Promise<void>;
    deleteFromId(taxonomy: string, postId: string): Promise<void>;
}
