import { ICreateUserParams } from "./create-user-params";
import { User } from "./user";
import { IUpdateUserParams } from "./update-user-params";

/**
 * provide user info repository.
 */
export interface IUsersRepository {
    /**
     * find a user by id async.
     * @param userId user id
     */
    findByIdAsync(userId: string): Promise<User | undefined>;

    /**
     * get all users.
     * @param identifier web site identifier
     */
    getAll(identifiers?: string[]): Promise<User[]>;

    /**
     * find a user by email async.
     * @param userId user id
     */
    findByEmailAsync(email: string): Promise<User | undefined>;

    /**
     * add website that user can login async.
     * @param userId user id
     * @param webSiteId web site id
     */
    addWebSiteAsync(userId: string, identifier: string): Promise<void>;

    /**
     * create new user
     * @param params to create user info.
     */
    createAsync(params: ICreateUserParams): Promise<User>;

    /**
     * update user info async.
     * @param params to update user info.
     */
    updateAsync(params: IUpdateUserParams): Promise<User>;

    /**
     * Save user avater image.
     * @param userId user id
     * @param url image
     */
    saveAvatarAsync(userId: string, url: string): Promise<User>;
}