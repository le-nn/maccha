import { observable, computed, action, makeAutoObservable } from "mobx";
import { AuthRepository } from "../Repositories/AuthRepository";
import { LoginInfo } from "../Models/auth/login-info";
import { UsersRepository } from "../Repositories/UsersRepository";
import { User } from "../Models/users/user";
import { IUser } from "../Models/users/user.interface";
import { ICreateUserParams } from "../Models/users/ICreateUserParams";

/**
 * Users serive.
 */
export class UsersService {
    /**
     * repository
     */
    private readonly repository = new UsersRepository();

    /**
     * All Users.
     */
    users: User[] = [];

    /**
     * Current selecetd user.
     */
    selected: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    /**
     * Fetch users async.
     */
    public async fetchUesrsAsync() {
        try {
            const users = await this.repository.fetchUsersAsync();
            console.log(users);
            this.users = users;
        }
        catch {
            throw new Error("failed to fetch users.");
        }
    }

    /**
     * Save user async.
     */
    public async saveUserAsync(user: IUser) {
        try {
            await this.repository.saveUserAsync({
                email: user.email,
                isActive: user.isActive,
                name: user.name,
                role: user.role,
                userId: user.userId,
                identifiers: user.identifiers
            });
            await this.fetchUesrsAsync();
        }
        catch {
            throw new Error("failed to save a user.");
        }
    }

    /**
     * Create new user async.
     */
    public async createNewUserAsync(user: ICreateUserParams) {
        try {
            await this.repository.createNewUserAsync({
                email: user.email,
                isActive: user.isActive,
                name: user.name,
                role: user.role,
                identifiers: user.identifiers,
                password: user.password
            });
            await this.fetchUesrsAsync();
        }
        catch {
            throw new Error("failed to create a user.");
        }
    }

    /**
     * Fetch and select a user from user id.
     * @param userId user id.
     */
    public async selectUserAsync(userId: string) {
        try {
            this.selected = await this.repository.fetchUserAsync(userId);
        }
        catch {
            throw new Error("failed to fetch a user.");
        }
    }

    public async saveSelectedUserAsync() {
        if (!this.selected) return;
        await this.saveUserAsync(this.selected);
    }

    public async saveMyAvatarAsync(file: File) {
        if (!this.selected) return;
        await this.repository.saveAvatarAsync(file);
        await this.selectUserAsync(this.selected.userId);
    }

    public setSelectedUser(value: User) {
        this.selected = value;
    }

    /**
     * clear current selected user.
     */
    public clearSelectedUser() {
        this.selected = null;
    }
}
