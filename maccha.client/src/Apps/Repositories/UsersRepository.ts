import { axios, repositoryConfig } from "./config";
import { User } from "../Models/users/user";
import { IUser } from "../Models/users/user.interface";
import { IUpdateUserParams } from "../Models/users/update-user-params";
import { WebSite } from "../Models/sites/web-site";
import { ICreateUserParams } from "../Models/users/ICreateUserParams";

export class UsersRepository {
    public async fetchUserAsync(userId: string) {
        try {
            const response = await axios.get<User>(`/api/users/${userId}`);
            return this.toDomain(response.data);
        }
        catch (ex) {
            console.error("failed to fetch user.", ex);
            throw new Error("failed to fetch user.");
        }
    }

    /**
     * fetch users.
     */
    public async fetchUsersAsync(): Promise<User[]> {
        try {
            const response = await axios.get<IUser[]>("/api/users?all=1");
            return response.data.map(x => this.toDomain(x));
        }
        catch (ex) {
            console.error("failed to fetch users.", ex);
            throw new Error("failed to fetch users.");
        }
    }

    /**
     * save user.
     * @param user user
     */
    public async saveUserAsync(user: IUpdateUserParams): Promise<User> {
        try {
            const response = await axios.put<User>("/api/users", user);
            return this.toDomain(response.data);
        }
        catch (ex) {
            console.error("failed to save users.", ex);
            throw new Error("failed to save user.");
        }
    }

    /**
     * save user.
     * @param user user
     */
    public async createNewUserAsync(user: ICreateUserParams): Promise<User> {
        try {
            const response = await axios.post<IUser>("/api/users", user);
            return this.toDomain(response.data);
        }
        catch (ex) {
            console.error("failed to create users.", ex);
            throw new Error("failed to create user.");
        }
    }

    public async saveAvatarAsync(file: File): Promise<User> {
        try {
            const form = new FormData();
            form.append("file", file);
            const response = await axios.post<IUser>("/api/users/avatar", form);
            return this.toDomain(response.data);
        }
        catch (ex) {
            console.error("failed to upload avatar image.", ex);
            throw new Error("failed to upload avatar image.");
        }
    }

    /**
     * convert IUser to User instance.
     * @param user user interface
     */
    private toDomain(user: IUser) {
        return new User(
            user.userId,
            user.name,
            user.email,
            user.role,
            user.isActive,
            user.identifiers,
            user.avatar
        );
    }
}