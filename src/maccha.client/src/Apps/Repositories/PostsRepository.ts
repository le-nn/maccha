import { axios, repositoryConfig } from "./config";
import { WebSite } from "../Models/Domain/sites/web-site";
import { IPost } from "../Models/Domain/posts/entities/IPost";
import { Post } from "../Models/Domain/posts/entities/Post";
import { ISearchResultResponse } from "../Models/Domain/commons/ISearchResultResponse";
import { DateTime } from "luxon";
import { IPostResponse } from "./Responses/IPostResponse";
import { ISavePostParams } from "../Models/Domain/posts/params/ISavePostParams";
import { Content } from "../Models/Domain/Contents/Entities/Content";
import { Field } from "../Models/Domain/Contents/Entities/Field";
import { ISearchContentParams } from "../Models/Domain/Contents/Params";


export class PostsRepository {
    public async fetchPostAsync(taxonomy: string, contentId: string) {
        try {
            const response = await axios.get<Content>(`/api/contents/${taxonomy}/${contentId}`);
            return this.toDomain(response.data);
        }
        catch (ex) {
            console.error("failed to fetch user.", ex);
            throw new Error("failed to fetch user.");
        }
    }

    /**
     * fetch posts.
     */
    public async searchPostsAsync(
        postTypeName: string,
        serchOption: ISearchContentParams
    ): Promise<ISearchResultResponse<Content>> {
        try {
            const response = await axios.get<ISearchResultResponse<Content>>(`/api/contents/${postTypeName}`, {
                params: serchOption,
            });
            return {
                hitCount: response.data.hitCount,
                collection: response.data.collection.map(x => this.toDomain(x))
            };
        }
        catch (ex) {
            console.error("failed to fetch posts.", ex);
            throw new Error("failed to fetch posts.");
        }
    }

    /**
     * save user.
     * @param user user
     */
    public async saveAsync(webSiteId: string, post: Content): Promise<Content> {
        try {
            const response = await axios.put<Content>("/api/contents/" + webSiteId, post);
            return this.toDomain(response.data);
        }
        catch (ex) {
            console.error("failed to fetch posts.", ex);
            throw new Error("failed to save user.");
        }
    }

    /**
     * save user.
     * @param user user
     */
    public async createPostAsync(taxonomy: string, content: Content): Promise<Content> {
        try {
            const response = await axios.post<Content>("/api/contents/" + taxonomy, content);
            return this.toDomain(response.data);
        }
        catch (ex) {
            console.error("failed to fetch posts.", ex);
            throw new Error("failed to save user.");
        }
    }

    /**
     * Delete a post.
     * @param postId post id.
     */
    public async deletePostAsync(taxonomy: string, postId: string) {
        try {
            await axios.delete("/api/contents/" + taxonomy + "/" + postId);
        }
        catch (ex) {
            throw new Error("failed to delete post.");
        }
    }

    /**
     * convert IUser to User instance.
     * @param user user interface
     */
    private toDomain(post: Content) {
        return new Content({
            contentId: post.contentId,
            status: post.status,
            thumbnail: post.thumbnail,
            title: post.title,
            createdBy: post.createdBy,
            description: post.description,
            identifier: post.identifier,
            taxonomyId: post.taxonomyId,
            createdAt: post.createdAt,
            updatedAt:post.updatedAt,
            publishIn: post.publishIn ?post.publishIn : null,
            metadata: post.metadata,
            fields: post.fields.map(f => new Field({
                fieldId: f.fieldId,
                name: f.name,
                schemeId: f.schemeId,
                value: f.value,
            }))
        });
    }
}