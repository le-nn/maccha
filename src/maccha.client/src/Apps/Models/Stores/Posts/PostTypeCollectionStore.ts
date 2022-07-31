import { observable, computed, action, makeAutoObservable } from "mobx";
import { PostType } from "Apps/Models/Domain/posts/entities/PostType";
import { ICreatePostTypeParams } from "Apps/Models/Domain/posts/params/ICreatePostTypeParams";
import { ISavePostTypeParams } from "Apps/Models/Domain/posts/params/ISavePostTypeParams";
import { PostManagementsRepository } from "Apps/Repositories/PostManagementsRepository";
import { FluxStore, Message, meta, State } from "memento.core";

class PostTypeState extends State<PostTypeState>{
    postTypes: PostType[] = [];
    selectedIndex = 0;

    get selected(): PostType | null {
        return this.postTypes[this.selectedIndex] ?? null;
    }

}

class SetFetchResult extends Message<{ postTyes: PostType[] }>{ }
class SetSelectedIndex extends Message<{ selectedIndex: number }>{ }

/**
 * Users serive.
 */
@meta({ name: "PostTypeCollectionStore" })
export class PostTypeCollectionStore extends FluxStore<PostTypeState> {

    constructor(private readonly repository: PostManagementsRepository) {
        super(new PostTypeState(), PostTypeCollectionStore.mutation);
    }

    static mutation(state: PostTypeState, message: Message) {
        switch (message.comparer) {
            case SetFetchResult: {
                const { payload } = message as SetFetchResult;
                return state.clone({
                    postTypes: payload.postTyes,
                });
            }
            case SetSelectedIndex: {
                const { payload } = message as SetSelectedIndex;
                return state.clone({
                    selectedIndex: payload.selectedIndex,
                });
            }
            default: new Error("The state is not handled");
        }
    }

    /**
     * clear current selected user.
     * @param selectTaxonomy Taxonomy name if select.
     */
    public async fetchPostTypes(selectTaxonomy?: string) {
        try {
            const items = await this.repository.fetchPostTypesAsync();
            this.mutate(new SetFetchResult({ postTyes: items }));
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
        const selectedIndex = Math.min(
            this.state.postTypes.length, Math.max(0, index)
        );
        this.mutate(new SetSelectedIndex({ selectedIndex }));
    }

    public async removeAsync(postTypeId: string) {
        try {
            const selected = this.state.selected;

            await this.repository.removeAsync(postTypeId);
            await this.fetchPostTypes();

            if (selected) {
                this.selectFromName(selected.taxonomy.name);
            }

            if (!this.state.selected) {
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
        const type = this.state.postTypes.find(t => t.taxonomy.name === name);
        if (type) {
            this.mutate(new SetSelectedIndex({
                selectedIndex: this.state.postTypes.indexOf(type)
            }));
        }
    }
}
