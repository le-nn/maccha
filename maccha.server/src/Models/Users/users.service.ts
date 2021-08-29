import { IUsersRepository } from "./users-repository.interface";
import { Inject, Injectable, BadRequestException } from "@nestjs/common";
import { ICreateUserParams } from "./create-user-params";
import { User } from "./user";
import { compare, hash } from "bcrypt";
import { IUpdateUserParams } from "./update-user-params";
import { MediaService } from "../Media/Services/MediaService";

/**
 * Provide user info service.
 */
@Injectable()
export class UsersService {
    constructor(
        private readonly mediaService: MediaService,
        @Inject("UsersRepository") private readonly usersRepository: IUsersRepository
    ) { }
    /**
     * get a user.
     * @param params to create user info.
     */
    public async findByIdAsync(userId: string): Promise<User | undefined> {
        return await this.usersRepository.findByIdAsync(userId);
    }

    /**
     * get a user.
     * @param params to create user info.
     */
    public async findByEmailAsync(email: string): Promise<User | undefined> {
        return await this.usersRepository.findByEmailAsync(email);
    }

    /**
     * get all users.
     * @param identifier web site identifier
     */
    public async getAll(identifiers?: string[]): Promise<User[]> {
        return await this.usersRepository.getAll(identifiers);
    }

    /**
     * create new user.
     * @param params to create user info.
     */
    public async validateUser(email: string, password: string): Promise<User> {
        const user = await this.usersRepository.findByEmailAsync(email);
        if (user && await compare(password, user.password)) {
            return user;
        }
        throw new BadRequestException("Do not match email and password");
    }

    /**
     * add website that user can login async.
     * @param userId user id
     * @param webSiteId web site id
     */
    public async addWebSiteAsync(userId: string, identifier: string): Promise<void> {
        await this.usersRepository.addWebSiteAsync(userId, identifier);
    }

    /**
     * create new user.
     * @param params to create user info.
     */
    public async createAsync(params: ICreateUserParams): Promise<User> {
        return await this.usersRepository.createAsync({
            email: params.email,
            name: params.name,
            password: await hash(params.password, 10),
            role: params.role,
            identifiers: params.identifiers,
            isActive: params.isActive
        });
    }

    /**
     * pdate user info async.
     * @param params to update user info.
     */
    public async UpdateAsync(params: IUpdateUserParams): Promise<User | undefined> {
        const user = await this.usersRepository.findByIdAsync(params.userId);
        if (!user) return undefined;

        return await this.usersRepository.updateAsync({
            userId: params.userId,
            isActive: params.isActive,
            email: params.email,
            name: params.name,
            role: params.role,
            identifiers: params.identifiers
        });
    }

    /**
     * Save avatar image async.
     * @param userId user id.
     * @param file avatar image file.
     */
    public async saveAvatarAsync(userId: string, file: any): Promise<User | undefined> {
        const url = await this.mediaService.saveAvatarAsync(userId, file);
        return await this.usersRepository.saveAvatarAsync(
            userId,
            url
        );
    }
}