import { PostType } from "../Models/posts/entities/PostType";
import { ICreatePostTypeParams } from "../Models/posts/params/ICreatePostTypeParams";
import { ISavePostTypeParams } from "../Models/posts/params/ISavePostTypeParams";
export declare class PostManagementsRepository {
    /**
     * fetch posts.
     */
    fetchPostTypesAsync(): Promise<PostType[]>;
    removeAsync(postTypeId: string): Promise<void>;
    saveAsync(params: ISavePostTypeParams): Promise<void>;
    /**
     * save user.
     * ..param user user
     */
    createPostType(postType: ICreatePostTypeParams): Promise<PostType>;
    /**
     * convert IUser to User instance.
     * ..param user user interface
     */
    private postTypeToDomain;
}
