import { Inject } from "@nestjs/common";
import { IPostTypesRepository } from "../Repositories/IPostTypeRepository";
import { PostType } from "../Entities/PostType";
import { ICreatePostTypeParams } from "../Params/ICreatePostTypeParams";
import { LoginUser } from "@/Models/Authentications/login-user";
import { RoleType } from "@/Models/Users/role.enum";
import { ISavePostTypeParams } from "../Params/ISavePostTypeParams";

/**
 * provide posts type service.
 * Post type are for creating and managing taxonomies as posts.
 * Taxonomy and post type are linked one-to-one.
 * See "Contents" module to get taxonomies and contents.
 */
export class PostTypesService {
    constructor(
        @Inject("PostTypesRepository") private readonly postTypesRepository: IPostTypesRepository,
    ) { }

    /**
     * Get all post types.
     * @param identifier web site identifier
     */
    public async getAllAsync(identifier: string): Promise<PostType[]> {
        return await this.postTypesRepository.getAllAsync(identifier);
    }

    /**
     * Create new user.
     * @param params to create post type info.
     */
    public async createAsync(identifier: string, params: ICreatePostTypeParams): Promise<PostType> {
        return await this.postTypesRepository.createAsync(identifier, params);
    }

    /**
     * Save edited post type.
     * @param params to create user info.
     */
    public async saveAsync(user: LoginUser, params: ISavePostTypeParams): Promise<PostType> {
        const { postTypeId } = params;
        try {
            if (user.role === RoleType.Edit) {
                const postType = await this.postTypesRepository.findAsync(postTypeId);
                if (!postType) {
                    throw new Error(`PostType is not found. postTypeId is "${postType}"`);
                }

                if (postType.identifier !== user.identifier) {
                    throw new Error(`Role is Unauthorized. You must have identifier "${postType.postTypeId}". Failed to save postTypeId: "${postTypeId}" . `);
                }

                await this.postTypesRepository.saveAsync(params);
            }
            else if (user.role === RoleType.Admin) {
                return await this.postTypesRepository.saveAsync(params);
            }

            throw new Error(`Role is Unauthorized. Your role is "${user.role}". Failed to save postTypeId: "${postTypeId}" . `);
        }
        catch (ex) {
            throw new Error(`Failed to save post type postTypeId: "${postTypeId}". Any error occured in repository. raw message "${ex.message}"`);
        }
    }

    /**
     * remove async.
     * Role.Edit: can remove your identifier.
     * @param params to create user info.
     */
    public async removeAsync(user: LoginUser, postTypeId: string): Promise<void> {
        try {
            if (user.role === RoleType.Edit) {
                const postType = await this.postTypesRepository.findAsync(postTypeId);
                if (!postType) {
                    throw new Error(`PostType is not found. postTypeId is "${postType}"`);
                }

                if (postType.identifier !== user.identifier) {
                    throw new Error(`Role is Unauthorized. You must have identifier "${postType.postTypeId}". Failed to remove postTypeId: "${postTypeId}" . `);
                }

                await this.postTypesRepository.deleteAsync(postTypeId);
            }
            else if (user.role === RoleType.Admin) {
                return await this.postTypesRepository.deleteAsync(postTypeId);
            }

            throw new Error(`Role is Unauthorized. Your role is "${user.role}". Failed to remove postTypeId: "${postTypeId}" . `);
        }
        catch (ex) {
            throw new Error(`Failed to remove post type postTypeId: "${postTypeId}". Any error occured in repository. raw message "${ex.message}"`);
        }
    }
}
