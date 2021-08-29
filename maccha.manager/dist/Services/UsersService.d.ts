import { User } from "../Models/users/user";
import { IUser } from "../Models/users/user.interface";
import { ICreateUserParams } from "../Models/users/ICreateUserParams";
/**
 * Users serive.
 */
export declare class UsersService {
    /**
     * repository
     */
    private readonly repository;
    /**
     * All Users.
     */
    users: User[];
    /**
     * Current selecetd user.
     */
    selected: User | null;
    constructor();
    /**
     * Fetch users async.
     */
    fetchUesrsAsync(): Promise<void>;
    /**
     * Save user async.
     */
    saveUserAsync(user: IUser): Promise<void>;
    /**
     * Create new user async.
     */
    createNewUserAsync(user: ICreateUserParams): Promise<void>;
    /**
     * Fetch and select a user from user id.
     * @param userId user id.
     */
    selectUserAsync(userId: string): Promise<void>;
    saveSelectedUserAsync(): Promise<void>;
    saveMyAvatarAsync(file: File): Promise<void>;
    setSelectedUser(value: User): void;
    /**
     * clear current selected user.
     */
    clearSelectedUser(): void;
}
