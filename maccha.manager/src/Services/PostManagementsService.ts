import { observable, computed, action, makeAutoObservable } from "mobx";
import { PostsRepository } from "../Repositories/PostsRepository";
import { Post } from "../Models/posts/entities/Post";
import { PostManagementsRepository } from "../Repositories/PostManagementsRepository";
import { PostType } from "../Models/posts/entities/PostType";
import { ICreatePostTypeParams } from "../Models/posts/params/ICreatePostTypeParams";
import { ISavePostTypeParams } from "../Models/posts/params/ISavePostTypeParams";

/**
 * Users serive.
 */
export class PostManagementsService {
    private readonly repository = new PostManagementsRepository();
    private _postTypes: PostType[] = [];
    private _selectedIndex: number = 0;

    public get postTypes() {
        return this._postTypes;
    }

    public get selectedIndex() {
        return this._selectedIndex;
    }

    public get selected(): PostType | null {
        return this.postTypes[this.selectedIndex] ?? null;
    }

    constructor() {
        makeAutoObservable(this);
    }

    /**
     * clear current selected user.
     * @param selectTaxonomy Taxonomy name if select.
     */
    public async fetchPostTypes(selectTaxonomy?: string) {
        try {
            this._postTypes = await this.repository.fetchPostTypesAsync();
            if (selectTaxonomy) {
                this.selectFromName(selectTaxonomy);
            }
        }
        catch {
            console.error("failed to fetch post types.");
        }
    }

    /**
     * clear current selected user.
     */
    public async createPostTypeAsync(postType: ICreatePostTypeParams) {
        try {
            const created = await this.repository.createPostType(postType);
            await this.fetchPostTypes();
            if (created) {
                this.selectFromName(created.taxonomy.name);
            }
        }
        catch {
            console.error("failed to create post type.");
        }
    }

    /**
     * select post type.
     * @param index post types index
     */
    public selectFromIndex(index: number) {
        this._selectedIndex = Math.min(
            this.postTypes.length, Math.max(0, index)
        );
    }

    public async removeAsync(postTypeId: string) {
        try {
            const selected = this.selected;

            await this.repository.removeAsync(postTypeId);
            await this.fetchPostTypes();

            if (selected) {
                this.selectFromName(selected.taxonomy.name);
            }

            if (!this.selected) {
                this.selectFromIndex(0);
            }
        }
        catch {
            throw new Error("Failed to delete.");
        }
    }

    public async savePostTypeAsync(params: ISavePostTypeParams) {
        try {
            await this.repository.saveAsync(params);
            await this.fetchPostTypes();
        }
        catch {
            throw new Error("Failed to save post type.");
        }
    }

    /**
     * select post type.
     * @param index post types index
     */
    public selectFromName(name: string) {
        const type = this.postTypes.find(t => t.taxonomy.name === name);
        if (type) {
            this._selectedIndex = this.postTypes.indexOf(type);
        }
    }
}
