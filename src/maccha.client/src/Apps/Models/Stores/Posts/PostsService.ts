import { observable, computed, action, makeAutoObservable } from "mobx";
import { Post } from "Apps/Models/Domain/posts/entities/Post";
import { PostType } from "Apps/Models/Domain/posts/entities/PostType";
import { Content } from "Apps/Models/Domain/Contents/Entities/Content";
import { ISearchContentParams } from "Apps/Models/Domain/Contents/Params";
import { PostsRepository } from "Apps/Repositories/PostsRepository";
import { meta, FluxStore, State, Message } from "memento.core";

class PostCollectionState extends State<PostCollectionState> {
    posts: Content[] = [];
    hitCount = 0;
    searchOption: ISearchContentParams = {
        fetch: 30,
        offset: 0,
        filter: "",
        limit: "",
        order: ""
    };
}

class SetSearchOption extends Message<ISearchContentParams> { }
class SetSearchResult extends Message<{
    posts: Content[],
    hitCount: number
}> { }


/**
 * Users serive.
 */
@meta({ name: "PostCollectionStore" })
export class PostCollectionStore extends FluxStore<PostCollectionState> {
    private readonly repository = new PostsRepository();

    constructor() {
        super(new PostCollectionState(), PostCollectionStore.mutation);
    }

    static mutation(state: PostCollectionState, message: Message) {
        switch (message.comparer) {
            case SetSearchResult: {
                const { payload } = message as SetSearchResult;
                return state.clone({
                    hitCount: payload.hitCount,
                    posts: payload.posts,
                });
            }
            case SetSearchOption: {
                const { payload } = message as SetSearchOption;
                return state.clone({
                    searchOption: payload,
                });
            }
        }
    }

    /**
     * Set new search option.
     * @param option search option.
     */
    public setSearchOption(option: ISearchContentParams) {
        this.mutate(new SetSearchOption(option));
    }

    /**
     * clear current selected user.
     */
    public async searchPostsAsync(postTypeName: string) {
        try {
            const searchResult = await this.repository.searchPostsAsync(postTypeName, this.state.searchOption);
            this.mutate(new SetSearchResult({
                hitCount: searchResult.hitCount,
                posts: searchResult.collection,
            }));
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
