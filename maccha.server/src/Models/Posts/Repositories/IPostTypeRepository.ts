import { PostType } from "../Entities/PostType";
import { ICreatePostTypeParams } from "../Params/ICreatePostTypeParams";
import { ISavePostTypeParams } from "../Params/ISavePostTypeParams";

export interface IPostTypesRepository {
    getAllAsync(identifier: string,): Promise<PostType[]>;
    createAsync(identifier: string, params: ICreatePostTypeParams): Promise<PostType>;
    deleteAsync(postTypeId: string): Promise<void>;
    findAsync(postTypeId: string): Promise<PostType | null>;
    saveAsync(params: ISavePostTypeParams): Promise<PostType>;
}