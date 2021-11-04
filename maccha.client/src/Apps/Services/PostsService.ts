import { observable, computed, action, makeAutoObservable } from "mobx";
import { PostsRepository } from "../Repositories/PostsRepository";
import { Post } from "Apps/Models/Domain/posts/entities/Post";
import { PostType } from "Apps/Models/Domain/posts/entities/PostType";
import { Content } from "Apps/Models/Domain/Contents/Entities/Content";
import { ISearchContentParams } from "Apps/Models/Domain/Contents/Params";

/**
 * Users serive.
 */
export class PostsService {
    private readonly repository = new PostsRepository();
    private _posts: Content[] = [];
    private _hitCount = 0;
    private _searchOption: ISearchContentParams = {
        fetch: 30,
        offset: 0,
        filter: "",
        limit: "",
        order: ""
    };

    constructor() {
        makeAutoObservable(this);
    }

    public get posts() {
        return this._posts;
    }

    public get hitCount() {
        return this._hitCount;
    }

    public get searchOption() {
        return this._searchOption;
    }

    /**
     * Set new search option.
     * @param option search option.
     */
    public setSearchOption(option: ISearchContentParams) {
        this._searchOption = option;
    }

    /**
     * clear current selected user.
     */
    public async searchPostsAsync(postTypeName: string) {
        try {
            const searchResult = await this.repository.searchPostsAsync(postTypeName, this.searchOption);
            this._hitCount = searchResult.hitCount;
            this._posts = searchResult.collection;
        }
        catch {
            console.error("failed to search posts.");
        }
    }

    public async deleteFromId(taxonomy: string, postId: string) {
        try {
            await this.repository.deletePostAsync(taxonomy, postId);
        }
        catch {
            console.error("failed to fetch post types.");
        }
    }
}
