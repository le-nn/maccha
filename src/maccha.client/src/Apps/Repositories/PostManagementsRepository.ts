import { axios, repositoryConfig } from "./config";
import { IPostType } from "../Models/Domain/posts/entities/IPostType";
import { PostType } from "../Models/Domain/posts/entities/PostType";
import { IPostCategory } from "../Models/Domain/posts/entities/IPostCategory copy";
import { PostCategory } from "../Models/Domain/posts/entities/PostCategory";
import { ICreatePostTypeParams } from "../Models/Domain/posts/params/ICreatePostTypeParams";
import { ISavePostTypeParams } from "../Models/Domain/posts/params/ISavePostTypeParams";
import { Taxonomy } from "../Models/Domain/Contents/Entities/Taxonomy";
import { Scheme } from "../Models/Domain/Contents/Entities/Scheme";
import { CategoryTree } from "Apps/Models/Domain/Contents/Entities/CategoryTree";

export class PostManagementsRepository {
    /**
     * fetch posts.
     */
    public async fetchPostTypesAsync(): Promise<PostType[]> {
        try {
            const response = await axios.get<IPostType[]>("/api/post-types");
            return response.data.map(p => this.postTypeToDomain(p));
        }
        catch (ex) {
            console.error("failed to fetch posts.", ex);
            throw new Error("failed to fetch posts.");
        }
    }

    public async removeAsync(postTypeId: string) {
        try {
            await axios.delete("/api/post-types/" + postTypeId);
        }
        catch (ex) {
            console.error("failed to remove post type.", ex);
            throw new Error("failed to remove post type.");
        }
    }

    public async saveAsync(params: ISavePostTypeParams) {
        try {
            await axios.put("/api/post-types", params);
        }
        catch (ex) {
            console.error("failed to remove post type.", ex);
            throw new Error("failed to remove post type.");
        }
    }

    /**
     * save user.
     * ..param user user
     */
    public async createPostType(postType: ICreatePostTypeParams): Promise<PostType> {
        try {
            const response = await axios.post<IPostType>("/api/post-types", postType);
            return this.postTypeToDomain(response.data);
        }
        catch (ex) {
            console.error("failed to fetch posts.", ex);
            throw new Error("failed to save user.");
        }
    }

    /**
     * convert IUser to User instance.
     * ..param user user interface
     */
    private postTypeToDomain(post: IPostType) {
        return new PostType({
            categoryTree:new CategoryTree(post.categories),
            postTypeId: post.postTypeId,
            displayFormat: post.displayFormat,
            taxonomy: new Taxonomy({
                description: post.taxonomy.description,
                displayName: post.taxonomy.displayName,
                name: post.taxonomy.name,
                identifier: post.taxonomy.identifier,
                schemes: post.taxonomy.schemes.map(
                    s => new Scheme({
                        description: s.description,
                        displayName: s.displayName,
                        metadata: s.metadata,
                        name: s.name,
                        schemeId: s.schemeId,
                        type: s.type
                    })
                ),
                taxonomyId: post.taxonomy.taxonomyId
            })
        });
    }
}