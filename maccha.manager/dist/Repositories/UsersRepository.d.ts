import { User } from "../Models/users/user";
import { IUpdateUserParams } from "../Models/users/update-user-params";
import { ICreateUserParams } from "../Models/users/ICreateUserParams";
export declare class UsersRepository {
    fetchUserAsync(userId: string): Promise<User>;
    /**
     * fetch users.
     */
    fetchUsersAsync(): Promise<User[]>;
    /**
     * save user.
     * @param user user
     */
    saveUserAsync(user: IUpdateUserParams): Promise<User>;
    /**
     * save user.
     * @param user user
     */
    createNewUserAsync(user: ICreateUserParams): Promise<User>;
    saveAvatarAsync(file: File): Promise<User>;
    /**
     * convert IUser to User instance.
     * @param user user interface
     */
    private toDomain;
}
